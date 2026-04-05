import { varchar, pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const produtos = pgTable("produtos", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  category: text("category").notNull(),
  quantity: integer("quantity").notNull(),
  sku: integer("sku").unique(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  preco: integer("preco").notNull(),
  vendas: integer("vendas").notNull(),
  demanda: integer("demanda").notNull(),
  vendas_ano_anterior: integer("vendas_ano_anterior").notNull(),
  tentativas_compra: integer("tentativas_compra").default(0)
});

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  email: varchar("email").notNull(),
  senha: varchar("senha").notNull(),
  cargo: text("cargo").default("user"),
  criado_em: timestamp("criado_em").defaultNow().notNull()
});

export const administracao = pgTable("administracao", {
  id: serial("id").primaryKey(),
  criador: text("criador").notNull(),
  texto: text("texto").notNull(),
  date: timestamp("criado_em").defaultNow().notNull(),
  tipo: text("tipo").notNull()
});
