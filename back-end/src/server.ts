import { fastify } from "fastify";
import { prisma } from './lib/prisma'
import { getAllPromptsRoutes } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";

const app = fastify()

app.register(getAllPromptsRoutes)
app.register(uploadVideoRoute)

app.listen({
  host: '0.0.0.0',
  port: 3333
}).then(() => console.log('HTTP Server Running'))