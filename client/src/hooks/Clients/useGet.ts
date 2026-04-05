import { useQuery } from "@tanstack/react-query";
import { Clients, getClients } from "../../services/servicesclients";

export const useGet = () => {
  return useQuery<Clients[]>({
    queryKey: ["clients"],
    queryFn: getClients,
    retry: 2,
    staleTime: 1000 * 60 * 5
  });
}
