import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";

describe("GET /", () => {
  it("should return a message indicating the server is running", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Servidor rodando!");
  });
});
