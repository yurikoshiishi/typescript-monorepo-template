import { FastifyRequest } from "fastify";
import { IRequest } from "shared/interfaces/controllers/types";

export function convertFasitifyRequest(req: FastifyRequest): IRequest {
  return {
    body: isRecord(req.body) ? req.body : {},
    headers: isRecord(req.headers) ? req.headers : {},
    params: isRecord(req.params) ? req.params : {},
    query: isRecord(req.query) ? req.query : {},
  };
}

function isRecord(data: any): data is Record<string, any> {
  return typeof data === "object" && data !== null;
}
