import { FastifyReply, FastifyRequest } from "fastify"
import { SinginUserService } from "../../services/users/SinginUserService"

interface User {
  contact_id: string,
  password: string,
}

export class SinginUserController{
  async handle(req: FastifyRequest, rep: FastifyReply){

    const { contact_id, password } = req.body as User

    try {
      const singinUserService = new SinginUserService()

      const user = await singinUserService.execute({ contact_id, password })
      return rep.status(200).send({user})
    } catch (error) {
      console.error(error)
      return rep.status(401).send({ message: 'Credentials failed' })
    }
  }
}