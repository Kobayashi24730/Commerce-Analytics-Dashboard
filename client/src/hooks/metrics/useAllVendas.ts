import { useQuery } from "@tanstack/react-query";
import { vendasTotais, getTotaisVendas } from "../../services/servicesProdutos";

export const useAll = () => {
  return useQuery<vendasTotais>({
    queryKey: ["vendastotais"],
    queryFn: getTotaisVendas,
    retry: 2,
    staleTime: 1000 * 60 * 5
  })
}
