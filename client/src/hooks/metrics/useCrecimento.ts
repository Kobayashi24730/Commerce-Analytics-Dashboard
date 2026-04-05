import { useQuery } from "@tanstack/react-query";
import { getCrecimento, vendas_vs_vendas_ano_anterior } from "../../services/servicesProdutos";

export const useCreci = () => {
  return useQuery<vendas_vs_vendas_ano_anterior>({
    queryKey: ["crecimento"],
    queryFn: getCrecimento,
    retry: 2,
    staleTime: 1000 * 60 * 5
  })
}
