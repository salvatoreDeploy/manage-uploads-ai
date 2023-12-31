import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function getAllPromptsRoutes(app: FastifyInstance) {
  app.get('/prompt', async () => {
    const prompts = await prisma.prompt.findMany()

    return prompts
  })
}