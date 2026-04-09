import { db } from "@/database";
import { produtos } from "@/database/schema";
import { Request, Response } from "express";
import { eq, sql } from "drizzle-orm";

export const addProduto = async (req: Request, res: Response) => {
    const { nome, categoria_id, quantity, sku, description, image, preco, custo, vendas, demanda, vendas_ano_anterior, tentativas_compra, ativo } = req.body;
    try {
        if(nome == null || quantity == null || description == null || preco == null || custo == null || demanda == null || vendas_ano_anterior == null || tentativas_compra == null || ativo == null || sku == null || categoria_id == null ){
            return res.status(400).json({ message: "Preencha todos os campos" });
        }
        const sqlInsert = await db.insert(produtos).values({
            nome,
            categoria_id,
            quantity,
            sku,
            description,
            image,
            preco,
            custo,
            vendas,
            demanda,
            vendas_ano_anterior,
            tentativas_compra,
            ativo
        }).returning();
        return res.status(200).json({
            sucesso: true,
            message: "Produto adicionado com sucesso.",
            data: sqlInsert
        });
    } catch (err:any) {
        console.log("ERRO REAL:", err);
        return res.status(500).json({
            sucesso: false,
            message: "Erro ao adicionar produto.",
            data: err.message
        });
    }
};

export const editProduto = async ( req: Request, res: Response) => {
    const { id, nome, categoria_id, quantity, sku, description, image, preco, custo, vendas, demanda, vendas_ano_anterior, tentativas_compra, ativo } = req.body;
    try {
        if(id == null || sku == null){
            return res.status(400).json({ message: "Preencha todos os campos" });
        }
        const sqlreturn = await db.update(produtos).set({
            nome,
            categoria_id,
            quantity,
            description,
            image,
            preco,
            custo,
            vendas,
            demanda,
            vendas_ano_anterior,
            tentativas_compra,
            ativo
        }).where(eq(produtos.id, id)).returning();
        return res.status(200).json({
            sucesso: true,
            message: "Produto editado com sucesso.",
            data: sqlreturn
        });
    } catch (err:any) {
        console.log("ERRO REAL:", err);
        return res.status(500).json({
            sucesso: false,
            message: "Erro ao editar produto.",
            data: err.message
        });
    }
};

export const delProduto = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        if(id === null){
            return res.status(400).json({ message: "Preencha todos os campos" });
        }
        const sqlreturn = await db.delete(produtos).where(eq(produtos.id, id)).returning();
        return res.status(200).json({
            sucessso: true,
            message: "Produto deletado com sucesso.",
            data: sqlreturn
        })
    } catch (err:any) {
        console.log("ERRO REAL:", err);
        return res.status(500).json({
            sucesso: false,
            message: "Erro ao deletar produto.",
            data: err.message
        })
    }
};
export const getProdutos = async (req: Request, res: Response) => {
    try {
        const sqlReturn = await db.select().from(produtos);
        const formatReturn = sqlReturn.map((produto) => {
            return {
                id: produto.id,
                nome: produto.nome,
                categoria_id: produto.categoria_id,
                quantity: produto.quantity,
                sku: produto.sku,
                description: produto.description,
                image: produto.image,
                preco: produto.preco,
                custo: produto.custo,
                vendas: produto.vendas,
                demanda: produto.demanda,
                vendas_ano_anterior: produto.vendas_ano_anterior,
                tentativas_compra: produto.tentativas_compra,
                ativo: produto.ativo,
                created_at: produto.created_at,
                updated_at: produto.updated_at
            }
        });
        return res.status(200).json({
            sucesso: true,
            message: "Produtos retornados com sucesso!",
            data: formatReturn
        });
    } catch (err:any) {
        console.log("ERRO REAL:", err);
        return res.status(500).json({
            sucesso: false,
            menssage: "Erro ao retornar produtos.",
            data: err.message
        });
    }
};