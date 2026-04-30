import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";
import { supabase } from "../config/supabase";

describe("GET /", () => {
  it("should return a message indicating the server is running", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Servidor rodando!");
  });
});

describe("Supabase", () => {
  it("should create supabase client", () => {
    expect(supabase).toBeDefined();
    expect(supabase).not.toBeNull();
  });
});

describe("POST /auth/register", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/auth/register").send({
      nome: "Test User",
      email: "newuser10@teste.com",
      senha: "123456",
      telefone: "83999999999",
    });
    expect(response.status).toBe(201);
  });

  it("should return an error for existing email", async () => {
    const response = await request(app).post("/auth/register").send({
      nome: "Test User",
      email: "teste@example.com",
      senha: "123456",
      telefone: "83999999999",
    });
    expect(response.status).toBe(400);
  });
});

describe("POST /auth/login", () => {
  it("should login an existing user", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "thalissons@gmail.com",
      senha: "123456",
    });
    expect(response.status).toBe(200);
  });

  it("should return an error for incorrect credentials", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "thalissons@gmail.com",
      senha: "123",
    });
    expect(response.status).toBe(400);
  });
});
