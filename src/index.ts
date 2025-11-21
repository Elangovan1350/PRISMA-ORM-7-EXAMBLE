import { Hono } from "hono";
import { prisma } from "../lib/prisma.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/users", async (c) => {
  const users = await prisma.user.findMany();
  return c.json(users);
});
app.post("/users", async (c) => {
  const { email, name } = await c.req.json();
  // Example of creating a user
  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });

  return c.json({ message: "User created", user });
});

export default app;
