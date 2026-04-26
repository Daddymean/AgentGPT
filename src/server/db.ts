import { PrismaClient } from "@prisma/client";

import { env } from "../env/server.mjs";

export const prisma =
  globalThis.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
