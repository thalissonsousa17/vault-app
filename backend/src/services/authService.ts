import bcrypt from "bcryptjs";
import { supabase } from "../config/supabase";
import jwt from "jsonwebtoken";

type RegisterRequest = {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
};

export async function register({
  nome,
  email,
  senha,
  telefone,
}: RegisterRequest) {
  const { data: existingUser } = await supabase
    .from("users")
    .select("ID")
    .eq("email", email)
    .single();

  if (existingUser) {
    throw new Error("Email já registrado");
  }

  const hashedPassword = await bcrypt.hash(senha, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([{ nome, email, senha: hashedPassword, telefone }]);

  if (error) {
    console.error("Erro ao registrar usuário:", error);
    throw new Error("Erro ao registrar usuário");
  }

  return { message: "Usuário registrado com sucesso!" };
}

type LoginRequest = {
  email: string;
  senha: string;
};

export async function login({ email, senha }: LoginRequest) {
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!user) {
    throw new Error("Email ou senha incorretos");
  }

  const isMatch = await bcrypt.compare(senha, user.senha);

  if (!isMatch) {
    throw new Error("Email ou senha incorretos");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
  return { token };
}
