import { Socket } from "socket.io"
import { prisma } from "../../lib/prisma"

export class UserConnectionController {
  async handleConnect(socket: Socket, userId: string, onlineUsers: Map<string, string>) {
    onlineUsers.set(userId, socket.id)
      
    await prisma.users.update({
      where: {
        id: userId
      },
      data: {
        last_seen_at: new Date()
      }
    })

    socket.broadcast.emit('user_online', userId)
  }

  async handleDisconnect(socket: Socket, onlineUsers: Map<string, string>) {
    const userId = socket.data.userId

    console.log('Disconnecting user ID:', userId)
    if (userId) {
      await prisma.users.update({
        where: { 
          id: userId 
        },
        data: { 
          last_seen_at: new Date()
        }
      })
  
      onlineUsers.delete(userId)
      socket.broadcast.emit('user_offline', userId)
    }
  }
}
