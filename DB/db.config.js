import { PrismaClient } from "@prisma/client";

const prisma = await new PrismaClient({
  log: ["query"],
});

export default prisma;
