import { CreateTodoUsecase } from "shared/application/usecases/todo/CreateTodoUsecase";
import { DeleteTodoUsecase } from "shared/application/usecases/todo/DeleteTodoUsecase";
import { GetAllTodoUsecase } from "shared/application/usecases/todo/GetAllTodoUsecase";
import {
  assertsCreateTodoRequest,
  assertsDeleteTodoRequest,
} from "shared/interfaces/controllers/TodoController/validator";
import { IRequest, IResponse } from "shared/interfaces/controllers/types";
import { IDBConnection } from "shared/interfaces/repositories/IDBConnection";
import { TodoRepository } from "shared/interfaces/repositories/TodoRepository";
import {
  SerializedTodo,
  todoSerializer,
  TodoSerializer,
} from "shared/interfaces/serializers/TodoSerializer";

export class TodoController {
  private serializer: TodoSerializer;
  private repository: TodoRepository;

  constructor(db: IDBConnection) {
    this.serializer = todoSerializer;
    this.repository = new TodoRepository(db);
  }

  async getAll(req: IRequest): Promise<IResponse<{ todos: SerializedTodo[] }>> {
    const usecase = new GetAllTodoUsecase(this.repository);
    const todos = await usecase.execute();

    return {
      body: { todos: this.serializer.serializeMany(todos) },
      status: 200,
    };
  }

  async create(req: IRequest): Promise<IResponse<{ todo: SerializedTodo }>> {
    assertsCreateTodoRequest(req);

    const usecase = new CreateTodoUsecase(this.repository);
    const todo = await usecase.execute(req.body);

    return {
      body: { todo: this.serializer.serializeOne(todo) },
      status: 200,
    };
  }

  async delete(req: IRequest): Promise<IResponse<{ todo: SerializedTodo }>> {
    assertsDeleteTodoRequest(req);

    const usecase = new DeleteTodoUsecase(this.repository);
    const todo = await usecase.execute(req.params);

    return {
      body: { todo: this.serializer.serializeOne(todo) },
      status: 200,
    };
  }
}
