import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { registerTodoRoute } from "server/src/infrastructure/router/todos";

export const registerApiRoutes: FastifyPluginCallback = (
  app: FastifyInstance,
  options,
  done
) => {
  app.register(registerTodoRoute, {
    prefix: "/todos",
  });

  done();
};
