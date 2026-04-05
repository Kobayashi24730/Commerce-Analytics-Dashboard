import { useQuery } from "@tanstack/react-query";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  MdDownload,
  MdOutlineAccountBalanceWallet,
  MdOutlinePaid,
  MdPayments,
  MdReceiptLong,
  MdSyncAlt,
} from "react-icons/md";

import { getFinancePageData } from "../data/analyticsMockData";
import "../styles/AnalyticsPages.css";

const iconMap = {
  paid: <MdOutlinePaid />,
  receipt: <MdReceiptLong />,
  wallet: <MdOutlineAccountBalanceWallet />,
  sync: <MdSyncAlt />,
};

export default function Finance() {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics", "finance"],
    queryFn: getFinancePageData,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading || !data) {
    return (
      <div className="analytics-page">
        <section className="analytics-hero money">
          <div>
            <h1>Finance</h1>
            <p>Carregando controle financeiro...</p>
          </div>
          <span className="loading-state">Mock pronto para API</span>
        </section>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <section className="analytics-hero money">
        <div>
          <h1>Finance</h1>
          <p>
            Controle financeiro operacional com entradas, saidas, fluxo de
            caixa, despesas e status de pagamentos em uma visao administrativa.
          </p>

          <div className="hero-badges">
            <span className="hero-badge">Controle de caixa</span>
            <span className="hero-badge">Despesas por categoria</span>
            <span className="hero-badge">Exportacao e integracao futura</span>
          </div>
        </div>

        <span className="hero-pill">Revenue analisa, Finance controla</span>
      </section>

      <section className="toolbar-card">
        <div className="toolbar-title">
          <h2>Filtros operacionais</h2>
          <p>Organize o fechamento por periodo e categoria financeira.</p>
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

          <div className="filter-control">
            <label>Exportacao</label>
            <select defaultValue={data.filters.exports[0]}>
              {data.filters.exports.map((item) => (
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
            <span className={`metric-footnote ${metric.tone}`}>{metric.footnote}</span>
          </article>
        ))}
      </section>

      <section className="finance-layout">
        <article className="surface-card">
          <div className="surface-card-header">
            <div>
              <h2>Fluxo de caixa</h2>
              <p>Entradas e saidas ao longo do periodo.</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data.cashFlow}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="label" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip formatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`} />
              <Line type="monotone" dataKey="inflow" stroke="#16a34a" strokeWidth={3} name="Entradas" />
              <Line type="monotone" dataKey="outflow" stroke="#dc2626" strokeWidth={3} name="Saidas" />
            </LineChart>
          </ResponsiveContainer>
        </article>

        <aside className="surface-card">
          <div className="surface-card-header">
            <div>
              <h2>Pagamentos</h2>
              <p>Status do contas a receber.</p>
            </div>
            <span>
              <MdPayments /> Operacao
            </span>
          </div>

          <div className="status-list">
            {data.payments.map((item) => (
              <div className="status-item" key={item.id}>
                <span className="status-name">{item.name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <strong className="status-value">{item.value}</strong>
                  <span className={`status-chip ${item.chip}`}>{item.name}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="surface-card-header" style={{ marginTop: "20px" }}>
            <div>
              <h2>Exportacao</h2>
              <p>Saida de dados para operacao e contabilidade.</p>
            </div>
          </div>

          <div className="detail-list">
            <div className="detail-item">
              <span className="detail-name">
                <MdDownload />
                Relatorio CSV
              </span>
              <strong className="detail-value">Pronto</strong>
            </div>
            <div className="detail-item">
              <span className="detail-name">
                <MdDownload />
                Relatorio Excel
              </span>
              <strong className="detail-value">Pronto</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="split-grid">
        <article className="surface-card">
          <div className="surface-card-header">
            <div>
              <h2>Despesas por categoria</h2>
              <p>Onde o caixa esta sendo consumido.</p>
            </div>
          </div>

          <div className="detail-list">
            {data.expenses.map((expense) => (
              <div className="detail-item" key={expense.id}>
                <span className="detail-name">{expense.name}</span>
                <strong className="detail-value">{expense.value}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="surface-card">
          <div className="surface-card-header">
            <div>
              <h2>Proximas integracoes</h2>
              <p>Base pensada para evoluir com provedores financeiros.</p>
            </div>
          </div>

          <ul className="timeline-list">
            {data.integrations.map((item) => (
              <li className="timeline-item" key={item.id}>
                <span className="timeline-step">{item.label}</span>
                <strong className="timeline-value">{item.value}</strong>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
