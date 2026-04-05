import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delProdutos } from "../../services/servicesProdutos";

type delProdutoType = {
  id: number
}

export function useDel() {

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ( produto: delProdutoType ) => delProdutos( produto ),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
    }
  });
}
