import { useQuery } from "@tanstack/react-query";
import { getClients } from "../../services/servicesclients";

export const useGetUsers = () => {
  return useQuery({ queryKey: ['client'], queryFn: getClients });
}
