import {
  getProdutos,
  addProduto,
  editProduto,
  delProduto
} from "@/controllers/controllersProdutos";
import {
  getClients,
  addClient,
  editClient,
  delClients
} from "@/controllers/controllersClients";
import { getMetrics } from "@/controllers/controllersMetrics";
import { Router } from "express";

const router = Router();

// PRODUTOS
router.get("/produtos", getProdutos);
router.post("/produtos", addProduto);
router.put("/produtos/:id", editProduto);
router.delete("/produtos/:id", delProduto);

//CLIENTS
router.get("/clients", getClients);
router.post("/clients", addClient);
router.put("/clients/:id", editClient);
router.delete("/clients/:id", delClients);

// AUTH
router.get("/auth", getClients);


// METRICS
router.get("/metrics", getMetrics);

export default router;

