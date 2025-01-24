import { prisma } from "../../lib/prisma"

interface GetChatProps{
  chatId: string,
  user: string
}

export class GetChatService {
  async execute({ chatId, user }: GetChatProps) {
    const chat = await prisma.chats.findUnique({
      where: { id: chatId },
      select: {
        from_user: {
          select: {
            id: true,
            name: true,
            last_seen_at: true,
            contact_id: true
          }
        },
        to_user: {
          select: {
            id: true,
            name: true, 
            last_seen_at: true,
            contact_id: true
          }
        }
      }
    })

    if (!chat) {
      throw new Error('Chat not found')
    }

    const otherUser = chat.from_user.contact_id === user 
      ? chat.to_user 
      : chat.from_user

    return {
      id: otherUser.id,
      name: otherUser.name,
      last_online: otherUser.last_seen_at.toISOString()
    }
  }
}