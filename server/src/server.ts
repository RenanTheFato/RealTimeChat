import fastifyWebsocket from '@fastify/websocket'
import fastifyCors from '@fastify/cors'
import { Server } from 'socket.io'
import { fastify } from 'fastify'
import { routes } from './routes'
import { WebSocketServer } from './socket/socket'
import dotenv from 'dotenv'

dotenv.config()

const server = fastify({ logger: true })

async function start() {

  await server.register(fastifyCors)
  await server.register(fastifyWebsocket)
  await server.register(routes)

  const io = new Server(server.server, {
    cors: {
      origin: '*'
    }
  })

  const wsServer = new WebSocketServer()
  wsServer.start(io)

  try {
    await server.listen({
      port: Number(process.env.PORT) || 3333,
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