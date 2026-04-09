# 📊 Análise de Métricas - Frontend & Otimizações

**Data:** 06/04/2026  
**Status:** Dashboard Finalizado | Controllers Prontos | Cache & Procedures Pendentes

---

## 🎯 MÉTRICAS NECESSÁRIAS (Em Uso)

### 1. **Total de Vendas**
- **Origem:** `/api/allvendas` 
- **Hook:** `useAllVendas` → `getTotaisVendas()`
- **Retorna:** `{ total_vendas: number }`
- **Uso:** Dashboard - Card principal com total de pedidos
- **Frequência:** Carregada no mount do Dashboard
- **Query Key:** `["vendastotais"]`

### 2. **Crescimento (MoM %)**
- **Origem:** `/api/crecimento`
- **Hook:** `useCrecimento` → `getCrecimento()`
- **Retorna:** `{ crecimento: number }` (em %)
- **Uso:** Dashboard - Comparação avec período anterior; Alertas
- **Frequência:** Carregada no mount do Dashboard
- **Query Key:** `["crecimento"]`

### 3. **Taxa de Sucesso**
- **Origem:** `/api/taxasucesso`
- **Hook:** `useTaxa` → `getTaxaSucesso()`
- **Retorna:** `{ taxa: number }` (em %)
- **Uso:** Dashboard - Status de conversões; Alertas
- **Frequência:** Carregada no mount do Dashboard
- **Query Key:** `["taxa"]`

### 4. **Top Produtos (Top 10)**
- **Origem:** `/api/topvendidos`
- **Hook:** `useTopProdutos` → `TopProdutos()`
- **Retorna:** `ProdutosTop[]` → `{ id, nome, total_vendas, ...}`
- **Uso:** Dashboard - Lista de produtos mais vendidos + cálculos agregados
- **Frequência:** Carregada no mount do Dashboard
- **Query Key:** `["TopVendidos"]`
- **Dados Processados:** Normaliza response; calcula faturamento estimado + ticket médio

---

## 🚨 PROBLEMAS IDENTIFICADOS

| Problema | Impacto | Severidade |
|----------|--------|-----------|
| **4 requisições síncronas no load** | Dashboard aguarda 4 APIs antes de renderizar | 🔴 ALTA |
| **Sem batching de queries** | 4 round-trips desnecessários | 🔴 ALTA |
| **Cache genérico no React Query** | 5 min de staletime para todas as métricas | 🟡 MÉDIA |
| **Finance/Revenue/Funnel usam mocks** | Dados desatualizados nessas pages | 🟠 BAIXA |
| **Sem invalidação inteligente** | Cache invalida só após 5 min ou manual | 🟡 MÉDIA |
| **Top Produtos sem limite de linhas** | Pode retornar muitos dados | 🟡 MÉDIA |
| **Cálculos de faturamento no frontend** | Processamento em JS (deveria ser no BE) | 🟡 MÉDIA |

---

## 📋 LISTA DE OTIMIZAÇÕES RECOMENDADAS

### **[PRIORIDADE 1] 🔥 CRÍTICA - Deve fazer agora**

#### ✅ **1.1 - Criar Procedure: `getDashboardMetrics()`** 
- **Objetivo:** Retornar todas as 4 métricas em UMA chamada API
- **Endpoint:** `GET /api/dashboard/metrics`
- **Response:**
  ```typescript
  {
    totalVendas: { total_vendas: number },
    crescimento: { crecimento: number },
    taxa: { taxa: number },
    topProdutos: ProdutosTop[],
    faturamientos: number,        // Calculado no BE
    ticketMedio: number            // Calculado no BE
  }
  ```
- **Benefício:** Reduz 4 requisições → 1 requisição (75% menos chamadas)
- **Backend:** Precisa de Stored Procedure SQL que:
  - Calcula vendas totais
  - Calcula crescimento vs ano anterior
  - Calcula taxa de sucesso
  - Busca top 10 produtos
  - **Tudo em 1 query ou transaction**

---

#### ✅ **1.2 - Implementar Cache com localStorage**
- **O que cachear:**
  - `totalVendas` → 24 horas (muda 1x por dia)
  - `crescimento` → 1 hora (relativamente estável)
  - `taxa` → 30 min (mais volátil que crescimento)
  - `topProdutos` → 6 horas (mudanças graduais)
- **Estratégia:** 
  ```javascript
  // ANTES: Sempre hit na API
  useQuery({
    queryKey: ["vendastotais"],
    queryFn: getTotaisVendas,
    staleTime: 5 * 60 * 1000  // 5 min
  })
  
  // DEPOIS: Cachear localmente com tags de expiração
  const getCachedMetrics = (key, ttl) => {
    const cached = localStorage.getItem(key);
    if (cached) {
      const { data, expires } = JSON.parse(cached);
      if (Date.now() < expires) return data;
    }
    return null;
  }
  ```
- **Benefício:** Primeira visita é offline; reduz 80% das requisições de repeat users

---

#### ✅ **1.3 - Criar Stored Procedure SQL: `sp_get_dashboard_metrics`**
- **Tabelas envolvidas:** `vendas`, `clientes`, `produtos`, `pedidos`
- **Cálculos:**
  ```sql
  -- Pseudo-code
  sp_get_dashboard_metrics()
    DECLARE @totalVendas = SUM(quantidade) FROM vendas WHERE ano = 2026
    DECLARE @crecimento = (@totalVendas / @vendas_ano_anterior) - 1 * 100
    DECLARE @taxa = COUNT(SUCCESS) / COUNT(*) * 100 FROM pedidos WHERE status = 'concluido'
    DECLARE @topProdutos = TOP 10 produtos ORDER BY total_vendas DESC
    
    SELECT @totalVendas, @crecimento, @taxa, @topProdutos
  ```
- **Benefício:** Cálculos no DB são 100x+ rápidos que no JS
- **Onde colocar:** `server/src/procedures/` ou melhor em `database/` se for SQL puro

---

### **[PRIORIDADE 2] 🟠 ALTA - Fazer próximo**

#### ✅ **2.1 - Implementar Request Deduplication**
- **Problema:** Se user abre Dashboard 2x rapidamente, faz 2 requests
- **Solução:** React Query com `useQueries()` em paralelo + dedup automático
- **Código:**
  ```typescript
  const results = useQueries({
    queries: [
      { queryKey: ['vendastotais'], queryFn: getTotaisVendas },
      { queryKey: ['crecimento'], queryFn: getCrecimento },
      { queryKey: ['taxa'], queryFn: getTaxaSucesso },
      { queryKey: ['topvendidos'], queryFn: getTopProdutos }
    ]
  })
  ```
- **Benefício:** Paraleliza 4 requests simultâneos (vs sequencial agora)

---

#### ✅ **2.2 - Criar Endpoint Alterno: `/api/dashboard/lightweight`**
- **Para:** Usuários com conexão lenta
- **Response:** Apenas totais (sem Top Produtos)
  ```json
  {
    totalVendas: 1250,
    crescimento: 12.5,
    taxa: 87.3,
    updatedAt: "2026-04-06T14:30:00Z"
  }
  ```
- **Benefício:** Load Dashboard em <500ms vs 2-3s

---

#### ✅ **2.3 - Invalidar Cache ao adicionar/editar/deletar Produto**
- **Atualmente:** Só invalida quando usuario atualiza manualmente
- **Solução:** Hookup mutation listeners
  ```typescript
  useMutation({
    mutationFn: addProdutos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topvendidos'] })
      queryClient.invalidateQueries({ queryKey: ['vendastotais'] })
    }
  })
  ```
- **Benefício:** Data sempre atualizada sem delay de 5 min

---

### **[PRIORIDADE 3] 🟡 MÉDIA - Nice-to-have**

#### ✅ **3.1 - IndexDB para Backup Local**
- **O que:** Armazenar últimas 30 dias de métricas em IndexDB
- **Para:** Offline mode; histórico rápido
- **Benefício:** UX melhorada; fallback quando API cai

---

#### ✅ **3.2 - Real-time Updates com WebSocket (Opcional)**
- **Para pages:** Finance, Revenue, Funnel
- **Método:** Socket.IO listener nas mudanças de produtos
- **Benefício:** Dados live sem polling

---

#### ✅ **3.3 - Paginação no Top Produtos**
- **Atualmente:** Retorna todos/top 10
- **Melhor:** Permitir `?limit=10&offset=0`
- **Benefício:** Menos dados na rede

---

## 📊 MAPA DE DEPENDÊNCIAS

```
Dashboard (deshboard.jsx)
├── useAllVendas
│   └── getTotaisVendas()  [/api/allvendas]
├── useCrecimento
│   └── getCrecimento()    [/api/crecimento]
├── useTaxa
│   └── getTaxaSucesso()   [/api/taxasucesso]
└── useTopProdutos
    └── TopProdutos()      [/api/topvendidos]

Finance.jsx → mock data
Revenue.jsx → mock data
Funnel.jsx → mock data
```

---

## 🔧 PRÓXIMOS PASSOS

### **Fase 1: Backend (1-2 dias)**
- [ ] Criar SP/procedure: `getDashboardMetrics()` (combina 4 queries)
- [ ] Novo endpoint: `GET /api/dashboard/metrics`
- [ ] Testar performance com 100k+ registros
- [ ] Documentar response schema

### **Fase 2: Frontend (1 dia)**
- [ ] Criar `useDashboardMetrics` hook que chama novo endpoint
- [ ] Implementar localStorage cache com TTL
- [ ] Substituir 4 hooks no Dashboard por 1
- [ ] Adicionar invalidação automática nas mutations

### **Fase 3: Dados Mock → Real (1 dia)**
- [ ] Conectar Finance/Revenue/Funnel a endpoints reais
- [ ] Criar procedures para essas páginas também
- [ ] Testar SEO & performance

### **Fase 4: Monitoramento (ongoing)**
- [ ] Adicionar logging de performance
- [ ] Monitorar cache hit/miss rates
- [ ] Setup alertas para queries lentas (>1s)

---

## 📈 MÉTRICAS ESPERADAS PÓS-OTIMIZAÇÃO

| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| **Requisições no load** | 4 | 1 | -75% |
| **Tempo de load** | 2-3s | 500ms | -80% |
| **Network bandwidth** | ~50KB | ~15KB | -70% |
| **Cache hit rate** | 0% | 60%+ | +inf |
| **First Paint** | 1.5s | 400ms | -73% |

---

## 📝 NOTAS IMPORTANTES

1. **Tipo de dados voláteis:**
   - `totalVendas` = Acumula (precisa refresh diário)
   - `crescimento` = Comparativo (recalcula diariamente)
   - `taxa` = Instantânea (pode mudar a cada venda)
   - `topProdutos` = Ranking (muda gradualmente)

2. **Faturamento estimado** está sendo calculado no Frontend (linha 57 do deshboard.jsx)
   ```javascript
   produtos.reduce((acc, produto) => acc + produto.preco * produto.total_vendas, 0)
   ```
   **Problema:** Se produto tiver muitas vendas, pode overflow/lag no JS
   **Solução:** Calcular no SQL stored procedure

3. **Ticket médio** = Faturamento / Total Pedidos → Também mover para BE

4. **Finance/Revenue/Funnel** ainda usam mock (`analyticsMockData.js`)
   - Prioridade BAIXA para otimizar
   - Mas devem herdar da mesma estratégia de cache quando tiverem dados reais

---

## 🎓 CONCLUSÃO

| Critério | Status |
|----------|--------|
| **Métricas necessárias** | ✅ Identificadas |
| **Bottlenecks** | ✅ Mapeados |
| **Plano de cache** | ✅ Definido |
| **Procedures SQL** | ⏳ Aguardando implementação |
| **Frontend refactor** | ⏳ Aguardando BE |
