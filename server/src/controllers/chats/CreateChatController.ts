import { FastifyRequest, FastifyReply } from "fastify"
import { CreateChatService } from "../../services/chats/CreateChatService"

export class CreateChatController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    try {
      const { contact_id } = req.body as { contact_id: string }
      const userId = req.user.id as string
      
      const createChatService = new CreateChatService()
      const chat = await createChatService.execute({ 
        userId, 
        contact_id,
      })

      return rep.status(201).send(chat)
    } catch (error) {
      console.error('Error in CreateChatController:', error)
      
      if (error instanceof Error) {
        return rep.status(400).send({ error: error.message })
      }
      
      return rep.status(500).send({ error: 'Internal server error' })
    }
  }
}