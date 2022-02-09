import { RootIndexResponseBody } from "client/src/interfaces/controllers/RootController/response";
import { GetAllTodoUsecase } from "shared/application/usecases/todo/GetAllTodoUsecase";
import {
  errorHandler,
  ErrorHandler,
} from "shared/interfaces/controllers/ErrorHandler";
import { IRequest, IResponse } from "shared/interfaces/controllers/types";
import { IDBConnection } from "shared/interfaces/repositories/IDBConnection";
import { TodoRepository } from "shared/interfaces/repositories/TodoRepository";
import {
  todoSerializer,
  TodoSerializer,
} from "shared/interfaces/serializers/TodoSerializer";

// TODO: find a cooler way to manage ssr
export class RootController {
  private errorHandler: ErrorHandler;
  private todoSerializer: TodoSerializer;
  private todoRepository: TodoRepository;

  constructor(db: IDBConnection) {
    this.todoSerializer = todoSerializer;
    this.errorHandler = errorHandler;
    this.todoRepository = new TodoRepository(db);
  }

  async index(req: IRequest): Promise<IResponse<RootIndexResponseBody>> {
    try {
      const getAllTodoUsecase = new GetAllTodoUsecase(this.todoRepository);

      const todos = await getAllTodoUsecase.execute();

      return {
        body: { todos: this.todoSerializer.serializeMany(todos) },
        status: 200,
      };
    } catch (error) {
      return this.errorHandler.buildError(error);
    }
  }
}
