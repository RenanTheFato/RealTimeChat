import { prisma } from "../../lib/prisma"

interface MessagesProps{
  content: string,
  send_by: string,
  chat_id: string,
}

export class CreateMessageService{
  async execute({ content, send_by, chat_id}: MessagesProps){

    try {
      const message = await prisma.messages.create({
        data:{
          content,
          send_by,
          chat_id,
        }
      })

      return message
    } catch (error) {
      console.error(`Error on create message on database: ${error}`)
      throw new Error(`Error on create message on database: ${error}`)
    }
  }
}