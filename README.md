# Dashboard de Produtos, Vendas e Analytics

Dashboard administrativo construído para centralizar analise comercial, acompanhamento de clientes, funil de conversao e controle financeiro em uma interface unica.

O projeto segue uma arquitetura de front-end moderna com foco em componentizacao, navegacao fluida e escalabilidade para integracao futura com APIs reais.

## Visao Geral

A aplicacao foi pensada como uma SPA (Single Page Application) para operacao e analise de negocio, reunindo:

- dashboard executivo com indicadores gerais
- analise de receita
- funil de conversao
- gestao de clientes
- controle financeiro operacional

## Tecnologias Utilizadas

### Frontend

- React
- TypeScript
- Vite

### Routing

- React Router DOM

### State and Data Management

- TanStack React Query

### Data Visualization

- Recharts

### UI and Styling

- Tailwind CSS
- CSS3
- PostCSS
- Autoprefixer

### Icons

- React Icons

### Build Tools and Plugins

- Vite
- @vitejs/plugin-react

### Type Definitions

- @types/react
- @types/react-dom
- @types/node

## Arquitetura

O projeto adota os seguintes padroes:

- SPA (Single Page Application)
- Component-Based Architecture
- Custom Hooks
- Service Layer for API Integration
- Frontend Mock Data para prototipacao e preparacao para backend

## Estrutura do Projeto

```bash
client/
  src/
    components/
    data/
    hooks/
    pages/
    services/
    styles/
    types/
```

### Principais areas

- `components/`: componentes reutilizaveis de layout e visualizacao
- `data/`: mocks utilizados no front para prototipacao
- `hooks/`: hooks customizados e integracao com React Query
- `pages/`: paginas principais da aplicacao
- `services/`: camada de servicos para consumo de API
- `styles/`: estilos globais e por tela
- `types/`: tipagens compartilhadas

## Paginas Principais

### Dashboard

Tela principal com visao executiva da operacao:

- total de vendas
- crescimento
- taxa de sucesso
- produtos cadastrados
- insights rapidos
- ranking de produtos
- graficos de desempenho

### Revenue

Tela focada em analise financeira profunda:

- receita por periodo
- receita por produto
- receita por canal
- MRR
- ARPU
- comparativos mensais
- filtros por periodo e categoria

### Funnel

Tela de acompanhamento do funil de conversao:

- visitantes
- leads
- interessados
- clientes
- taxa de conversao por etapa
- tempo medio entre etapas
- drop-off

### Customers

Tela voltada para gestao e analise de clientes:

- lista de clientes
- status
- data de cadastro
- segmentacao
- perfil resumido
- historico e interacoes
- metricas de retencao e LTV

### Finance

Tela de controle financeiro administrativo:

- entradas e saidas
- fluxo de caixa
- despesas por categoria
- status de pagamentos
- exportacao
- preparacao para integracoes futuras como Stripe e Pix

## Dados e Integracao

Atualmente o projeto utiliza dois modelos de dados no front:

- paginas conectadas a hooks e services para consumo de endpoints existentes
- paginas novas com mock data estruturado para futura substituicao por API real

Esse formato permite evoluir a interface primeiro e trocar a fonte de dados depois com baixo impacto nos componentes.

## Instalacao

### 1. Entrar na pasta do frontend

```bash
cd client
```

### 2. Instalar as dependencias

```bash
npm install
```

### 3. Rodar o projeto em desenvolvimento

```bash
npm run dev
```

### 4. Gerar build de producao

```bash
npm run build
```

### 5. Visualizar build localmente

```bash
npm run preview
```

## Scripts Disponiveis

- `npm run dev`: inicia o servidor de desenvolvimento com Vite
- `npm run build`: gera a build de producao
- `npm run preview`: executa a visualizacao da build

## Diferenciais do Projeto

- interface moderna e responsiva
- separacao clara entre paginas, hooks, services e mocks
- estrutura pronta para evolucao com backend real
- visualizacao de dados com graficos interativos
- base organizada para manutencao e escalabilidade

## Melhorias Futuras

- substituir mocks por endpoints reais
- adicionar filtros com comportamento dinamico
- padronizar hooks por pagina
- adicionar estados globais de erro e loading mais detalhados
- expandir autenticacao e permissoes de acesso

## Autor

Desenvolvido por Guilherme Silva.
