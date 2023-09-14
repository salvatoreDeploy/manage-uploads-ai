import { fastify } from "fastify";
import { prisma } from './lib/prisma'
import { getAllPromptsRoutes } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";
import { createTranscriptionRoute } from "./routes/create-transcription";

const app = fastify()

app.register(getAllPromptsRoutes)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)

app.listen({
  host: '0.0.0.0',
  port: 3333
}).then(() => console.log('HTTP Server Running'))