import { FastifyReply, FastifyRequest } from "fastify";
import { GetChatMessagesService } from "../../services/messages/GetMessagesService";

export interface GetMessagesRequest {
  Params: {
    chatId: string;
  };
}

export class GetMessagesController {
  async handle(req: FastifyRequest<GetMessagesRequest>, rep: FastifyReply) {
    const { chatId } = req.params
    
    try {
      const getChatMessagesService = new GetChatMessagesService()
      const messages = await getChatMessagesService.execute({ chatId })
      return rep.status(200).send(messages)
    } catch (error) {
      return rep.status(400).send({ message: "Error fetching messages" })
    }
  }
}
