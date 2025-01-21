import { prisma } from "../../lib/prisma"

interface CreateChatRequest {
  userId: string
  contact_id: string
}

export class CreateChatService {
  async execute({ userId, contact_id }: CreateChatRequest) {
    const currentUser = await prisma.users.findUnique({
      where: {
        id: userId
      }
    })

    if (!currentUser) {
      throw new Error('Current user not found')
    }

    const contactUser = await prisma.users.findUnique({
      where: {
        contact_id,
      }
    })

    if (!contactUser) {
      throw new Error('Contact not found')
    }

    const existingChat = await prisma.chats.findFirst({
      where: {
        OR: [
          {
            AND: [
              { 
                from_contact: currentUser.contact_id 
              },
              { 
                to_contact: contact_id 
              }
            ]
          },
          {
            AND: [
              { 
                from_contact: contact_id 
              },
              { 
                to_contact: currentUser.contact_id 
              }
            ]
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
          take: 1
        }
      }
    })

    if (existingChat) {
      return existingChat
    }

    const newChat = await prisma.chats.create({
      data: {
        from_contact: currentUser.contact_id,
        to_contact: contact_id
      }
    })

    const chatWithDetails = await prisma.chats.findUnique({
      where: {
        id: newChat.id
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
          take: 1
        }
      }
    })

    return chatWithDetails
  }
}