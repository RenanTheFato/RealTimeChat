import { prisma } from "../lib/prisma"

export async function generateContactId(): Promise<string> {
  while (true) {
    const prefix = 77
    let result = prefix.toString()

    for (let index = 0; index < 9; index++) {
      const number = Math.floor(Math.random() * 10)
      result += number.toString()
    }

    const contactId = result

    const contactIdAlreadyExists = await prisma.users.findUnique({
      where: {
        contact_id: contactId
      }
    })

    if (!contactIdAlreadyExists) {
      return contactId
    }
  }
}