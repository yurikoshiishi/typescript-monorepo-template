import { IResponse } from "shared/interfaces/controllers/types";
import { SerializedTodo } from "shared/interfaces/serializers/TodoSerializer";

export type RootIndexResponseBody = { todos: SerializedTodo[] };

export function guardRootIndexResponseBody(
  body: IResponse["body"]
): body is RootIndexResponseBody {
  return "todos" in body;
}
