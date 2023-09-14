import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { openai } from '../lib/openai'


export async function generateAiCompleteionRoute(app: FastifyInstance) {
  app.post('/ia/generate', async (req: FastifyRequest, reply: FastifyReply) => {
    const bodySchema = z.object({
      videoId: z.string(),
      template: z.string(),
      temperature: z.number().min(0).max(1).default(0.5)
    })

    const { videoId, template, temperature } = bodySchema.parse(req.body)

    const video = await prisma.video.findFirstOrThrow({
      where: {
        id: videoId
      }
    })

    if (!video.trasnscription) {
      return reply.status(404).send({ error: 'Video transcription was not generated yet' })
    }

    const promptMessage = template.replace('{transcription}', video.trasnscription)

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      temperature,
      messages: [
        { role: 'user', content: promptMessage }
      ]
    })

    return response
  })
}

