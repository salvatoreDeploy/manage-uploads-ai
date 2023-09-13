import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { fastifyMultipart } from '@fastify/multipart'
import { prisma } from "../lib/prisma";
import fs from 'node:fs'
import path from "node:path";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { randomUUID } from "node:crypto";

const pump = promisify(pipeline)

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

    const fileBaseName = path.basename(data.filename, extension)
    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`

    const uplaodDestination = path.resolve(__dirname, '../../storage', fileUploadName)

    await pump(data.file, fs.createWriteStream(uplaodDestination))

    return reply.send()
  })
}