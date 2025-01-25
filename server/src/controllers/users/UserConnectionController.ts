import { Socket } from "socket.io"
import { prisma } from "../../lib/prisma"

export class UserConnectionController {
  async handleConnect(socket: Socket, userId: string, onlineUsers: Map<string, string>) {
    console.log(`User connected: ${userId}`)
    await prisma.users.update({
      where: { 
        id: userId 
      },
      data: { 
        status: "Online" 
      },
    })

    onlineUsers.set(userId, socket.id)
  }

  async handleDisconnect(socket: Socket, onlineUsers: Map<string, string>) {
    const userId = socket.data.userId

    if (userId) {
      console.log(`User disconnected: ${userId}`)
      await prisma.users.update({
        where: { 
          id: userId 
        },
        data: { 
          status: 'Offline', 
          last_seen_at: new Date() 
        },
      })

      onlineUsers.delete(userId)
    }
  }
}
