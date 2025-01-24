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
      console.log("Client attempting connection:", socket.id)

      const token = socket.handshake.auth?.token

      if (!token) {
        console.log("No auth token provided for socket:", socket.id)
        socket.emit("auth_error", { message: "Authentication required" })
        socket.disconnect()
        return
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_PASSWORD || "default_secret") as {
          id: string,
          iat: number,
          exp: number,
        }
        console.log("User authenticated successfully:", decoded)

        const userId = decoded.id
        socket.data.userId = userId

        this.handleAuthenticatedConnection(socket, userId, onlineUsers, userConnectionController, createMessageController, io)
      } catch (err: any) {
        console.error(`JWT verification failed for socket ${socket.id}:`, err.message)
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

    io.engine.on("connection_error", (err) => {
      console.error("Connection error:", err)
    })
  }

  private handleAuthenticatedConnection(
    socket: Socket,
    userId: string,
    onlineUsers: Map<string, string>,
    userConnectionController: UserConnectionController,
    createMessageController: CreateMessageController,
    io: Server
  ) {
    console.log(`Authenticated user ${userId} connected with socket ${socket.id}`)
    onlineUsers.set(userId, socket.id)

    socket.on("join_chat", (chatId: string) => {
      try {
        console.log(`User ${userId} joining chat ${chatId}`)
        socket.join(chatId)
        socket.emit("joined_chat", chatId)
      } catch (error) {
        console.error(`Error joining chat ${chatId}:`, error)
        socket.emit("error", { message: "Failed to join chat" })
      }
    })

    socket.on("send_message", async (messageData) => {
      try {
        console.log("Received message data:", messageData)
        const completeMessageData = {
          ...messageData,
          send_by: userId
        }
        const savedMessage = await createMessageController.handle(socket, completeMessageData)

        if (!savedMessage) {
          console.error("Saved message is undefined")
          socket.emit("message_status", {
            status: "error",
            error: "Message could not be saved",
          })
          return
        }

        io.to(messageData.chat_id).emit("receive_message", {
          id: savedMessage.id,
          content: savedMessage.content,
          send_by: savedMessage.send_by,
          send_at: savedMessage.send_at
        })

        console.log("Message processed successfully")
      } catch (error) {
        console.error("Error processing message:", error)
        socket.emit("message_status", {
          status: "error",
          error: error instanceof Error ? error.message : "Failed to send message"
        })
      }
    })

    socket.on("disconnect", (reason) => {
      console.log(`User ${userId} disconnected. Reason:`, reason)
      onlineUsers.delete(userId)
      userConnectionController.handleDisconnect(socket, onlineUsers)
    })
  }
}