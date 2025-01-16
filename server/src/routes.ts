import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserController } from "./controllers/users/CreateUserController";

export async function routes(fastify: FastifyInstance) {
  
  fastify.post("/singup", async(req: FastifyRequest, rep: FastifyReply) => {
    return new CreateUserController().handle(req, rep)
  }) 
}