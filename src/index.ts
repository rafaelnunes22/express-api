import express, { type Request, type Response } from "express";

const app = express();
const port = 3000;

app.get("/", (_req: Request, res: Response) => {
  res.json({ ok: true, message: "Success" });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
