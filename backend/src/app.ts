import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app: Express = express();
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Servidor rodando!");
});

export default app;
