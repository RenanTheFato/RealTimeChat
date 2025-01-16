import { prisma } from "../../lib/prisma"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface User {
  contact_id: string,
  password: string,
}

export class SinginUserService{
  async execute({ contact_id, password }: User){

    const isUserExists = await prisma.users.findFirst({
      where: {
        contact_id
      }
    })

    if (!isUserExists) {
      throw new Error("Invalid contact id or password.")
    }

    const isPasswordCorrect = await bcrypt.compare(password, isUserExists.password)

    if (!isPasswordCorrect) {
      throw new Error("Invalid contact id or password.")
    }

    const token = jwt.sign({ id: isUserExists.id}, String(process.env.JWT_PASSWORD), {expiresIn: '12h'})

    return {
      token: token,
    }
  }
}