import { Request, Response } from "express";
import { register, login } from "../services/authService";

type RegisterRequest = {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
};

type LoginRequest = {
  email: string;
  senha: string;
};

export async function registerController(
  req: Request<{}, {}, RegisterRequest>,
  res: Response,
) {
  try {
    const { nome, email, senha, telefone } = req.body;

    if (!nome || !email || !senha || !telefone) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ message: "Email inválido" });
    }

    if (senha.length < 6) {
      return res
        .status(400)
        .json({ message: "A senha deve conter no mínimo 6 caracteres" });
    }

    const result = await register({ nome, email, senha, telefone });

    res.status(201).json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({ message: "Erro desconhecido" });
  }
}

export async function loginController(
  req: Request<{}, {}, LoginRequest>,
  res: Response,
) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res
        .status(400)
        .json({ message: "Email e senha são obrigatórios" });
    }

    const result = await login({ email, senha });

    res.status(200).json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({ message: "Erro desconhecido" });
  }
}
