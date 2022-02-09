import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { errorHandler } from "shared/interfaces/controllers/ErrorHandler";

export function serverErrorHandler(
  error: FastifyError,
  req: FastifyRequest,
  reply: FastifyReply
) {
  if (process.env.NODE_ENV !== "production") {
    console.log(error);
  }

  const { body, status } = errorHandler.buildError(error);

  reply.status(status).send(body);
}
