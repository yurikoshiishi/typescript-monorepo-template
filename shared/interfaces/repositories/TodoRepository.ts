import {
  CreateTodoDTO,
  DeleteTodoDTO,
} from "shared/application/repositories/todo/dto";
import { ITodoRepository } from "shared/application/repositories/todo/ITodoRepository";
import { Todo } from "shared/domain/Todo";
import { IDBConnection } from "shared/interfaces/repositories/IDBConnection";
import {
  todoSerializer,
  TodoSerializer,
} from "shared/interfaces/serializers/TodoSerializer";

export class TodoRepository extends ITodoRepository {
  private db: IDBConnection;
  private serializer: TodoSerializer;

  constructor(db: IDBConnection) {
    super();
    this.db = db;
    this.serializer = todoSerializer;
  }

  async getAll(): Promise<Todo[]> {
    const todos = await this.db.todo.findMany();

    return this.serializer.deserializeMany(todos);
  }

  async create(data: CreateTodoDTO): Promise<Todo> {
    const todo = await this.db.todo.create({
      data,
    });

    return this.serializer.deserializeOne(todo);
  }

  async delete(data: DeleteTodoDTO): Promise<Todo> {
    const todo = await this.db.todo.delete({
      where: {
        id: data.id,
      },
    });

    return this.serializer.deserializeOne(todo);
  }
}
