import { FastifyReply, FastifyRequest } from "fastify"
import { GetChatMessagesService } from "../../services/messages/GetMessagesService"

export class GetMessagesController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const { chatId } = req.params as { chatId: string }

    if (!chatId) {
      return rep.status(400).send({ message: "Chat ID is required" })
    }

    try {
      const getChatMessagesService = new GetChatMessagesService()
      const messages = await getChatMessagesService.execute({ chatId })
      return rep.status(200).send(messages)
    } catch (error) {
      console.error("Error fetching messages:", error)
      return rep.status(500).send({ message: "Error fetching messages" })
    }
  }
}
