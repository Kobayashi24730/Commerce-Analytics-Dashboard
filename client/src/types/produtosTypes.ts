export interface Produtos {
  id: number;
  nome: string;
  preco: number;
  category: string;
  vendas: number;
  demanda: number;
  quantity: number;
  sku: number;

  comparacao_atual: {
    ano_anterior: number;
    variacao_percentual: number;
  };
}
export interface addProduto {
  nome: string;
  preco: number;
  vendas: number;
  demanda: number;
  vendas_ano_anterior: number;
}
export interface editProduto {
  id: number;
  nome: string;
  preco: number;
  quantity: number;
}

export interface excluirProduto {
  id: number;
}