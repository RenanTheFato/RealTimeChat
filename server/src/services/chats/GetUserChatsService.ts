import { prisma } from "../../lib/prisma"

interface GetUserChatsRequest {
  userId: string
}

export class GetUserChatsService {
  async execute({ userId }: GetUserChatsRequest) {
    try {

      const user = await prisma.users.findUnique({
        where: { 
          id: userId 
        },
        select: { 
          contact_id: 
          true }
      })

      if (!user) {
        throw new Error("User not found")
      }
      const chats = await prisma.chats.findMany({
        where: {
          OR: [
            { 
              from_contact: user.contact_id 
            },
            { 
              to_contact: user.contact_id 
            }
          ]
        },
        include: {
          from_user: {
            select: {
              id: true,
              name: true,
              contact_id: true,
              last_seen_at: true
            }
          },
          to_user: {
            select: {
              id: true,
              name: true,
              contact_id: true,
              last_seen_at: true
            }
          },
          messages: {
            orderBy: {
              send_at: 'desc'
            },
            take: 1,
            select: {
              content: true,
              send_at: true,
              send_by: true
            }
          }
        }
      })

      return chats.map(chat => {
        const isFromUser = chat.from_contact === user.contact_id
        const otherUser = isFromUser ? chat.to_user : chat.from_user

        return {
          id: chat.id,
          contact_id: otherUser.contact_id,
          name: otherUser.name,
          last_seen_at: otherUser.last_seen_at,
          last_message: chat.messages[0] || null,
          created_at: chat.created_at
        }
      })
    } catch (error) {
      console.error(`Error fetching user chats: ${error}`)
      throw new Error(`Error fetching user chats: ${error}`)
    }
  }
}