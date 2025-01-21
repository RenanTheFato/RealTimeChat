import { CreateMessageController } from "../controllers/messages/CreateMessageController"
import { UserConnectionController } from "../controllers/users/UserConnectionController"
import { Server, Socket } from "socket.io"
import jwt from "jsonwebtoken"

export class WebSocketServer {
  start(io: Server) {
    const onlineUsers = new Map<string, string>()
    const userConnectionController = new UserConnectionController()
    const createMessageController = new CreateMessageController()

    io.on("connection", (socket: Socket) => {
      console.log("Client connected:", socket.id)

      const token = socket.handshake.auth?.token

      if (!token) {
        console.log("No auth token provided")
        socket.emit("auth_error", { message: "Authentication required" })
        socket.disconnect()
        return
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_PASSWORD || "default_secret")
        console.log("User authenticated:", decoded)

        const userId = (decoded as any).userId as string
        (socket as any).userId = userId

        this.handleAuthenticatedConnection(socket, userId, onlineUsers, userConnectionController, createMessageController)
      } catch (err: any) {
        console.error("Invalid JWT token:", err.message)
        socket.emit("auth_error", { message: "Invalid token" })
        socket.disconnect()
      }

      socket.on("error", (error) => {
        console.error("Socket error:", error)
      })
    })

    io.on("error", (error) => {
      console.error("IO Server error:", error)
    })
  }

  private handleAuthenticatedConnection(
    socket: Socket,
    userId: string,
    onlineUsers: Map<string, string>,
    userConnectionController: UserConnectionController,
    createMessageController: CreateMessageController
  ) {
    console.log(`Authenticated user ${userId} connected with socket ${socket.id}`)
    onlineUsers.set(userId, socket.id)

    socket.on("join_chat", (chatId: string) => {
      console.log(`User ${userId} joining chat ${chatId}`)
      socket.join(chatId)
      socket.emit("joined_chat", chatId)
    })

    socket.on("send_message", (messageData) => {
      console.log("Message received from user:", messageData)
      createMessageController.handle(socket, messageData)
    })

    socket.on("disconnect", () => {
      console.log(`Authenticated user ${userId} disconnected.`)
      onlineUsers.delete(userId)
      userConnectionController.handleDisconnect(socket, onlineUsers)
    })
  }
}
