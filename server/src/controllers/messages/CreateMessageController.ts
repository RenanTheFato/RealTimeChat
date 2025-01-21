import { Socket } from "socket.io"
import { CreateMessageService } from "../../services/messages/CreateMessageService"
import { prisma } from "../../lib/prisma"

interface MessagesProps {
  content: string,
  send_by: string,
  chat_id: string,
}

export class CreateMessageController {
  async handle(socket: Socket, messages: MessagesProps) {
    try {
      const createMessageService = new CreateMessageService()
      const message = await createMessageService.execute(messages)

      const chat = await prisma.chats.findUnique({
        where: {
          id: messages.chat_id,
        },
        select: {
          from_contact: true,
          to_contact: true,
        }
      })

      if (chat) {
        socket.emit('message_status', {
          status: 'sent',
          message_id: message.id
        })

        socket.to(messages.chat_id).emit('recived_message', message)
      }

      return message
    } catch (error) {
      console.error('Error sending message:', error)
      socket.emit('message_status', {
        status: 'error',
        error: 'Failed to send message'
      })
    }
  }
}