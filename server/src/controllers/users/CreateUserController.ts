import { FastifyReply, FastifyRequest } from "fastify"
import { CreateUserService } from "../../services/users/CreateUserService"
import { generateContactId } from "../../utils/GenerateContactId"
import bcrypt from 'bcryptjs'
import z from 'zod'

interface User {
  name: string,
  password: string
}

export class CreateUserController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const { name, password } = req.body as User

    const validateSchema = z.object({
      name: z.string()
        .min(2, { message: "The username doesn't meet the minimum number of characters (2)." })
        .max(128, { message: "The username has exceeded the character limit (128)." }),
      password: z.string()
        .min(6, { message: "The password doesn't meet the minimum number of characters (8)." })
        .refine((password) => /[A-Z]/.test(password), { message: "Password must contain at least one uppercase letter." })
        .refine((password) => /[0-9]/.test(password), { message: "Password must contain at least one number." })
        .refine((password) => /[@#$*&]/.test(password), { message: "Password must contain at least one of this special characters ('@' '#' '$' '*' '&')." }),
    })

    try {
      validateSchema.parse(req.body)
    } catch (error: any) {
      return rep.status(400).send({ message: error.errors })
    }

    try {
      const contactId = await generateContactId()
      const hashedPassword = await bcrypt.hash(password, 10)
      const createUserService = new CreateUserService()

      const response = await createUserService.execute({ name, contactId, password: hashedPassword})
      return rep.status(201).send({ message: 'You have been registered successfully', contactId: response.contactId})
    } catch (error) {
      console.error(error)
      return rep.status(400).send({ message: 'Registration failed' })
    }
  }
}