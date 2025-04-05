import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// 修改为 const
const prisma = (() => {
  const globalForPrisma = global as unknown as { prisma: PrismaClient };
  return (
    globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate())
  );
})();

if (process.env.NODE_ENV !== "production") {
  const globalForPrisma = global as unknown as { prisma: PrismaClient };
  globalForPrisma.prisma = prisma;
}

export default prisma;
