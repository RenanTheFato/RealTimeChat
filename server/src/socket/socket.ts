import { Server, Socket } from "socket.io"
import { CreateMessageController } from "../controllers/messages/CreateMessageController"
import { UserConnectionController } from "../controllers/users/UserConnectionController"

export class WebSocketServer {

  start(io: Server) {
    const onlineUsers = new Map<string, string>()
    const userConnectionController = new UserConnectionController()
    const createMessageController = new CreateMessageController()

    io.on('connection', (socket: Socket) => {
      console.log('User connected:', socket.id)

      socket.on('join_chat', (chatId: string) => {
        socket.join(chatId)
      });

      socket.on('user_connected', (userId: string) => {
        userConnectionController.handleConnect(socket, userId, onlineUsers)
      });

      socket.on('send_message', (messageData) => {
        createMessageController.handle(socket, messageData)
      });

      socket.on('disconnect', () => {
        userConnectionController.handleDisconnect(socket, onlineUsers)
      })
    })
  }
}