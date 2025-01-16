import { prisma } from "../../lib/prisma"

interface User {
  name: string,
  contactId: string,
  password: string,
}

export class CreateUserService{
  async execute({ name, contactId, password}: User){
    try {
      await prisma.users.create({
        data: {
          name,
          contact_id: contactId,
          password,
        }
      })

      return {
        contactId
      }
      
    } catch (error) {
      console.error(`Error on create user on database: ${error}`)
      throw new Error(`Error on create user on database: ${error}`)
    }
  }
}