import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { convertFasitifyRequest } from "server/src/infrastructure/request";
import { prisma } from "shared/infrastructure/db/prisma";
import { TodoController } from "shared/interfaces/controllers/TodoController";

const controller = new TodoController(prisma);

export const registerTodoRoute: FastifyPluginCallback = (
  app: FastifyInstance,
  options,
  done
) => {
  app.get("/", async (req, reply) => {
    const { status, body } = await controller.getAll(
      convertFasitifyRequest(req)
    );
    reply.status(status).send(body);
  });

  app.post("/", async (req, reply) => {
    const { status, body } = await controller.create(
      convertFasitifyRequest(req)
    );
    reply.status(status).send(body);
  });

  app.delete("/:id", async (req, reply) => {
    const { status, body } = await controller.delete(
      convertFasitifyRequest(req)
    );
    reply.status(status).send(body);
  });

  done();
};
