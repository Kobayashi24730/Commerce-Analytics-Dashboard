import { useQuery } from "@tanstack/react-query";
import { getProdutos } from "../services/servicesProdutos";
import { Produtos } from "../types";

export function useProdutos() {
  return useQuery<Produtos[]>({
    queryKey: ["produtos"],
    queryFn: getProdutos,
    retry: 2,
    staleTime: 1000 * 60 * 5
  });
}
