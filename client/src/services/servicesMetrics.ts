import { API_URL } from "@/api/apiClient";
export async function getMetrics() {
    const response = await fetch(`${API_URL}/metrics`);
    if (!response.ok) {
        throw new Error("Erro ao buscar metricas.");
    }
    const data = await response.json();
    return data?.data ?? null;
};
