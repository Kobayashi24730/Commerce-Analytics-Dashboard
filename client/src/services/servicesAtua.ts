import { API_URL } from "@/api/apiClient";
export async function AtualizacoesAdd() {
    const response = await fetch(`${API_URL}/atualizacoes`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
    });

    if (!response.ok) {
        throw new Error("Erro ao adicionar Atualizacoes!!");
    }
    const data = await response.json();
    return data?.data ?? [];
}