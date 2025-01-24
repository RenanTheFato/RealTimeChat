import { FastifyReply, FastifyRequest } from "fastify";
import { GetChatService } from "../../services/chats/GetChatService";

export class GetChatController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const user = req.user.contact_id as string
    const { chatId } = req.params as { chatId: string }

    if (!chatId) {
      return rep.status(400).send({ message: "Chat ID is required" })
    }

    try {
      const getChatService = new GetChatService()
      const response = await getChatService.execute({ chatId, user })
      return rep.status(200).send(response)
    } catch (error) {
      console.error("Error fetching chat:", error)
      return rep.status(500).send({ message: "Error fetching chat" })
    }
  }
}