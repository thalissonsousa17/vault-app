import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Servidor rodando!");
});

export default app;
