import { Request, Response } from "express";
import { register } from "../services/authService";

export async function registerController(req: Request, res: Response) {
  try {
    const { nome, email, senha, telefone } = req.body;
    const result = await register({ nome, email, senha, telefone });
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
