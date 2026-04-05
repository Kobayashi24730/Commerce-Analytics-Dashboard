export interface ProdutosTop {
  id: number;
  nome: string;
  total_vendas: number;
}
export interface vendasTotais {
  total_vendas: number;
}
export interface taxavalor {
  taxa: number;
}
export interface vendas_vs_vendas_ano_anterior {
  crecimento: number;
}

export interface AtualizacoesAdd {
  criador: string;
  date: number;
  tipo: string;
  texto: string;
}