import { API_URL } from "../api/apiClient";
import { produtos } from '../../../server/src/database/schema';
import { Produtos,addProduto,editProduto,excluirProduto,ProdutosTop,vendasTotais,taxavalor, vendas_vs_vendas_ano_anterior } from "../types";

export async function getProdutos(): Promise<Produtos[]> {
  const response = await fetch(`${API_URL}/produtos`);
  
  if (!response.ok) {
    throw new Error("Erro ao buscar data produtos!!");
  }

  const data = await response.json();

  return data?.produtos ?? [];
}

export async function addProdutos( produto: addProduto ) {
  const response = await fetch(`${API_URL}/produtos`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(produto)
  });

  if (!response.ok) {
    throw new Error("Erro ao adicionar produtos!!");
  }

  return response.json();
}


export async function editProduto( produto: editProduto ) {
  const response = await fetch(`${API_URL}/produtos/${produto.id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify( produto ),
  });
  
  if (!response.ok) {
    throw new Error("Erro ao editar produto!!");
  }
  
  return response.json();
}

export async function delProdutos( produto: excluirProduto ) {
  const response = await fetch(`${API_URL}/produtos/${produto.id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar produto!!");
  }

  return response.json();
}

export async function TopProdutos(): Promise<ProdutosTop[]> {
  const response = await fetch(`${API_URL}/topvendidos`);

  if (!response.ok) {
    throw new Error("Erro ao coletar TopProdutos!!");
  }

  const data = await response.json();
  return data?.dado ?? [];
}

export async function getTotaisVendas(): Promise<vendasTotais> {
  const response = await fetch(`${API_URL}/allvendas`);

  if (!response.ok) {
    throw new Error("Erro ao coletar data do all produtos!!");
  }

  const data = await response.json();
  return { total_vendas: data.data };
}

export async function getTaxaSucesso(): Promise<taxavalor> {
  const response = await fetch(`${API_URL}/taxasucesso`);

  if (!response.ok) {
    throw new Error("Erro ao coletar data da taxa!!");
  }

  const data = await response.json();
  return { taxa: data.data };
}

export async function getCrecimento(): Promise<vendas_vs_vendas_ano_anterior> {
  const response = await fetch(`${API_URL}/crecimento`);

  if (!response.ok) {
    throw new Error("Erro nao coletar data do crecimento!!");
  }

  const data = await response.json();
  return { crecimento: data.data };
}
