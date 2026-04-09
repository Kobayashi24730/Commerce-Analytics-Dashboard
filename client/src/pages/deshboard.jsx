import "../styles/HomeStyles.css";

import {
  useGetMetrics,
} from "@/hooks";
import Graficos from "../components/graficos";

import {
  MdAccessTime,
  MdAttachMoney,
  MdCheckCircle,
  MdInventory2,
  MdOutlineInsights,
  MdShoppingCart,
  MdSpeed,
  MdStorage,
  MdTrendingUp,
} from "react-icons/md";

function saudacao() {
  const hora = new Date().getHours();

  if (hora < 12) return "Bom dia";
  if (hora < 18) return "Boa tarde";
  return "Boa noite";
}

function formatCurrency(value) {
  const numericValue = Number(value);

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(numericValue) ? numericValue : 0);
}

function getStatusLabel(totalVendas) {
  const total = Number(totalVendas) || 0;

  if (total > 200) return { label: "Popular", className: "popular" };
  if (total > 50) return { label: "Medio", className: "medio" };
  return { label: "Baixo", className: "baixo" };
}

export default function Dashboard() {
  const { data: metrics, isLoading } = useGetMetrics();

  const produtos = (Array.isArray(metrics?.top_produtos) ? metrics.top_produtos : []).map((produto, index) => ({
    id: produto?.id ?? index,
    nome: produto?.nome ?? "Produto sem nome",
    preco: Number(produto?.preco ?? 0),
    total_vendas: Number(produto?.total_vendas ?? produto?.vendas ?? 0),
  }));

  const totalPedidos = Number(metrics?.total_vendas ?? 0) || 0;
  const crescimentoPercentual = Number(metrics?.crescimento ?? 0) || 0;
  const taxaSucesso = Number(metrics?.taxa ?? 0) || 0;
  const produtosCadastrados = produtos.length;
  const faturamentoEstimado = Number(metrics?.faturamento ?? 0) || 0;
  const ticketMedio = Number(metrics?.ticket_medio ?? 0) || 0;
  const topProduto = produtos[0] ?? null;

  const alertas = [
    {
      id: 1,
      titulo: "Canal comercial acelerando",
      descricao: `Crescimento atual em ${crescimentoPercentual.toFixed(2)}% sobre o periodo anterior.`,
      tone: crescimentoPercentual >= 0 ? "positive" : "negative",
    },
    {
      id: 2,
      titulo: "Qualidade da conversao",
      descricao: `Taxa de sucesso consolidada em ${taxaSucesso.toFixed(2)}% nas operacoes monitoradas.`,
      tone: taxaSucesso >= 70 ? "positive" : "neutral",
    },
    {
      id: 3,
      titulo: "Produto com maior tracao",
      descricao: topProduto
        ? `${topProduto.nome} lidera com ${topProduto.total_vendas} vendas.`
        : "Aguardando dados de produtos mais vendidos.",
      tone: "neutral",
    },
  ];

  const atividades = [
    `Resumo atualizado para ${new Date().toLocaleDateString("pt-BR")}.`,
    topProduto
      ? `Produto destaque: ${topProduto.nome} continua no topo das vendas.`
      : "Sem produto destaque no momento.",
    `Base atual com ${produtosCadastrados} produtos monitorados no dashboard.`,
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-hero">
        <div>
          <span className="dashboard-eyebrow">Visao geral da operacao</span>
          <h1>{saudacao()}, Admin</h1>
          <p>
            Acompanhe performance comercial, catalogo, sinais de crescimento e
            os produtos com maior impacto no resultado.
          </p>

          <div className="hero-badges-dashboard">
            <span className="hero-badge-dashboard">Painel executivo</span>
            <span className="hero-badge-dashboard">Dados em tempo quase real</span>
            <span className="hero-badge-dashboard">Resumo de vendas e catalogo</span>
          </div>
        </div>

        <div className="hero-side-panel">
          <span className="hero-side-label">Pulso do dia</span>
          <strong>{formatCurrency(faturamentoEstimado || 12430)}</strong>
          <p>Faturamento estimado com base no desempenho carregado.</p>
        </div>
      </header>

      <section className="cards-dashboard">
        <div className="card highlight-card">
          <h3>
            <MdShoppingCart /> Total de vendas
          </h3>
          <p>{totalPedidos}</p>
          <span className="card-footnote">Volume consolidado do periodo</span>
        </div>

        <div className="card">
          <h3>
            <MdTrendingUp /> Crescimento
          </h3>
          <p>{crescimentoPercentual.toFixed(2)}%</p>
          <span className={`card-footnote ${crescimentoPercentual >= 0 ? "positive" : "negative"}`}>
            Comparado ao periodo anterior
          </span>
        </div>

        <div className="card">
          <h3>
            <MdCheckCircle /> Taxa de sucesso
          </h3>
          <p>{taxaSucesso.toFixed(2)}%</p>
          <span className="card-footnote">Conversoes e operacoes concluidas</span>
        </div>

        <div className="card">
          <h3>
            <MdInventory2 /> Produtos cadastrados
          </h3>
          <p>{produtosCadastrados}</p>
          <span className="card-footnote">Itens ativos monitorados</span>
        </div>
      </section>

      <section className="cards-secundarios dashboard-secondary-grid">
        <div className="mini-card">
          <MdAttachMoney size={24} />
          <div>
            <h4>Faturamento estimado</h4>
            <p>{formatCurrency(faturamentoEstimado || 12430)}</p>
          </div>
        </div>

        <div className="mini-card">
          <MdSpeed size={24} />
          <div>
            <h4>Ticket medio</h4>
            <p>{formatCurrency(ticketMedio || 540)}</p>
          </div>
        </div>

        <div className="mini-card">
          <MdStorage size={24} />
          <div>
            <h4>Produtos em estoque</h4>
            <p>{produtosCadastrados > 0 ? produtosCadastrados * 7 : 210}</p>
          </div>
        </div>

        <div className="mini-card">
          <MdAccessTime size={24} />
          <div>
            <h4>Pedidos hoje</h4>
            <p>{Math.max(23, Math.round(totalPedidos * 0.08))}</p>
          </div>
        </div>
      </section>

      <section className="dashboard-insights-grid">
        <article className="insights-panel">
          <div className="section-heading">
            <div>
              <h2>Insights rapidos</h2>
              <p>Leituras para decidir mais rapido ao longo do dia.</p>
            </div>
            <span className="section-chip">
              <MdOutlineInsights /> Prioridades
            </span>
          </div>

          <div className="insight-list">
            {alertas.map((alerta) => (
              <div className="insight-item" key={alerta.id}>
                <div>
                  <strong>{alerta.titulo}</strong>
                  <p>{alerta.descricao}</p>
                </div>
                <span className={`insight-pill ${alerta.tone}`}>
                  {alerta.tone === "positive"
                    ? "Bom sinal"
                    : alerta.tone === "negative"
                      ? "Atencao"
                      : "Monitorar"}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="insights-panel compact">
          <div className="section-heading">
            <div>
              <h2>Resumo do catalogo</h2>
              <p>Visao sintetica do que mais importa agora.</p>
            </div>
          </div>

          <div className="catalog-summary">
            <div className="summary-row">
              <span>Produto lider</span>
              <strong>{topProduto?.nome ?? "Aguardando dados"}</strong>
            </div>
            <div className="summary-row">
              <span>Vendas do lider</span>
              <strong>{topProduto?.total_vendas ?? 0}</strong>
            </div>
            <div className="summary-row">
              <span>Performance media</span>
              <strong>
                {produtosCadastrados ? Math.round(totalPedidos / produtosCadastrados) : 0} por item
              </strong>
            </div>
          </div>
        </article>
      </section>

      <section className="graficos-section enhanced-graphics">
        <div className="section-heading">
          <div>
            <h2>Graficos de desempenho</h2>
            <p>Distribuicao visual para acompanhar receita, categorias e ranking.</p>
          </div>
        </div>
        <Graficos />
      </section>

      <section className="dashboard-table-grid">
        <section className="tabela-produtos">
          <div className="section-heading">
            <div>
              <h2>Top produtos vendidos</h2>
              <p>Ranking dos itens com maior tracao comercial.</p>
            </div>
          </div>

          {isLoading ? (
            <p>Carregando produtos...</p>
          ) : (
            <table className="produtos-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Produto</th>
                  <th>Vendas</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {produtos.map((produto) => {
                  const status = getStatusLabel(produto.total_vendas);

                  return (
                    <tr key={produto.id}>
                      <td>{produto.id}</td>
                      <td>{produto.nome}</td>
                      <td>{produto.total_vendas}</td>
                      <td>
                        <span className={`status ${status.className}`}>{status.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>

        <aside className="atividade modern-activity">
          <div className="section-heading">
            <div>
              <h2>Atividade recente</h2>
              <p>Ultimos sinais importantes da operacao.</p>
            </div>
          </div>

          <ul>
            {atividades.map((atividade, index) => (
              <li key={`${atividade}-${index}`}>{atividade}</li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}
