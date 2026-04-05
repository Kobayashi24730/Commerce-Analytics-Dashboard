import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduto } from "../../services/servicesProdutos";

type editProdutoType = {
  id: number,
  nome: string,
  preco: number,
  quantity: number
}

export function useEdit() {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: ( produto: editProdutoType ) => editProduto( produto ),

    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["produtos"] });
    }
  });
}
