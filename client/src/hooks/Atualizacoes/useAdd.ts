import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AtualizacoesAdd } from "../../services/servicesAtua";
type AtualiParams = {
    criador: string;
    date: string;
    tipo: string;
    texto: string;
};

export const useAdd = () => {
    const queryclient = useQueryClient();
    return useMutation({
        mutationFn: ( Atualizacao: AtualiParams ) => AtualizacoesAdd(Atualizacao),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ["atualizacao"] });
        }
    });
}