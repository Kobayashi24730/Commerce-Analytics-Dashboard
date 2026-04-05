import { useMutation, useQueryClient } from "@tanstack/react-query";
import { excluirClient } from "../../services/servicesclients.ts";

type delUserType = {
  id: number;
}

export const useDel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ( usuario: delUserType ) => excluirClient( usuario ),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    }
  });
}
