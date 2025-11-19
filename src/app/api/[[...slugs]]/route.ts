import { Elysia, t } from "elysia";

const app = new Elysia({ prefix: "/api" })
  .get("/", "Hello")
  .get("/hi", "Наш сайтек!!!!!")
  .post("/", ({ body }) => body, {
    body: t.Object({
      name: t.String(),
    }),
  });

export type app = typeof app;
export const GET = app.fetch;
export const POST = app.fetch;
