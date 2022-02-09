import fastify from "fastify";
import fastifyCors from "fastify-cors";
import { serverErrorHandler } from "server/src/infrastructure/middleware/serverErrorHandler";
import { registerApiRoutes } from "server/src/infrastructure/router";

const PORT = process.env.PORT!;

const app = fastify({
  logger: false,
});

if (process.env.NODE_ENV !== "production") {
  app.register(fastifyCors);
}

app.register(registerApiRoutes, { prefix: "/api/v1" });

app.setErrorHandler(serverErrorHandler);

app.listen(PORT, "0.0.0.0", () => {
  const routes = app.printRoutes();
  console.log(routes);

  console.info(`Start listening at http://localhost:${PORT}`);
});
