import 'fastify'

declare module 'fastify'{
  export interface FastifyRequest{
    user: Partial<{
      id: string,
      name: string,
      contact_id: string,
      password: string
    }>
  }
}