import { prisma } from "../../lib/prisma"

interface MessagesProps {
  chatId: string;
}

export class GetChatMessagesService {
  async execute({ chatId }: MessagesProps) {
    try {
      const messages = await prisma.messages.findMany({
        where: {
          chat_id: chatId
        },
        orderBy: {
          send_at: 'asc'
        }
      })

      return messages
    } catch (error) {
      console.error(`Error on get chat messages: ${error}`)
      throw new Error(`Error on get chat messages: ${error}`)
    }
  }
}