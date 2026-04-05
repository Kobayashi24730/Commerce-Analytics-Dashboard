import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProdutos } from "../../services/servicesProdutos";

type addProdutoType = {
  nome: string,
  preco: number,
  vendas: number,
  demanda: number,
  vendas_ano_anterior: number
}

export function useAdd() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ( produto: addProdutoType ) => addProdutos( produto ),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
    }
  });
}
