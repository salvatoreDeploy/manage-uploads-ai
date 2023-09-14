import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { fastifyMultipart } from '@fastify/multipart'
import { prisma } from '../lib/prisma'
import { upload } from "../utils/upload";
import path from "node:path";

export async function uploadVideoRoute(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_576 * 25 // 1 mb * 25 = 25mb
    }
  })

  app.post('/video', async (req: FastifyRequest, reply: FastifyReply) => {
    const data = await req.file()

    if (!data) {
      return reply.status(400).send({ error: 'Missing file input' })
    }

    const extension = path.extname(data.filename)

    if (extension !== '.mp3') {
      return reply.status(400).send({ error: 'Invalid input type, please upload a MP3' })
    }

    const videoParams = upload(data, extension)

    const video = await prisma.video.create({
      data: {
        name: data.filename,
        path: (await videoParams).uplaodDestination
      }
    })

    return { video }
  })
}