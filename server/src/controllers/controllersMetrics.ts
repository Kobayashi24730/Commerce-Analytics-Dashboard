import { Request, Response } from "express";
import { db } from "@/database";
import { sql } from "drizzle-orm";

export const getMetrics = async (req: Request, res: Response) => {
    try {
        const response = await db.execute(
            sql`SELECT get_dashboard_metrics() AS metrics`
        ) as any;
        const dataDashboard = response.rows?.[0]?.metrics ?? null;
        return res.status(200).json({
            sucesso: true,
            message: "Métricas buscadas com sucesso.",
            data: dataDashboard
        });
    } catch(err:any) {
        console.log("ERRO REAL:", err);
        return res.status(500).json({
            sucesso: false,
            message: "Erro ao buscar méticas.",
            data: err.message
        });
    }
};
