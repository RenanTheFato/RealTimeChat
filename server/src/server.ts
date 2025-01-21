import fastifyWebsocket from "@fastify/websocket"
import fastifyCors from "@fastify/cors"
import { Server } from "socket.io"
import { fastify } from "fastify"
import { routes } from "./routes"
import { WebSocketServer } from "./socket/socket"
import dotenv from "dotenv"
import http from 'http'

dotenv.config()

const server = fastify({
  logger: true,
  disableRequestLogging: true,
})

async function start() {
  await server.register(fastifyCors, {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })

  await server.register(fastifyWebsocket, {
    options: {
      maxPayload: 1048576,
      clientTracking: true,
    },
  })

  await server.register(routes)

  const wsServer = http.createServer()

  const io = new Server(wsServer, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
    pingTimeout: 60000,
    pingInterval: 25000,
  })

  const webSocketServerServer = new WebSocketServer()
  webSocketServerServer.start(io)

  const wsPort = 8080

  wsServer.listen(wsPort, () => {
    console.log(`WebSocket server running on port ${wsPort}`)
  })

  try {
    const port = Number(process.env.PORT) || 3333
    const host = "0.0.0.0"

    await server.listen({ port, host })
    console.log(`Server Running on port ${port}!`)
  } catch (error) {
    console.error("Error to start server:", error)
    process.exit(1)
  }
}

start()