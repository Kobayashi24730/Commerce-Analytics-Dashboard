import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  MdAccessTime,
  MdOutlineTrendingDown,
  MdOutlineTrackChanges,
  MdPeople,
} from "react-icons/md";

import { getFunnelPageData } from "../data/analyticsMockData";
import "../styles/AnalyticsPages.css";

const iconMap = {
  people: <MdPeople />,
  target: <MdOutlineTrackChanges />,
  time: <MdAccessTime />,
  drop: <MdOutlineTrendingDown />,
};

export default function Funnel() {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics", "funnel"],
    queryFn: getFunnelPageData,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading || !data) {
    return (
      <div className="analytics-page">
        <section className="analytics-hero">
          <div>
            <h1>Funnel</h1>
            <p>Carregando etapas de conversao...</p>
          </div>
          <span className="loading-state">Mock pronto para API</span>
        </section>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <section className="analytics-hero">
        <div>
          <h1>Funnel</h1>
          <p>
            Visualize o caminho do usuario ate a compra, descubra gargalos e
            acompanhe a taxa de conversao entre cada etapa do funil.
          </p>

          <div className="hero-badges">
            <span className="hero-badge">Visitantes ate clientes</span>
            <span className="hero-badge">Tempo medio entre etapas</span>
            <span className="hero-badge">Drop-off por fase</span>
          </div>
        </div>

        <span className="hero-pill">Marketing e vendas alinhados</span>
      </section>

      <section className="metrics-grid">
        {data.metrics.map((metric) => (
          <article className="metric-card" key={metric.id}>
            <span className="metric-label">
              {iconMap[metric.icon]}
              {metric.label}
            </span>
            <strong className="metric-value">{metric.value}</strong>
            <span className={`metric-footnote ${metric.tone}`}>{metric.footnote}</span>
          </article>
        ))}
      </section>

      <section className="analytics-grid">
        <article className="surface-card">
          <div className="surface-card-header">
            <div>
              <h2>Funil de conversao</h2>
              <p>Etapas principais do processo comercial.</p>
            </div>
          </div>

          <div className="funnel-visual">
            {data.steps.map((step) => (
              <div className="funnel-step" key={step.id}>
                <div className="funnel-step-top">
                  <strong>{step.stage}</strong>
                  <span>{step.users.toLocaleString("pt-BR")} usuarios</span>
                </div>
                <p>Conversao acumulada: {step.rate}</p>
                <p>Tempo medio para chegar aqui: {step.avgTime}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="surface-card">
          <div className="surface-card-header">
            <div>
              <h2>Tempo medio entre etapas</h2>
              <p>Onde o processo perde velocidade.</p>
            </div>
          </div>

          <div className="timeline-list">
            {data.timing.map((item) => (
              <div className="timeline-item" key={item.id}>
                <span className="timeline-step">{item.label}</span>
                <strong className="timeline-value">{item.value}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="split-grid">
        <article className="surface-card">
          <div className="surface-card-header">
            <div>
              <h2>Taxa de conversao por etapa</h2>
              <p>Entenda o desempenho de cada transicao.</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.conversionRates}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="step" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>

        <article className="surface-card">
          <div className="surface-card-header">
            <div>
              <h2>Drop-off</h2>
              <p>Principais pontos em que os usuarios desistem.</p>
            </div>
          </div>

          <div className="progress-list">
            {data.dropOff.map((item) => (
              <div key={item.id}>
                <div className="detail-item">
                  <div>
                    <div className="detail-name">{item.stage}</div>
                    <p>{item.detail}</p>
                  </div>
                  <strong className="detail-value negative">{item.value}</strong>
                </div>
                <div className="progress-track">
                  <div className="progress-bar" style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
