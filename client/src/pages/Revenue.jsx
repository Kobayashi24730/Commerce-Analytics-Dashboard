import { useQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  MdAttachMoney,
  MdCategory,
  MdCompareArrows,
  MdDateRange,
  MdInsights,
  MdPerson,
  MdStorefront,
} from "react-icons/md";

import { getRevenuePageData } from "../data/analyticsMockData";
import "../styles/AnalyticsPages.css";

const iconMap = {
  money: <MdAttachMoney />,
  user: <MdPerson />,
  compare: <MdCompareArrows />,
  insight: <MdInsights />,
};

export default function Revenue() {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics", "revenue"],
    queryFn: getRevenuePageData,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading || !data) {
    return (
      <div className="analytics-page">
        <section className="analytics-hero money">
          <div>
            <h1>Revenue</h1>
            <p>Carregando analise de receita...</p>
          </div>
          <span className="loading-state">Mock pronto para API</span>
        </section>
        <section className="loading-shell">
          <p>Buscando dados simulados com estrutura preparada para backend.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <section className="analytics-hero money">
        <div>
          <h1>Revenue</h1>
          <p>
            Analise financeira profunda da receita, com visao clara por periodo,
            produto e canal para entender crescimento e qualidade do faturamento.
          </p>

          <div className="hero-badges">
            <span className="hero-badge">Receita recorrente monitorada</span>
            <span className="hero-badge">Comparativo mensal em destaque</span>
            <span className="hero-badge">Filtros por periodo e categoria</span>
          </div>
        </div>

        <span className="hero-pill">Atualizado em {data.heroDate}</span>
      </section>

      <section className="toolbar-card">
        <div className="toolbar-title">
          <h2>Painel de filtros</h2>
          <p>Recorte os dados para analisar tendencia, mix e performance.</p>
        </div>

        <div className="filter-group">
          <div className="filter-control">
            <label>Periodo</label>
            <select defaultValue={data.filters.periods[1]}>
              {data.filters.periods.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-control">
            <label>Categoria</label>
            <select defaultValue={data.filters.categories[0]}>
              {data.filters.categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="metrics-grid">
        {data.metrics.map((metric) => (
          <article className="metric-card" key={metric.id}>
            <span className="metric-label">
              {iconMap[metric.icon]}
              {metric.label}
            </span>
            <strong className="metric-value">{metric.value}</strong>
            <span className={`metric-footnote ${metric.tone}`}>
              {metric.footnote}
            </span>
          </article>
        ))}
      </section>

      <section className="analytics-grid">
        <article className="surface-card">
          <div className="surface-card-header">
            <div>
              <h2>Receita por dia</h2>
              <p>Evolucao do faturamento ao longo do periodo selecionado.</p>
            </div>
            <span>
              <MdDateRange /> Base diaria
            </span>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={data.trend}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="label" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip formatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`} />
              <Area type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={3} fill="url(#revenueFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </article>

        <article className="surface-card">
          <div className="surface-card-header">
            <div>
              <h2>Receita por produto</h2>
              <p>Mix de faturamento por oferta.</p>
            </div>
            <span>
              <MdCategory /> Breakdown
            </span>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={data.productBreakdown} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={4}>
                {data.productBreakdown.map((entry) => (
                  <Cell key={entry.id} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`} />
            </PieChart>
          </ResponsiveContainer>

          <div className="legend-list">
            {data.productBreakdown.map((item) => (
              <div className="legend-item" key={item.id}>
                <span className="legend-name">
                  <span className="color-dot" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="legend-value">R$ {item.value.toLocaleString("pt-BR")}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="comparison-banner">
        <div>
          <strong>{data.comparison.title}</strong>
          <p>{data.comparison.text}</p>
        </div>
        <span className="pill">{data.comparison.badge}</span>
      </section>

      <section className="split-grid">
        <article className="surface-card">
          <div className="surface-card-header">
            <div>
              <h2>Receita por canal</h2>
              <p>Onde o dinheiro entra com mais forca.</p>
            </div>
            <span>
              <MdStorefront /> Canais
            </span>
          </div>

          <div className="detail-list">
            {data.channels.map((channel) => (
              <div className="detail-item" key={channel.id}>
                <div>
                  <div className="detail-name">{channel.name}</div>
                  <p>{channel.share} da receita total</p>
                </div>
                <strong className="detail-value">{channel.value}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="surface-card">
          <div className="surface-card-header">
            <div>
              <h2>Leituras estrategicas</h2>
              <p>Resumo rapido para decisao financeira.</p>
            </div>
          </div>

          <ul className="timeline-list">
            {data.highlights.map((item) => (
              <li className="timeline-item" key={item.id}>
                <span className="timeline-step">{item.label}</span>
                <strong className={`timeline-value ${item.tone || ""}`}>{item.value}</strong>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
