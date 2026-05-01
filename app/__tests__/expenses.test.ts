import { POST, GET } from "@/app/api/expenses/route";

describe("Expenses API", () => {
  it("should reject invalid expense", async () => {
    const req: any = {
      json: async () => ({
        amount: -10,
        category: "",
        date: "",
      }),
      headers: { get: () => null },
    };

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("should create expense", async () => {
    const req: any = {
      json: async () => ({
        amount: 100,
        category: "food",
        description: "test",
        date: "2026-01-01",
      }),
      headers: { get: () => "test-key" },
    };

    const res = await POST(req);
    expect(res.status).toBe(201);
  });

  it("should fetch expenses", async () => {
    const req: any = {
      url: "http://localhost/api/expenses",
    };

    const res = await GET(req);
    expect(res.status).toBe(200);
  });
});