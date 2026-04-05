import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editarClient } from "../../services/servicesclients";

type editUserType = {
  id: number;
  nome: string;
  senha: string;
  email: string;
  cargo: string;
}

export const useEdit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ( usuario: editUserType ) => editarClient( usuario ),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] })
    }
  });
}
