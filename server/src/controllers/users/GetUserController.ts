import { FastifyReply, FastifyRequest } from "fastify"
import { GetUserService } from "../../services/users/GetUserService"

export class GetUserController{
  async handle(req: FastifyRequest, rep: FastifyReply){

    const userId = req.user.id as string

    try {
      const getUserService = new GetUserService()
      
      const user = await getUserService.execute({userId})
      return rep.status(200).send({ user })
    } catch (error) {
      console.error(error)
      return rep.status(400).send({ message: 'Error on get user' })
    }
  }
}