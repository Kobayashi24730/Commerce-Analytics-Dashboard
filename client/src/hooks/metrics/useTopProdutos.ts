import { useQuery } from "@tanstack/react-query";
import { TopProdutos } from "../../services/servicesProdutos"

export const useTop = () => {
  return useQuery({
    queryKey: ["TopVendidos"],
    queryFn: TopProdutos,
    retry: 2,
    staleTime: 1000 * 60 * 5
  })
}
