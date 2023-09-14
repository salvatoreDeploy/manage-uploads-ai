import fs from 'node:fs'
import path from "node:path";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { randomUUID } from "node:crypto";

export async function upload(data, extension: string) {
  const pump = promisify(pipeline)

  const fileBaseName = path.basename(data.filename, extension)
  const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`

  const uplaodDestination = path.resolve(__dirname, '../../storage', fileUploadName)

  await pump(data.file, fs.createWriteStream(uplaodDestination))

  return { fileBaseName, fileUploadName, uplaodDestination }
}