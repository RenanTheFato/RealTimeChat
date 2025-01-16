import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { SinginUserController } from "./controllers/users/SinginUserController";
import { GetUserController } from "./controllers/users/GetUserController";
import { AuthMiddleware } from "./middlewares/authenticate";

export async function routes(fastify: FastifyInstance) {
  fastify.post("/singup", async(req: FastifyRequest, rep: FastifyReply) => {
    return new CreateUserController().handle(req, rep)
  }) 
  
  fastify.post("/singin", async(req: FastifyRequest, rep: FastifyReply) => {
    return new SinginUserController().handle(req, rep)
  }) 
  
  fastify.get("/user", { preHandler: AuthMiddleware }, async(req: FastifyRequest, rep: FastifyReply) => {
    return new GetUserController().handle(req, rep)
  }) 
}