import { useQuery } from "@tanstack/react-query";
import {
  MdGroups,
  MdOutlineAutorenew,
  MdOutlineFavorite,
  MdSearch,
} from "react-icons/md";

import { getCustomersPageData } from "../data/analyticsMockData";
import "../styles/AnalyticsPages.css";

const iconMap = {
  heart: <MdOutlineFavorite />,
  repeat: <MdOutlineAutorenew />,
  groups: <MdGroups />,
  search: <MdSearch />,
};

export default function Customers() {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics", "customers"],
    queryFn: getCustomersPageData,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading || !data) {
    return (
      <div className="analytics-page">
        <section className="analytics-hero crm">
          <div>
            <h1>Customers</h1>
            <p>Carregando base de clientes...</p>
          </div>
          <span className="loading-state">Mock pronto para API</span>
        </section>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <section className="analytics-hero crm">
        <div>
          <h1>Customers</h1>
          <p>
            Gestao e analise da base de clientes com cara de mini CRM: lista,
            filtros, segmentacao e um perfil resumido para contexto rapido.
          </p>

          <div className="hero-badges">
            <span className="hero-badge">Historico de compras</span>
            <span className="hero-badge">Interacoes e segmentos</span>
            <span className="hero-badge">LTV e retencao</span>
          </div>
        </div>

        <span className="hero-pill">CRM leve para operacao diaria</span>
      </section>

      <section className="toolbar-card">
        <div className="toolbar-title">
          <h2>Busca e filtros</h2>
          <p>Encontre clientes por nome, status, periodo e segmento.</p>
        </div>

        <div className="filter-group">
          <div className="filter-control">
            <label>Buscar</label>
            <input type="text" placeholder="Nome ou email" />
          </div>

          <div className="filter-control">
            <label>Status</label>
            <select defaultValue={data.filters.status[0]}>
              {data.filters.status.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-control">
            <label>Segmento</label>
            <select defaultValue={data.filters.segment[0]}>
              {data.filters.segment.map((item) => (
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

      <section className="customer-layout">
        <article className="surface-card">
          <div className="surface-card-header">
            <div>
              <h2>Lista de clientes</h2>
              <p>Visao operacional da base com status e cadastro.</p>
            </div>
          </div>

          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Cadastro</th>
                  <th>Segmento</th>
                </tr>
              </thead>
              <tbody>
                {data.list.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>
                      <span className={`status-chip ${customer.status === "Ativo" ? "chip-active" : customer.status === "Pendente" ? "chip-pending" : "chip-risk"}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td>{customer.signup}</td>
                    <td>
                      <span className={`table-chip ${customer.segment === "Recorrente" ? "chip-recurring" : "chip-new"}`}>
                        {customer.segment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <aside className="surface-card">
          <div className="surface-card-header">
            <div>
              <h2>Perfil do cliente</h2>
              <p>Resumo rapido para atendimento e vendas.</p>
            </div>
          </div>

          <div className="detail-list">
            <div className="detail-item">
              <div>
                <div className="detail-name">{data.featuredCustomer.name}</div>
                <p>{data.featuredCustomer.subtitle}</p>
              </div>
              <strong className="detail-value">{data.featuredCustomer.badge}</strong>
            </div>

            {data.featuredCustomer.highlights.map((item) => (
              <div className="detail-item" key={item.id}>
                <span className="detail-name">{item.label}</span>
                <strong className="detail-value">{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="surface-card-header" style={{ marginTop: "20px" }}>
            <div>
              <h2>Interacoes recentes</h2>
              <p>Ultimos movimentos do relacionamento.</p>
            </div>
          </div>

          <ul className="timeline-list">
            {data.featuredCustomer.interactions.map((item) => (
              <li className="timeline-item" key={item.id}>
                <span className="timeline-step">{item.label}</span>
                <strong className="timeline-value">{item.value}</strong>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}
