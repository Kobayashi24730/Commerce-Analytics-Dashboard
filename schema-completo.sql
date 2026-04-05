-- ========== ESTRUTURA DE BANCO DE DADOS COMPLETA ==========
-- Commerce Analytics Dashboard
-- Para executar no Supabase SQL Editor

-- ==================== CRIAR TABELAS ====================

-- 1. Categorias
CREATE TABLE IF NOT EXISTS categorias (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  descricao TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 2. Produtos
CREATE TABLE IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  categoria_id INTEGER NOT NULL REFERENCES categorias(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL DEFAULT 0,
  sku VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image TEXT,
  preco DECIMAL(10,2) NOT NULL,
  custo DECIMAL(10,2) DEFAULT 0,
  vendas INTEGER NOT NULL DEFAULT 0,
  demanda INTEGER NOT NULL DEFAULT 0,
  vendas_ano_anterior INTEGER NOT NULL DEFAULT 0,
  tentativas_compra INTEGER DEFAULT 0,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 3. Clients (Clientes/Usuários)
CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  telefone VARCHAR(20),
  senha VARCHAR(255) NOT NULL,
  cargo TEXT DEFAULT 'user',
  ativo BOOLEAN DEFAULT true,
  segmentacao TEXT DEFAULT 'standard',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 4. Canais de Vendas
CREATE TABLE IF NOT EXISTS canais_vendas (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  descricao TEXT,
  ativo BOOLEAN DEFAULT true,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 5. Vendas (Pedidos)
CREATE TABLE IF NOT EXISTS vendas (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
  canal_id INTEGER NOT NULL REFERENCES canais_vendas(id) ON DELETE RESTRICT,
  valor_total DECIMAL(12,2) NOT NULL,
  quantidade_itens INTEGER NOT NULL,
  status TEXT DEFAULT 'pendente',
  data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  data_entrega TIMESTAMP,
  notas TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 6. Itens de Venda
CREATE TABLE IF NOT EXISTS vendas_itens (
  id SERIAL PRIMARY KEY,
  venda_id INTEGER NOT NULL REFERENCES vendas(id) ON DELETE CASCADE,
  produto_id INTEGER NOT NULL REFERENCES produtos(id) ON DELETE RESTRICT,
  quantidade INTEGER NOT NULL,
  preco_unitario DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(12,2) NOT NULL
);

-- 7. Pagamentos
CREATE TABLE IF NOT EXISTS pagamentos (
  id SERIAL PRIMARY KEY,
  venda_id INTEGER NOT NULL REFERENCES vendas(id) ON DELETE CASCADE,
  valor DECIMAL(12,2) NOT NULL,
  metodo TEXT NOT NULL,
  status TEXT DEFAULT 'pendente',
  data_pagamento TIMESTAMP,
  referencia_externa VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 8. Assinaturas
CREATE TABLE IF NOT EXISTS assinaturas (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  produto_id INTEGER NOT NULL REFERENCES produtos(id) ON DELETE RESTRICT,
  valor_mensal DECIMAL(10,2) NOT NULL,
  data_inicio DATE NOT NULL,
  data_proxima_cobranca DATE NOT NULL,
  ativa BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 9. Funil (Leads/Prospects)
CREATE TABLE IF NOT EXISTS funil (
  id SERIAL PRIMARY KEY,
  nome_lead TEXT NOT NULL,
  email_lead VARCHAR(255),
  telefone_lead VARCHAR(20),
  estagio TEXT NOT NULL,
  origem TEXT DEFAULT 'site',
  data_primeira_visita TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  data_conversao TIMESTAMP,
  temp_conversao_dias INTEGER,
  cliente_id INTEGER REFERENCES clients(id) ON DELETE SET NULL,
  ativo BOOLEAN DEFAULT true,
  notas TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 10. Receita
CREATE TABLE IF NOT EXISTS receita (
  id SERIAL PRIMARY KEY,
  data DATE NOT NULL UNIQUE,
  mrr DECIMAL(12,2) NOT NULL,
  revenue_total DECIMAL(12,2) NOT NULL,
  margem_percentual DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 11. Métricas Diárias
CREATE TABLE IF NOT EXISTS metricas_diarias (
  id SERIAL PRIMARY KEY,
  data DATE NOT NULL UNIQUE,
  visitantes INTEGER DEFAULT 0,
  leads_novos INTEGER DEFAULT 0,
  clientes_novos INTEGER DEFAULT 0,
  revenue_dia DECIMAL(12,2) DEFAULT 0,
  tickets_abertos INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 12. Administração (Logs)
CREATE TABLE IF NOT EXISTS administracao (
  id SERIAL PRIMARY KEY,
  criador TEXT NOT NULL,
  acao TEXT NOT NULL,
  tipo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  tabela_afetada TEXT,
  registro_id INTEGER,
  detalhes TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 13. Configurações
CREATE TABLE IF NOT EXISTS configuracoes (
  id SERIAL PRIMARY KEY,
  chave VARCHAR(255) NOT NULL UNIQUE,
  valor TEXT NOT NULL,
  tipo TEXT DEFAULT 'text',
  descricao TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ==================== CRIAR ÍNDICES PARA PERFORMANCE ====================

CREATE INDEX idx_produtos_categoria ON produtos(categoria_id);
CREATE INDEX idx_produtos_sku ON produtos(sku);
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_vendas_cliente ON vendas(cliente_id);
CREATE INDEX idx_vendas_canal ON vendas(canal_id);
CREATE INDEX idx_vendas_data ON vendas(data_venda);
CREATE INDEX idx_vendas_itens_venda ON vendas_itens(venda_id);
CREATE INDEX idx_vendas_itens_produto ON vendas_itens(produto_id);
CREATE INDEX idx_pagamentos_venda ON pagamentos(venda_id);
CREATE INDEX idx_assinaturas_cliente ON assinaturas(cliente_id);
CREATE INDEX idx_assinaturas_ativa ON assinaturas(ativa);
CREATE INDEX idx_funil_estagio ON funil(estagio);
CREATE INDEX idx_funil_origem ON funil(origem);
CREATE INDEX idx_receita_data ON receita(data);
CREATE INDEX idx_metricas_data ON metricas_diarias(data);

-- ==================== INSERIR DADOS INICIAIS ====================

-- Categorias iniciais
INSERT INTO categorias (nome, descricao) VALUES
  ('Assinaturas', 'Produtos com cobrança recorrente mensal'),
  ('Serviços', 'Serviços sob demanda'),
  ('Infoprodutos', 'Cursos e treinamentos online'),
  ('Consultoria', 'Serviços de consultoria estratégica')
ON CONFLICT (nome) DO NOTHING;

-- Canais de vendas iniciais
INSERT INTO canais_vendas (nome, descricao) VALUES
  ('WhatsApp', 'Vendas via WhatsApp'),
  ('Site', 'Vendas direto pelo site'),
  ('Inside Sales', 'Vendas por equipe interna'),
  ('Afiliados', 'Vendas por programa de afiliados')
ON CONFLICT (nome) DO NOTHING;

-- ==================== CRIAR PROCEDURES (FUNÇÕES ARMAZENADAS) ====================

-- Procedure: Calcular tempo de conversão de leads
CREATE OR REPLACE FUNCTION calcular_tempo_conversao()
RETURNS VOID AS $$
BEGIN
  UPDATE funil
  SET temp_conversao_dias = EXTRACT(DAY FROM data_conversao - data_primeira_visita)
  WHERE data_conversao IS NOT NULL AND temp_conversao_dias IS NULL;
END;
$$ LANGUAGE plpgsql;

-- Procedure: Atualizar métricas diárias (exemplo: hoje)
CREATE OR REPLACE FUNCTION atualizar_metricas_diarias(p_data DATE)
RETURNS VOID AS $$
BEGIN
  INSERT INTO metricas_diarias (data, visitantes, leads_novos, clientes_novos, revenue_dia)
  SELECT
    p_data,
    COUNT(DISTINCT f.id) FILTER (WHERE f.origem = 'site') as visitantes,
    COUNT(DISTINCT f.id) FILTER (WHERE DATE(f.data_primeira_visita) = p_data AND f.estagio = 'lead') as leads_novos,
    COUNT(DISTINCT f.id) FILTER (WHERE DATE(f.data_conversao) = p_data AND f.estagio = 'cliente') as clientes_novos,
    COALESCE(SUM(v.valor_total) FILTER (WHERE DATE(v.data_venda) = p_data), 0) as revenue_dia
  FROM funil f
  LEFT JOIN vendas v ON f.cliente_id = v.cliente_id
  ON CONFLICT (data) DO UPDATE SET
    visitantes = EXCLUDED.visitantes,
    leads_novos = EXCLUDED.leads_novos,
    clientes_novos = EXCLUDED.clientes_novos,
    revenue_dia = EXCLUDED.revenue_dia;
END;
$$ LANGUAGE plpgsql;

-- Procedure: Calcular MRR (Monthly Recurring Revenue)
CREATE OR REPLACE FUNCTION calcular_mrr(p_data DATE)
RETURNS DECIMAL AS $$
DECLARE
  v_mrr DECIMAL;
BEGIN
  SELECT COALESCE(SUM(valor_mensal), 0)
  INTO v_mrr
  FROM assinaturas
  WHERE ativa = true
  AND DATE(data_inicio) <= p_data;
  
  RETURN v_mrr;
END;
$$ LANGUAGE plpgsql;

-- Procedure: Atualizar receita diária com MRR
CREATE OR REPLACE FUNCTION atualizar_receita_diaria(p_data DATE)
RETURNS VOID AS $$
DECLARE
  v_revenue DECIMAL;
  v_mrr DECIMAL;
  v_margem DECIMAL;
BEGIN
  -- Calcular revenue do dia
  SELECT COALESCE(SUM(v.valor_total), 0)
  INTO v_revenue
  FROM vendas v
  WHERE DATE(v.data_venda) = p_data;

  -- Calcular MRR
  v_mrr := calcular_mrr(p_data);

  -- Calcular margem estimada (assumindo 68% como no mock)
  v_margem := 68;

  INSERT INTO receita (data, mrr, revenue_total, margem_percentual)
  VALUES (p_data, v_mrr, v_mrr + v_revenue, v_margem)
  ON CONFLICT (data) DO UPDATE SET
    mrr = EXCLUDED.mrr,
    revenue_total = EXCLUDED.revenue_total,
    margem_percentual = EXCLUDED.margem_percentual;
END;
$$ LANGUAGE plpgsql;

-- Procedure: Registrar log de ação
CREATE OR REPLACE FUNCTION registrar_log(
  p_criador TEXT,
  p_acao TEXT,
  p_tipo TEXT,
  p_descricao TEXT,
  p_tabela_afetada TEXT DEFAULT NULL,
  p_registro_id INTEGER DEFAULT NULL,
  p_detalhes TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO administracao (criador, acao, tipo, descricao, tabela_afetada, registro_id, detalhes)
  VALUES (p_criador, p_acao, p_tipo, p_descricao, p_tabela_afetada, p_registro_id, p_detalhes);
END;
$$ LANGUAGE plpgsql;

-- ==================== FIM DA ESTRUTURA ====================
