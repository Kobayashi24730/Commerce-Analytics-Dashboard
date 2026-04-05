import express from "express";
import "dotenv/config";
import produtoRoutes from "./routes/productroutes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", produtoRoutes);

app.listen(process.env.PORT || 3000 , () => {
  console.log("Processo rodando na porta ", process.env.PORT || 3000);
});
