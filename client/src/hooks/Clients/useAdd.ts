import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addClient } from "../../services/servicesclients";

type addUserType = {
  nome: string;
  senha: string;
  email: string;
  cargo: string;
}

export const useAdd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ( usuario: addUserType ) => addClient( usuario ),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    }
  });
}
