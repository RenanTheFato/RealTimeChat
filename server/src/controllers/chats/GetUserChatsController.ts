import { FastifyReply, FastifyRequest } from 'fastify'
import { GetUserChatsService } from '../../services/chats/GetUserChatsService'

export class GetUserChatsController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const userId = req.user.id as string

    try {
      const getUserChatsService = new GetUserChatsService()
      const chats = await getUserChatsService.execute({ userId })

      return rep.status(200).send(chats)
    } catch (error: any) {
      return rep.status(400).send({
        error: error.message || 'Unexpected error.'
      })
    }
  }
}