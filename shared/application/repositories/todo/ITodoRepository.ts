import {
  CreateTodoDTO,
  DeleteTodoDTO,
} from "shared/application/repositories/todo/dto";
import { Todo } from "shared/domain/Todo";

export abstract class ITodoRepository {
  abstract getAll(): Promise<Todo[]>;
  abstract create(data: CreateTodoDTO): Promise<Todo>;
  abstract delete(data: DeleteTodoDTO): Promise<Todo>;
}
