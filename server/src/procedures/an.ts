export const calculateVariationProcedure = `
  CREATE OR REPLACE PROCEDURE calcular_variacao_produto(produto_id INT)
  LANGUAGE plpgsql
  AS $$
  DECLARE
    vendas_atual INT;
    vendas_anterior INT;
    variacao DECIMAL;
  BEGIN
    SELECT vendas, vendas_ano_anterior INTO vendas_atual, vendas_anterior
    FROM produtos WHERE id = produto_id;
    
    IF vendas_anterior = 0 THEN
      variacao := 0;
    ELSE
      variacao := ((vendas_atual - vendas_anterior) / vendas_anterior) * 100;
    END IF;
    
    INSERT INTO administracao (criador, texto, tipo) 
    VALUES ('Sistema', 'Variação calculada: ' || variacao || '% para produto ' || produto_id, 'Cálculo');
  END;
  $$;
`;