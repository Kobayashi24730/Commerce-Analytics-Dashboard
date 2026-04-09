import { db } from "@/database";
import { clients } from "@/database/schema";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { eq, sql } from "drizzle-orm";

export const addClient = async (req: Request, res: Response) => {
    const { nome, email, telefone, senha, cargo, ativo, segmentacao } = req.body;
    try {
        if( nome == null || email == null || senha == null || telefone == null || cargo == null || ativo == null || segmentacao == null){
            return res.status(400).json({ message: "Preencha todos os campos" });
        }
        const sqlReturn = await db.insert(clients).values({
            nome,
            email,
            telefone,
            senha,
            cargo,
            ativo,
            segmentacao
        }).returning();
        return res.status(200).json({
            sucesso: true,
            message: "Cliente adicionado com sucesso.",
            data: sqlReturn
        });
    } catch(err:any) {

    }
};

export const editClient = async (req: Request, res: Response) => {
    const { id, nome, email, telefone, senha, cargo, ativo, segmentacao } = req.body;
    try {
        if ( id == null || nome == null || email == null || senha == null || telefone == null || cargo == null || ativo == null || segmentacao == null ){
            return res.status(200).json({ message: "Preencha todos os campos" });
        }
        const sqlReturn = await db.update(clients).set({
            nome,
            email,
            telefone,
            senha,
            cargo,
            ativo,
            segmentacao,
        }).where(eq(clients.id, id)).returning();
        return res.status(200).json({
            sucesso: true,
            message: "Cliente editado com sucesso.",
            data: sqlReturn
        });
    } catch(err:any) {
        console.log("ERRO REAL:", err);
        return res.status(500).json({
            sucesso: false,
            message: "Erro ao editar cliente.",
            data: err.message
        });
    }
};

export const delClients = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        if(id == null){
            return res.status(400).json({ message: "Preencha todos os campos" });
        }
        const sqlReturn = await db.delete(clients).where(eq(clients.id, id)).returning();
        return res.status(200).json({
            sucesso: true,
            message: "Cliente deletado com sucesso.",
            data: sqlReturn
        })
    } catch(err:any) {
        console.log("ERRO REAL:", err);
        return res.status(500).json({
            sucesso: false,
            message: "Erro ao deletar cliente.",
            data: err.message
        });
    }
};
export const getClients = async (req: Request, res: Response) => {
    try{
        const sqlReturn = await db.select().from(clients);
        const sqlFormatado = sqlReturn.map((client) => {
            return {
                id: client.id,
                nome: client.nome,
                email: client.email,
                telefone: client.telefone,
                senha: client.senha,
                cargo: client.cargo,
                ativo: client.ativo,
                segmentacao: client.segmentacao,
                criado_em: client.criado_em,
                updated_at: client.updated_at
            };
        });
        return res.status(200).json({
            successo: true,
            message: "Clientes buscados com sucesso.",
            data: sqlFormatado
        });
    } catch ( err:any) {
        console.log("ERRO REAL:", err);
        return res.status(500).json({
            sucesso: false,
            message: "Erro ao buscar clientes.",
            data: err.message
        });
    }
};