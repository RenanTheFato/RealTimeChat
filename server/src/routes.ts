import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { SinginUserController } from "./controllers/users/SinginUserController";
import { GetUserController } from "./controllers/users/GetUserController";
import { AuthMiddleware } from "./middlewares/authenticate";
import { GetUserChatsController } from "./controllers/chats/GetUserChatsController";
import { GetMessagesController } from "./controllers/messages/GetMessagesController";

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

  fastify.get("/chat/:chatId/messages", { preHandler: AuthMiddleware }, async(req: FastifyRequest, rep: FastifyReply) => {
    // return new GetMessagesController().handle(req, rep)
  })

  fastify.get("/chats", {  preHandler: AuthMiddleware}, async(req: FastifyRequest, rep: FastifyReply) =>{
    return new GetUserChatsController().handle(req, rep)
  })
}