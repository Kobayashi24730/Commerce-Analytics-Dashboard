import { db } from "../database";
import { produtos, administracao, clients } from "../database/schema";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { eq, sql } from "drizzle-orm";
import type { Config } from "drizzle-kit"; // Import the Config from 'drizzle-kit';


export const getProdutos = async (req: Request, res: Response) => {
  try {
    const data = await db.select().from(produtos);
    const produtosFormatados = data.map((produto) => {
      const variacao = produto.vendas_ano_anterior === 0 ? 0 : ((produto.vendas - produto.vendas_ano_anterior) / produto.vendas_ano_anterior) * 100;

      return {
        id: produto.id,
        nome: produto.nome,
        category: produto.category,
        preco: produto.preco,
        vendas: produto.vendas,
        demanda: produto.demanda,
        quantity: produto.quantity,
        sku: produto.sku,
        description: produto.description,
        image: produto.image,
        comparacao_atual: {
          ano_anterior: produto.vendas_ano_anterior,
          variacao_percentual: Number(variacao.toFixed(2))
        }
      };
    });

    res.json({
      "produtos": produtosFormatados
    });

  } catch (err: any) {
    console.error("ERRO REAL:", err);
    return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar produtos.", data: err.message });
  }
};

export const addProdutos = async (req: Request, res: Response) => {
  try {
    console.log("BODY COMPLETO: ", req.body);
    const {
      nome,
      category,
      quantity,
      sku,
      description,
      image,
      preco,
      vendas,
      demanda,
      vendas_ano_anterior,
      tentativas_compra
    } = req.body;

    if (nome == null || preco == null || vendas == null || demanda == null || vendas_ano_anterior == null) {
      return res.status(400).json({ erro: "Campos obrigatórios faltando!" });
    }

    const all = await db
      .insert(produtos)
      .values({
        nome,
        category,
        quantity,
        sku,
        description,
        image,
        preco,
        vendas,
        demanda,
        vendas_ano_anterior,
        tentativas_compra
      })
      .returning();
    return res.status(201).json({
      sucesso: true,
      mensagem: "Produto adicionado com sucesso!!!",
      dado: all[0]
    });
  } catch (err: any) {
    console.log("Erro ao adicionar produto:", err);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Produto não adicionado",
      dado: err.message,
    });
  }
};

export const editarProduto = async (req: Request, res: Response) => {
  try {
    const { id, nome, preco, quantity, category, sku, description, image, vendas, demanda, vendas_ano_anterior, tentativas_compra } = req.body;
    if (id == null) {
      return res.status(400).json({
        error: "ID necessário para edição!!"
      });
    }

    console.log("Infos chegaram no backend!!")

    const edicao = await db.update(produtos)
      .set({
        nome: nome ?? undefined,
        preco: preco ?? undefined,
        quantity: quantity ?? undefined,
        category: category ?? undefined,
        sku: sku ?? undefined,
        description: description ?? undefined,
        image: image ?? undefined,
        vendas: vendas ?? undefined,
        demanda: demanda ?? undefined,
        vendas_ano_anterior: vendas_ano_anterior ?? undefined,
        tentativas_compra: tentativas_compra ?? undefined,
      })
      .where(eq(produtos.id, Number(id)))
      .returning();

    if (edicao.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Produto não encontrado."
      });
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: "Produto editado com sucesso!!",
      data: edicao[0]
    });
  } catch (err: any) {
    console.log("Erro ao editar produto: ", err)
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao editar produtos.",
      data: err.message
    });
  }
};

export const excluirProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (id == null) {
      return res.status(400).json({
        error: "Parâmetro ID é obrigatório!!"
      });
    }
    const del = await db.delete(produtos).where(eq(produtos.id, Number(id))).returning();

    if (del.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Produto não encontrado."
      });
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: "Produto deletado com sucesso!!",
      data: del[0]
    });
  } catch (err: any) {
    console.log("Erro ao deletar produto: ", err);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao deletar produto!!",
      data: err.message
    });
  }
};

export const editarClient = async (req: Request, res: Response) => {
  try {
    const { id, nome, email, senha, cargo } = req.body;

    if (id == null || nome == null || email == null || senha == null) {
      return res.status(400).json({
        error: "Parâmetros ID, Nome, Email e Senha são obrigatórios!!"
      });
    }
    const hash = await bcrypt.hash(senha, 10);

    const edicao = await db.update(clients)
      .set({
        nome,
        email,
        senha: hash,
        cargo: cargo ?? undefined
      })
      .where(eq(clients.id, Number(id)))
      .returning();

    if (edicao.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Cliente não encontrado."
      });
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: "Cliente editado com sucesso!!",
      data: edicao[0]
    });
  } catch (err: any) {
    console.log("Erro ao editar as informacoes do client:", err)
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao editar as informacoes do client",
      data: err.message
    });
  }
};

export const excluirClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (id == null) {
      return res.status(400).json({
        error: "ID obrigatório para excluir cliente"
      });
    }

    const del = await db.delete(clients).where(eq(clients.id, Number(id))).returning();

    if (del.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Cliente não encontrado."
      });
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: "Cliente excluído com sucesso",
      data: del[0]
    });
  } catch (err: any) {
    console.log("Erro ao deletar client:", err)
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao deletar client",
      data: err.message
    });
  }
};

export const TopVendidos = async (req: Request, res: Response) => {
  try {
    const all = await db.execute(sql`
      SELECT id, nome, vendas AS total_vendas
      FROM produtos 
      ORDER BY vendas DESC LIMIT 5
    `);

    return res.status(200).json({
      sucesso: true,
      mensagem: "Top Produtos encontrados com sucesso!",
      dado: all.rows
    });

  } catch (err: any) {
    console.log("Erro ao coletar Top produtos:", err);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Top Produtos não encontrados.",
      dado: err.message,
    });
  }
};

export const AllVendas = async (req: Request, res: Response) => {
  try {
    const result = await db.execute(sql`SELECT SUM(vendas) AS total_vendas FROM produtos`);
    const total = Number(result.rows[0]?.total_vendas ?? 0);

    return res.status(200).json({
      sucesso: true,
      mensagem: "Data coletada com sucesso!!",
      data: total
    });
  } catch (err: any) {
    console.log("Erro ao coletar data da api: ", err);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao coletar data!!",
      data: err.message
    });
  }
};

export const taxa_sucesso = async (req: Request, res: Response) => {
  try {
    const result = await db.execute(sql` SELECT SUM(vendas) as vendas, SUM(tentativas_compra) as tentativas FROM produtos `);

    const vendas = Number(result.rows[0]?.vendas ?? 0);
    const tentativas = Number(result.rows[0]?.tentativas ?? 0);
    const taxa = tentativas === 0 ? 0 : (vendas / tentativas) * 100;

    return res.status(200).json({
      sucesso: true,
      mensagem: "Taxa retornada com sucesso!!",
      dado: taxa.toFixed(2)
    });
  } catch (err: any) {
    console.log("Erro ao coletar dados: ", err);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao coletar dados!!",
      dado: err.message
    });
  }
};

export const vendas_vs_vendas_ano_anterior = async (req: Request, res: Response) => {
  try {
    const result = await db.execute(sql`SELECT SUM(vendas) as vendas, SUM(vendas_ano_anterior) AS vendas_ano_anterior FROM produtos`);
    const vendas = Number(result.rows[0]?.vendas ?? 0);
    const passado = Number(result.rows[0]?.vendas_ano_anterior ?? 0);
    const crescimento = passado === 0 ? 0 : ((vendas - passado) / passado) * 100;

    return res.status(200).json({
      sucesso: true,
      mensagem: "Data coletada com sucesso!!",
      data: crescimento.toFixed(2)
    });
  } catch (err: any) {
    console.log("Erro ao coletar data: ", err);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao coletar dados da api!!",
      data: err.message
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    if (email == null || senha == null) {
      return res.status(400).json({
        mensagem: "Erro, todos os parâmetros são obrigatórios!!"
      });
    }

    const user = await db.select().from(clients).where(eq(clients.email, email));
    if (user.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Erro, usuário não encontrado!!"
      });
    }

    const usuario = user[0];
    const isValid = await bcrypt.compare(senha, usuario.senha);

    if (!isValid) {
      return res.status(401).json({
        sucesso: false,
        mensagem: "Erro, senha do usuário inválida!!"
      });
    }

    const { senha: _, ...dataSemSenha } = usuario;

    return res.status(200).json({
      "client": dataSemSenha
    });

  } catch (err: any) {
    console.log("Erro ao coletar dados do user: ", err);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao coletar dados do user",
      data: err.message
    });
  }
};

export const getClients = async (req: Request, res: Response) => {
  try {
    const dados = await db.select().from(clients);

    const ClientsFormatados = dados.map((client) => {
      return {
        id: client.id,
        nome: client.nome,
        email: client.email,
        cargo: client.cargo
      };
    });

    return res.json({
      "clients": ClientsFormatados
    });
  } catch (err: any) {
    console.log("Erro ao coletar data clients: ", err);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao coletar data clients",
      data: err.message
    });
  }
};

export const AddClients = async (req: Request, res: Response) => {
  try {
    const { nome, senha, email, cargo } = req.body;

    if (nome == null || senha == null || email == null) {
      return res.status(400).json({
        error: "Erro: parâmetros Nome, Email e Senha são obrigatórios!",
      });
    }

    const hash = await bcrypt.hash(senha, 10);

    const emailExits = await db.select().from(clients).where(eq(clients.email, email));
    if (emailExits.length > 0) {
      return res.status(400).json({
        error: "Erro: Email já cadastrado",
      });
    }

    const all = await db.insert(clients).values({
      nome,
      senha: hash,
      email,
      cargo
    }).returning();

    return res.status(200).json({
      sucesso: true,
      mensagem: "Usuário criado com sucesso!",
      dado: all[0],
    });
  } catch (err: any) {
    console.log("Erro ao coletar as informacoes dos usuarios: ", err);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Usuário não criado.",
      dado: err.message,
    });
  }
};

export const AddAtualizacoes = async (req: Request, res: Response) => {
  try {
    const { criador, date, tipo, texto } = req.body;
    if( criador == null || date == null || tipo == null || texto == null) {
      return res.status(400).json({ message: "Erro: parâmetros Criador, Data, Tipo e Texto são obrigatórios!" });
    }
    const data = await db.insert(administracao).values({
      criador, date, tipo, texto
    }).returning();

    return res.status(200).json({
      sucesso: true,
      message: "Atualizacao adicionada com sucesso",
      data: data
    });

  } catch (err: any) {
    console.log("Erro ao adicionar a atualizacao: ", err);
    return res.status(500).json({ 
      sucesso: false,
      message: "Erro ao adicionar a atualizacao",
      data: err.message
    });
  }
};

export const getAtualizacoes = async (req: Request, res: Response) => {
  try {
    const data = await db.select().from(administracao);
    const AtualizacoesFormatadas = data.map((Atu) => {
      return {
        id: Atu.id,
        atualizacao: Atu.texto
      };
    });

    res.json({
      "Atualizacoes": AtualizacoesFormatadas
    });
  } catch (err: any) {
    return res.status(500).json({
      sucesso: false,
      mensagem: "Não foi possível pegar as atualizações",
      data: err.message
    });
  }
};
