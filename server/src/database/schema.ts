import {
  varchar,
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  decimal,
  boolean,
  date,
} from "drizzle-orm/pg-core";

// ==================== TABELA DE CATEGORIAS ====================
export const categorias = pgTable("categorias", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull().unique(),
  descricao: text("descricao"),
  criado_em: timestamp("criado_em").defaultNow().notNull(),
});

// ==================== TABELA DE PRODUTOS ====================
export const produtos = pgTable("produtos", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  categoria_id: integer("categoria_id").notNull(), // FK para categorias
  quantity: integer("quantity").notNull().default(0),
  sku: varchar("sku").unique().notNull(),
  description: text("description"),
  image: text("image"), // URL da imagem
  preco: decimal("preco", { precision: 10, scale: 2 }).notNull(), // R$ com centavos
  custo: decimal("custo", { precision: 10, scale: 2 }).default("0"), // Custo unitário
  vendas: integer("vendas").notNull().default(0), // Total de unidades vendidas
  demanda: integer("demanda").notNull().default(0), // Demanda esperada
  vendas_ano_anterior: integer("vendas_ano_anterior").notNull().default(0),
  tentativas_compra: integer("tentativas_compra").default(0),
  ativo: boolean("ativo").default(true),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// ==================== TABELA DE CLIENTES ====================
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  email: varchar("email").notNull().unique(),
  telefone: varchar("telefone"), // Para WhatsApp
  senha: varchar("senha").notNull(),
  cargo: text("cargo").default("user"), // user, admin
  ativo: boolean("ativo").default(true),
  segmentacao: text("segmentacao").default("standard"), // standard, premium, vip
  criado_em: timestamp("criado_em").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// ==================== TABELA DE CANAIS DE VENDAS ====================
export const canais_vendas = pgTable("canais_vendas", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull().unique(),
  descricao: text("descricao"),
  ativo: boolean("ativo").default(true),
  criado_em: timestamp("criado_em").defaultNow().notNull(),
});

// ==================== TABELA DE VENDAS/PEDIDOS ====================
export const vendas = pgTable("vendas", {
  id: serial("id").primaryKey(),
  cliente_id: integer("cliente_id").notNull(), // FK para clients
  canal_id: integer("canal_id").notNull(), // FK para canais_vendas
  valor_total: decimal("valor_total", { precision: 12, scale: 2 }).notNull(),
  quantidade_itens: integer("quantidade_itens").notNull(),
  status: text("status").default("pendente"), // pendente, confirmada, entregue, cancelada
  data_venda: timestamp("data_venda").defaultNow().notNull(),
  data_entrega: timestamp("data_entrega"),
  notas: text("notas"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// ==================== TABELA DE ITENS DE VENDA ====================
export const vendas_itens = pgTable("vendas_itens", {
  id: serial("id").primaryKey(),
  venda_id: integer("venda_id").notNull(), // FK para vendas
  produto_id: integer("produto_id").notNull(), // FK para produtos
  quantidade: integer("quantidade").notNull(),
  preco_unitario: decimal("preco_unitario", { precision: 10, scale: 2 }).notNull(),
  subtotal: decimal("subtotal", { precision: 12, scale: 2 }).notNull(),
});

// ==================== TABELA DE PAGAMENTOS ====================
export const pagamentos = pgTable("pagamentos", {
  id: serial("id").primaryKey(),
  venda_id: integer("venda_id").notNull(), // FK para vendas
  valor: decimal("valor", { precision: 12, scale: 2 }).notNull(),
  metodo: text("metodo").notNull(), // credito, debito, pix, boleto, assinatura
  status: text("status").default("pendente"), // pendente, confirmado, falhou
  data_pagamento: timestamp("data_pagamento"),
  referencia_externa: varchar("referencia_externa"), // ID de gateway
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// ==================== TABELA DE ASSINATURAS ====================
export const assinaturas = pgTable("assinaturas", {
  id: serial("id").primaryKey(),
  cliente_id: integer("cliente_id").notNull(), // FK para clients
  produto_id: integer("produto_id").notNull(), // FK para produtos
  valor_mensal: decimal("valor_mensal", { precision: 10, scale: 2 }).notNull(),
  data_inicio: date("data_inicio").notNull(),
  data_proxima_cobranca: date("data_proxima_cobranca").notNull(),
  ativa: boolean("ativa").default(true),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// ==================== TABELA DE FUNIL (LEADS/PROSPECTS) ====================
export const funil = pgTable("funil", {
  id: serial("id").primaryKey(),
  nome_lead: text("nome_lead").notNull(),
  email_lead: varchar("email_lead"),
  telefone_lead: varchar("telefone_lead"),
  estagio: text("estagio").notNull(), // visitante, lead, interessado, cliente
  origem: text("origem").default("site"), // site, whatsapp, afiliado, email
  data_primeira_visita: timestamp("data_primeira_visita").defaultNow().notNull(),
  data_conversao: timestamp("data_conversao"),
  temp_conversao_dias: integer("temp_conversao_dias"), // Calculado em dias
  cliente_id: integer("cliente_id"), // FK para clients (quando vira cliente)
  ativo: boolean("ativo").default(true),
  notas: text("notas"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// ==================== TABELA DE RECEITA/REVENUE ====================
export const receita = pgTable("receita", {
  id: serial("id").primaryKey(),
  data: date("data").notNull().unique(),
  mrr: decimal("mrr", { precision: 12, scale: 2 }).notNull(), // Monthly Recurring Revenue
  revenue_total: decimal("revenue_total", { precision: 12, scale: 2 }).notNull(),
  margem_percentual: decimal("margem_percentual", { precision: 5, scale: 2 }),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// ==================== TABELA DE METRICAS DIARIAS ====================
export const metricas_diarias = pgTable("metricas_diarias", {
  id: serial("id").primaryKey(),
  data: date("data").notNull().unique(),
  visitantes: integer("visitantes").default(0),
  leads_novos: integer("leads_novos").default(0),
  clientes_novos: integer("clientes_novos").default(0),
  revenue_dia: decimal("revenue_dia", { precision: 12, scale: 2 }).default("0"),
  tickets_abertos: integer("tickets_abertos").default(0),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// ==================== TABELA DE ADMINISTRAÇÃO/LOGS ====================
export const administracao = pgTable("administracao", {
  id: serial("id").primaryKey(),
  criador: text("criador").notNull(),
  acao: text("acao").notNull(), // criar, editar, deletar, calcular, etc
  tipo: text("tipo").notNull(), // produto, cliente, venda, sistema
  descricao: text("descricao").notNull(),
  tabela_afetada: text("tabela_afetada"), // Nome da tabela modificada
  registro_id: integer("registro_id"), // ID do registro afetado
  detalhes: text("detalhes"), // JSON com mais info
  criado_em: timestamp("criado_em").defaultNow().notNull(),
});

// ==================== TABELA DE CONFIGURAÇÕES ====================
export const configuracoes = pgTable("configuracoes", {
  id: serial("id").primaryKey(),
  chave: varchar("chave").notNull().unique(),
  valor: text("valor").notNull(),
  tipo: text("tipo").default("text"), // text, number, boolean, json
  descricao: text("descricao"),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
