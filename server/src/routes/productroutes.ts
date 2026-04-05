import {
  addProdutos,
  getProdutos,
  TopVendidos,
  getAtualizacoes,
  getClients,
  AddClients,
  AllVendas,
  taxa_sucesso,
  vendas_vs_vendas_ano_anterior,
  excluirProduto,
  editarProduto,
  editarClient,
  excluirClient,
  getUser
} from "../controllers/productcontrollers";
import { Router } from "express";

const router = Router();

// PRODUTOS
router.get("/produtos", getProdutos);
router.post("/produtos", addProdutos);
router.put("/produtos/:id", editarProduto);
router.delete("/produtos/:id", excluirProduto);

//CLIENTS
router.get("/clients", getClients);
router.post("/clients", AddClients);
router.put("/clients/:id", editarClient);
router.delete("/clients/:id", excluirClient);

// AUTH
router.get("/auth", getUser);


// METRICS
router.get("/metrics/topvendidos", TopVendidos);
router.get("/metrics/getatualizacoes", getAtualizacoes);
router.get("/metrics/allvendas", AllVendas);
router.get("/metrics/taxasucesso", taxa_sucesso);
router.get("/metrics/crecimento", vendas_vs_vendas_ano_anterior);

export default router;

