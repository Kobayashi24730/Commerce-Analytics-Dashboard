import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UsePayload {
    id: number;
    nome: string;
    cargo: string;
}

interface AuthenticatedRequest extends Request {
    user?: UsePayload;
}
export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({ message: "Token não fornecido" });
        }
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UsePayload;
        req.user = decoded;
        next();
    } catch (err: any) {
        console.log("Error no Middleware de autenticação: ", err);
        return res.status(500).json({
            sucesso: false,
            message: "Erro no Middleware de autenticação",
            error: err.message
        });
    }
};

export const onlyAdminMiddleware = (req: any, res: Response, next: NextFunction) => {
    if(!req.user){
    return res.status(401).json({ message: "Usuário não autenticado" });
    }
    if(req.user.cargo !== "admin"){
    return res.status(403).json({ message: "Acesso negado: apenas administradores podem acessar este recurso" });
    }
    next();
};
