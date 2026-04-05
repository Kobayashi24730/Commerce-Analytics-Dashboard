# 📊 Estrutura de Banco de Dados - Commerce Analytics Dashboard

## 📋 Tabelas Criadas e suas Funcionalidades

### 1️⃣ **categorias** - Organização de Produtos
```
├─ id (primary key)
├─ nome (unique)
├─ descricao
└─ criado_em
```
**Para quê?** Agrupar produtos em categorias (ex: "Assinaturas", "Serviços", "Infoprodutos")

---

### 2️⃣ **produtos** - Catálogo de Produtos (MELHORADO)
```
├─ id (primary key)
├─ nome
├─ categoria_id → FK para categorias
├─ sku (unique)
├─ description
├─ image (URL)
├─ preco (com decimal)
├─ custo (para calcular margem)
├─ quantity (estoque)
├─ vendas (total de unidades)
├─ demanda
├─ vendas_ano_anterior
├─ tentativas_compra
├─ ativo (boolean)
├─ created_at
└─ updated_at
```
**Para quê?** Dashboard de produtos, análise de performance

---

### 3️⃣ **clients** - Clientes/Usuários (MELHORADO)
```
├─ id (primary key)
├─ nome
├─ email (unique)
├─ telefone (para WhatsApp)
├─ senha
├─ cargo (user, admin)
├─ ativo (boolean)
├─ segmentacao (standard, premium, vip)
├─ criado_em
└─ updated_at
```
**Para quê?** Página Customers, CRM, segmentação

---

### 4️⃣ **canais_vendas** - Canais de Distribuição
```
├─ id (primary key)
├─ nome (unique) → Ex: "WhatsApp", "Site", "Afiliados"
├─ descricao
├─ ativo
└─ criado_em
```
**Para quê?** Revenue breakdown por canal (Finance > Channels)

---

### 5️⃣ **vendas** - Pedidos/Transações
```
├─ id (primary key)
├─ cliente_id → FK para clients
├─ canal_id → FK para canais_vendas
├─ valor_total
├─ quantidade_itens
├─ status (pendente, confirmada, entregue, cancelada)
├─ data_venda
├─ data_entrega
├─ notas
└─ created_at
```
**Para quê?** Finance (receita, pagamentos), Dashboard (total de vendas)

---

### 6️⃣ **vendas_itens** - Itens de Cada Venda
```
├─ id (primary key)
├─ venda_id → FK para vendas
├─ produto_id → FK para produtos
├─ quantidade
├─ preco_unitario
└─ subtotal
```
**Para quê?** Detalhe de cada venda, produto breakdown

---

### 7️⃣ **pagamentos** - Controle Financeiro
```
├─ id (primary key)
├─ venda_id → FK para vendas
├─ valor
├─ metodo (credito, debito, pix, boleto, assinatura)
├─ status (pendente, confirmado, falhou)
├─ data_pagamento
├─ referencia_externa (ID do gateway)
└─ created_at
```
**Para quê?** Finance > Receitas, fluxo de caixa

---

### 8️⃣ **assinaturas** - Vendas Recorrentes (MRR)
```
├─ id (primary key)
├─ cliente_id → FK para clients
├─ produto_id → FK para produtos
├─ valor_mensal
├─ data_inicio
├─ data_proxima_cobranca
├─ ativa (boolean)
└─ created_at
```
**Para quê?** Revenue > MRR, assinaturas Pro do seu mock

---

### 9️⃣ **funil** - Leads e Conversão (CRM)
```
├─ id (primary key)
├─ nome_lead
├─ email_lead
├─ telefone_lead
├─ estagio → visitante, lead, interessado, cliente
├─ origem → site, whatsapp, afiliado, email
├─ data_primeira_visita
├─ data_conversao
├─ temp_conversao_dias (calculado automaticamente)
├─ cliente_id → FK para clients (quando vira cliente)
├─ ativo
├─ notas
└─ created_at
```
**Para quê?** Página Funnel (visitantes → leads → clientes), Customers CRM

---

### 🔟 **receita** - Agregação Diária de Revenue
```
├─ id (primary key)
├─ data (unique)
├─ mrr (Monthly Recurring Revenue)
├─ revenue_total
├─ margem_percentual
└─ created_at
```
**Para quê?** Revenue > Trend chart, MRR histórico

---

### 1️⃣1️⃣ **metricas_diarias** - Dashboard Metrics
```
├─ id (primary key)
├─ data (unique)
├─ visitantes
├─ leads_novos
├─ clientes_novos
├─ revenue_dia
├─ tickets_abertos
└─ created_at
```
**Para quê?** Dashboard > Cards de métricas, gráficos principais

---

### 1️⃣2️⃣ **administracao** - Logs de Sistema
```
├─ id (primary key)
├─ criador
├─ acao (criar, editar, deletar, calcular)
├─ tipo (produto, cliente, venda, sistema)
├─ descricao
├─ tabela_afetada
├─ registro_id
├─ detalhes (JSON)
└─ criado_em
```
**Para quê?** Auditoria, histórico de mudanças, procedures de logging

---

### 1️⃣3️⃣ **configuracoes** - Settings da App
```
├─ id (primary key)
├─ chave (unique) → Ex: "margem_minima", "taxa_conversao_alvo"
├─ valor
├─ tipo (text, number, boolean, json)
├─ descricao
└─ updated_at
```
**Para quê?** Parâmetros dinâmicos da aplicação

---

## 🔗 Relacionamentos (Foreign Keys)

```
produtos.categoria_id          → categorias.id
vendas.cliente_id              → clients.id
vendas.canal_id                → canais_vendas.id
vendas_itens.venda_id          → vendas.id
vendas_itens.produto_id        → produtos.id
pagamentos.venda_id            → vendas.id
assinaturas.cliente_id         → clients.id
assinaturas.produto_id         → produtos.id
funil.cliente_id               → clients.id
```

---

## 📊 Como Aplicar no Supabase

### Passo 1: Abrir SQL Editor
1. Vá para **Supabase Dashboard > SQL Editor**
2. Clique em **New Query**

### Passo 2: Copiar o SQL gerado
Execute este arquivo: `server/src/database/schema-completo.sql`
(Convertemos o TypeScript em SQL)

---

## 🎯 Mapeamento com seu Frontend

| Página Frontend | Tabelas Usadas | 
|---|---|
| **Dashboard** | metricas_diarias, vendas, funil, receita |
| **Customers** | clients, funil, vendas |
| **Finance** | pagamentos, vendas, canais_vendas |
| **Revenue** | receita, assinaturas, vendas, canais_vendas |
| **Funnel** | funil, clients |
| **Produtos** | produtos, categorias, vendas_itens |

---

## ✅ Próximos Passos

1. **Converter schema para SQL**: Adapte `schema-completo.ts` para SQL puro
2. **Executar no Supabase**: Paste no SQL Editor
3. **Criar procedures** na pasta `/procedures` para:
   - Calcular margens de lucro
   - Agregar receita diária
   - Converter leads em clientes
   - Calcular MRR
4. **Atualizar controllers** para usar as novas tabelas
5. **Migrar dados** do mock para o banco real

---

## 📝 Observações Importantes

✅ **Decimal para valores monetários**: Usa `decimal(12,2)` em vez de `integer` para evitar erros de arredondamento  
✅ **Timestamps**: Todas as tabelas logam `created_at` e `updated_at`  
✅ **Soft delete**: Use coluna `ativo` em vez de deletar  
✅ **Índices**: Você pode adicionar índices em campos frequentemente queryados (email, data, etc)  
✅ **Constraints**: Foreign keys automáticas para integridade de dados  

---

## 🚀 Exemplo: Query para seu Dashboard

```sql
-- Total de vendas do dia
SELECT SUM(valor_total) as total_dia
FROM vendas
WHERE DATE(data_venda) = CURRENT_DATE;

-- Visitantes únicos por dia
SELECT data, visitantes, leads_novos, clientes_novos
FROM metricas_diarias
WHERE data BETWEEN CURRENT_DATE - INTERVAL '30 days' AND CURRENT_DATE
ORDER BY data DESC;

-- MRR Atual
SELECT SUM(valor_mensal) as mrr_total
FROM assinaturas
WHERE ativa = true;

-- Funil de conversão
SELECT estagio, COUNT(*) as quantidade
FROM funil
GROUP BY estagio
ORDER BY CASE estagio 
  WHEN 'visitante' THEN 1
  WHEN 'lead' THEN 2
  WHEN 'interessado' THEN 3
  WHEN 'cliente' THEN 4 END;
```
