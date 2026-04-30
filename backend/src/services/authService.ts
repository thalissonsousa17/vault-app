import bcrypt from "bcryptjs";
import { supabase } from "../config/supabase";

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
    .select("*")
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
