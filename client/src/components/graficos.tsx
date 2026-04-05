import { useState, useEffect } from "react";
import LinearChartComponents from "./charts/LineChartComponents";
import CategoryChart from "./charts/CategoryChartComponents";
import TopBarChart from "./charts/TopBarChartComponents";
import { ChartData } from "../types/chartTypes";
import "../styles/GraficosStyles.css";
import { API_URL } from "@/api/apiClient";


export default function Graficos() {
  const [dataLine, setDataLine] = useState<ChartData[]>([]);
  const [dataCategory, setDataCategory] = useState<any[]>([]);
  const [databar, setDataBar] = useState<any[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscadedados() {
      try {
        const response = await fetch(`${API_URL}/produtos`);
        if (!response.ok) {
          throw new Error("Erro ao busca data na API!!");
        }

        const result = await response.json();
        const DadosFormatadosLine = result.produtos.map((produto) => ({
          nome: produto.nome,
          value: produto.preco
        }));
        const DadosFormatadosCategory = result.produtos.map((produto) => ({
          category: produto.category,
          vendas: produto.vendas
        }));
        const DadosFormatadosBar = result.produtos.map((produto) => ({
          nome: produto.nome,
          vendas: produto.vendas
        }));
        setDataLine(DadosFormatadosLine);
        setDataCategory(DadosFormatadosCategory);
        setDataBar(DadosFormatadosBar);

      } catch (err) {
        if (err instanceof Error) {
          console.log("Erro ao busca dados do gafico: ", err.message);
        }
        setErro("Erro ao busca data.");
      } finally {
        setLoading(false);
      }
    }

    buscadedados();
  }, []);

  return (
    <div className="graficos-grid">
      {loading && <div className="loading-grafico-one" >Carregando...</div>}
      {erro && <div className="erro-grafico-one">{erro}</div>}

      {!loading && !erro && (
        <div className="charts_container">
          <div className="chart-box">
            <LinearChartComponents data={dataLine} />
          </div>
          <div className="chart-box">
            <CategoryChart data={dataCategory} />
          </div>
          <div className="chart-box">
            <TopBarChart data={databar} />
          </div>
        </div>
      )}
    </div>
  );
}
