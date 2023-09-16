import { FastifyInstance } from "fastify";
import {fastifyMultipart} from "@fastify/multipart"
import path from "node:path";
import {pipeline} from "node:stream"
import {promisify} from "node:util"
import fs from 'node:fs'

import { prisma } from "../lib/prisma";
import { randomUUID } from "node:crypto";

const pump = promisify(pipeline)

export async function uploadVideosRoute(app: FastifyInstance){
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_576 * 25 // 25MB
    }
  })
  app.post("/videos", async (request, reply) => {
    const data = await request.file()
    if(!data){
      return reply.status(400).send({error: 'Missing file input'})
    }
    const extension = path.extname(data.filename)

    if(extension !== '.mp3'){
      return reply.status(404).send({error: 'Invalid input type, please upload a MP3'})
    }

    const fileBaseName = path.basename(data.filename, extension)

    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`

    const uploadPath =path.resolve(__dirname, '../../tmp', fileUploadName)

    await pump(data.file, fs.createWriteStream(uploadPath))
    const video = await prisma.video.create({
      data: {
      name: data.filename,
      path: uploadPath,
    }
  })
    return {
      video
    }

  })
}