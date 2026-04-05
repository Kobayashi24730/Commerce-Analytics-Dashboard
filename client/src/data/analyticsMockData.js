export const analyticsDelay = (data) =>
  new Promise((resolve) => setTimeout(() => resolve(data), 120));

const revenueData = {
  heroDate: "04/04/2026",
  filters: {
    periods: ["Ultimos 7 dias", "Ultimos 30 dias", "Trimestre", "Ano atual"],
    categories: ["Todas", "Assinaturas", "Servicos", "Infoprodutos"],
  },
  metrics: [
    {
      id: "mrr",
      label: "MRR",
      value: "R$ 82.800",
      footnote: "+12.4% vs mar/2026",
      tone: "positive",
      icon: "money",
    },
    {
      id: "arpu",
      label: "ARPU",
      value: "R$ 184",
      footnote: "+7.1% por cliente ativo",
      tone: "positive",
      icon: "user",
    },
    {
      id: "comparison",
      label: "Mes atual vs anterior",
      value: "+R$ 9.200",
      footnote: "Abril acelerou no canal direto",
      tone: "positive",
      icon: "compare",
    },
    {
      id: "margin",
      label: "Margem estimada",
      value: "68%",
      footnote: "Infra abaixo do teto planejado",
      tone: "neutral",
      icon: "insight",
    },
  ],
  trend: [
    { label: "01 Abr", revenue: 5200 },
    { label: "05 Abr", revenue: 6100 },
    { label: "10 Abr", revenue: 7400 },
    { label: "15 Abr", revenue: 6800 },
    { label: "20 Abr", revenue: 8300 },
    { label: "25 Abr", revenue: 9100 },
    { label: "30 Abr", revenue: 10500 },
  ],
  productBreakdown: [
    { id: 1, name: "Assinatura Pro", value: 42800, color: "#16a34a" },
    { id: 2, name: "Consultoria", value: 18100, color: "#0ea5e9" },
    { id: 3, name: "Curso Intensivo", value: 13200, color: "#f59e0b" },
    { id: 4, name: "Setup Premium", value: 9400, color: "#8b5cf6" },
  ],
  channels: [
    { id: 1, name: "WhatsApp", value: "R$ 31.400", share: "38%" },
    { id: 2, name: "Site", value: "R$ 27.900", share: "34%" },
    { id: 3, name: "Inside Sales", value: "R$ 15.200", share: "18%" },
    { id: 4, name: "Afiliados", value: "R$ 8.300", share: "10%" },
  ],
  highlights: [
    { id: 1, label: "Assinatura Pro lidera o MRR", value: "51.7%" },
    { id: 2, label: "Site converte ticket maior", value: "R$ 214" },
    { id: 3, label: "WhatsApp cresce com retomada", value: "+18%" },
    { id: 4, label: "Servico sob demanda oscila mais", value: "Atencao", tone: "negative" },
  ],
  comparison: {
    title: "Mes atual vs mes anterior",
    text: "Abril projeta fechamento 12,4% acima de marco, puxado por assinaturas e retomada do WhatsApp.",
    badge: "+R$ 9.200",
  },
};

const funnelData = {
  metrics: [
    { id: "visitors", label: "Visitantes totais", value: "8.400", footnote: "+11% no periodo", tone: "positive", icon: "people" },
    { id: "final", label: "Conversao final", value: "2.9%", footnote: "Visitante ate cliente", tone: "neutral", icon: "target" },
    { id: "time", label: "Tempo medio", value: "9 dias", footnote: "Da primeira visita ate compra", tone: "neutral", icon: "time" },
    { id: "dropoff", label: "Maior drop-off", value: "74.5%", footnote: "Entre visitantes e leads", tone: "negative", icon: "drop" },
  ],
  steps: [
    { id: 1, stage: "Visitantes", users: 8400, rate: "100%", avgTime: "0d" },
    { id: 2, stage: "Leads", users: 2140, rate: "25.5%", avgTime: "2d" },
    { id: 3, stage: "Interessados", users: 820, rate: "38.3%", avgTime: "5d" },
    { id: 4, stage: "Clientes", users: 246, rate: "30.0%", avgTime: "9d" },
  ],
  conversionRates: [
    { step: "Visitantes > Leads", value: 25.5 },
    { step: "Leads > Interessados", value: 38.3 },
    { step: "Interessados > Clientes", value: 30.0 },
  ],
  timing: [
    { id: 1, label: "Visitante ate lead", value: "2 dias" },
    { id: 2, label: "Lead ate interessado", value: "3 dias" },
    { id: 3, label: "Interessado ate cliente", value: "4 dias" },
  ],
  dropOff: [
    { id: 1, stage: "Topo do funil", detail: "Formulario longo reduz captura", value: "-74.5%", progress: 74 },
    { id: 2, stage: "Meio do funil", detail: "Demora no follow-up comercial", value: "-61.7%", progress: 62 },
    { id: 3, stage: "Fechamento", detail: "Friccao em proposta e pagamento", value: "-70.0%", progress: 50 },
  ],
};

const customersData = {
  filters: {
    status: ["Todos", "Ativo", "Pendente", "Em risco"],
    segment: ["Todos", "Novos", "Recorrentes"],
  },
  metrics: [
    { id: "ltv", label: "LTV medio", value: "R$ 2.480", footnote: "+8.6% vs mes anterior", tone: "positive", icon: "heart" },
    { id: "retention", label: "Retencao", value: "86%", footnote: "Clientes ativos apos 90 dias", tone: "positive", icon: "repeat" },
    { id: "segments", label: "Novos vs recorrentes", value: "42% / 58%", footnote: "Base equilibrada", tone: "neutral", icon: "groups" },
    { id: "search", label: "Busca pronta", value: "Filtros ativos", footnote: "Nome, status, segmento e data", tone: "neutral", icon: "search" },
  ],
  list: [
    { id: 1, name: "Marina Costa", email: "marina@empresa.com", status: "Ativo", signup: "02/04/2026", segment: "Recorrente" },
    { id: 2, name: "Lucas Mendes", email: "lucas@startup.com", status: "Pendente", signup: "31/03/2026", segment: "Novo" },
    { id: 3, name: "Camila Rocha", email: "camila@consult.com", status: "Em risco", signup: "28/03/2026", segment: "Recorrente" },
    { id: 4, name: "Renato Alves", email: "renato@studio.com", status: "Ativo", signup: "27/03/2026", segment: "Novo" },
  ],
  featuredCustomer: {
    name: "Marina Costa",
    subtitle: "Conta ativa desde 02/04/2026",
    badge: "VIP",
    highlights: [
      { id: 1, label: "Historico de compras", value: "12 pedidos" },
      { id: 2, label: "Ultima interacao", value: "Ha 2 dias" },
      { id: 3, label: "Ticket acumulado", value: "R$ 3.820" },
      { id: 4, label: "Canal favorito", value: "WhatsApp" },
    ],
    interactions: [
      { id: 1, label: "Upgrade para plano Pro", value: "Hoje" },
      { id: 2, label: "Resposta em campanha de upsell", value: "Ontem" },
      { id: 3, label: "Pagamento confirmado", value: "02/04" },
    ],
  },
};

const financeData = {
  filters: {
    periods: ["Semanal", "Mensal", "Trimestral"],
    categories: ["Todas", "Marketing", "Infra", "Equipe"],
    exports: ["CSV", "Excel"],
  },
  metrics: [
    { id: "inflow", label: "Entradas", value: "R$ 56.900", footnote: "Recebimentos no periodo", tone: "positive", icon: "paid" },
    { id: "outflow", label: "Saidas", value: "R$ 23.750", footnote: "Despesas operacionais e variaveis", tone: "negative", icon: "receipt" },
    { id: "cashflow", label: "Fluxo de caixa", value: "R$ 33.150", footnote: "Saldo liquido acumulado", tone: "positive", icon: "wallet" },
    { id: "future", label: "Integracoes futuras", value: "Stripe / Pix", footnote: "Preparado para conectores financeiros", tone: "neutral", icon: "sync" },
  ],
  cashFlow: [
    { label: "Sem 1", inflow: 12000, outflow: 4800 },
    { label: "Sem 2", inflow: 14800, outflow: 6900 },
    { label: "Sem 3", inflow: 13900, outflow: 7200 },
    { label: "Sem 4", inflow: 16200, outflow: 8100 },
  ],
  expenses: [
    { id: 1, name: "Marketing", value: "R$ 8.400" },
    { id: 2, name: "Infra", value: "R$ 3.200" },
    { id: 3, name: "Equipe", value: "R$ 11.600" },
    { id: 4, name: "Ferramentas", value: "R$ 1.850" },
  ],
  payments: [
    { id: 1, name: "Pagos", value: "R$ 41.900", chip: "chip-paid" },
    { id: 2, name: "Pendentes", value: "R$ 6.800", chip: "chip-pending" },
    { id: 3, name: "Atrasados", value: "R$ 2.150", chip: "chip-overdue" },
  ],
  integrations: [
    { id: 1, label: "Stripe", value: "Planejado" },
    { id: 2, label: "Pix", value: "Planejado" },
    { id: 3, label: "Gateway bancario", value: "Mapeando" },
  ],
};

export const getRevenuePageData = async () => analyticsDelay(revenueData);
export const getFunnelPageData = async () => analyticsDelay(funnelData);
export const getCustomersPageData = async () => analyticsDelay(customersData);
export const getFinancePageData = async () => analyticsDelay(financeData);
