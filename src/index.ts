import express from "express";
import { env } from "./config/env.ts";
import { authRoutes } from "./routes/auth.routes.ts";

const app = express();
const port = env.PORT || 3000;

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
