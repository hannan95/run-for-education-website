import { PrismaClient } from '@prisma/client'

// Reuse one client across hot-reloads / serverless invocations instead of
// opening a new database connection on every request.
const globalForPrisma = globalThis

export const prisma = globalForPrisma.__prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.__prisma = prisma
}
