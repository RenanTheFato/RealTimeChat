import { fastify } from 'fastify'
import dotenv from 'dotenv'

dotenv.config()

const server = fastify({ logger: true })

async function start() {

  try {
    await server.listen({
      port: Number(process.env.PORT),
      host: '0.0.0.0'
    }).then(() => {
      console.log(`Server Running on port ${process.env.PORT}!`)
    })
  } catch (error) {
    console.log(`Error to start server ${error}.`)
    process.exit(1)
  }
}

start()