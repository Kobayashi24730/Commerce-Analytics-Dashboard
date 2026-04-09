export const getDashboardMetrics = `
  CREATE OR REPLACE FUNCTION get_dashboard_metrics()
  RETURNS JSON AS $$
  DECLARE
      result JSON;
      v_total_vendas INT;
      v_faturamento NUMERIC;
      v_vendas_atuais NUMERIC;
      v_vendas_anterior NUMERIC;
      v_tentativas INT;
      v_crescimento NUMERIC;
      v_taxa NUMERIC;
      v_ticket_medio NUMERIC;
      v_top_produtos JSON;
  BEGIN
      SELECT SUM(vendas), SUM(preco * vendas)
      INTO v_total_vendas, v_faturamento
      FROM produtos;

      v_ticket_medio := CASE
          WHEN v_total_vendas > 0 THEN v_faturamento / v_total_vendas
          ELSE 0
      END;

      SELECT COALESCE(SUM(vendas), 0)
      INTO v_vendas_atuais
      FROM produtos
      WHERE created_at >= date_trunc('month', current_date);

      SELECT COALESCE(SUM(vendas), 0)
      INTO v_vendas_anterior
      FROM produtos
      WHERE created_at >= date_trunc('month', current_date - interval '1 month')
        AND created_at < date_trunc('month', current_date);

      IF v_vendas_anterior > 0 THEN
          v_crescimento := ((v_vendas_atuais - v_vendas_anterior) / v_vendas_anterior) * 100;
      ELSE
          v_crescimento := 0;
      END IF;

      SELECT SUM(tentativas_compra) INTO v_tentativas FROM produtos;

      IF v_tentativas > 0 THEN
          v_taxa := (v_total_vendas::float / v_tentativas) * 100;
      ELSE
          v_taxa := 0;
      END IF;

      SELECT json_agg(t) INTO v_top_produtos FROM (
          SELECT id, nome, vendas, preco
          FROM produtos
          ORDER BY vendas DESC
          LIMIT 10
      ) t;

      result := json_build_object(
          'total_vendas', COALESCE(v_total_vendas, 0),
          'crescimento', ROUND(v_crescimento, 2),
          'taxa', ROUND(v_taxa, 2),
          'top_produtos', COALESCE(v_top_produtos, '[]'::json),
          'faturamento', COALESCE(v_faturamento, 0),
          'ticket_medio', ROUND(v_ticket_medio, 2)
      );

      RETURN result;
  END;
  $$ LANGUAGE plpgsql;
`;
