import bcrypt from "bcryptjs";
import { db } from "../database";
import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import { eq, sql } from "drizzle-orm";
import { clients } from "../database/schema";

const router = express.Router();
const SECRET = process.env.JWT_SECRET as string;

router.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha){
            return res.status(400).json({ message: "Preencha todos os campos" });
        }
    
        const user = await db.select().from(clients).where(eq(clients.email, email));
        if (user.length === 0) {
            return res.status(400).json({ message: "Usuário não encontrado" });
        }
        const usuariovalido = user[0];
        const senhavalida = await bcrypt.compare(senha, usuariovalido.senha);
        if(!senhavalida){
            return res.status(400).json({ message: "Senha incorreta" });
        }
    
        const token = jwt.sign(
            {
                id: usuariovalido.id,
                nome: usuariovalido.nome,
                cargo: usuariovalido.cargo
            },
            SECRET,
            { expiresIn: "1h" }
        );
        const { senha: _, ...userSemSenha } = usuariovalido;
    
        return res.status(200).json({
            message: "Login bem-sucedido",
            token,
            user: userSemSenha
        });
    } catch (err: any) {
        console.log("Error ao tentar Logar: ", err);
        return res.status(500).json({
            sucesso: false,
            message: "Erro ao tentar logar",
            error: err.message
        });
    }
});

export default router;