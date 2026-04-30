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
