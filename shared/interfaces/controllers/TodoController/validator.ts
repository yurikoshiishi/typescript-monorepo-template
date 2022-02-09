import {
  CreateTodoDTO,
  DeleteTodoDTO,
} from "shared/application/repositories/todo/dto";
import { InvalidInputError } from "shared/interfaces/controllers/ErrorHandler";
import { IRequest } from "shared/interfaces/controllers/types";

interface CreateTodoRequest extends IRequest {
  body: CreateTodoDTO;
}
interface DeleteTodoRequest extends IRequest {
  params: DeleteTodoDTO;
}

export function assertsCreateTodoRequest(
  req: IRequest
): asserts req is CreateTodoRequest {
  if (!req.body.content) {
    throw new InvalidInputError("content is required");
  }
}

export function assertsDeleteTodoRequest(
  req: IRequest
): asserts req is DeleteTodoRequest {
  if (!req.params?.id) {
    throw new InvalidInputError("id is required");
  }
}
