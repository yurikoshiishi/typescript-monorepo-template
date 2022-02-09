import { CreateTodoDTO } from "shared/application/repositories/todo/dto";
import { ITodoRepository } from "shared/application/repositories/todo/ITodoRepository";

export class CreateTodoUsecase {
  private todoRepository: ITodoRepository;

  constructor(todoRepository: ITodoRepository) {
    this.todoRepository = todoRepository;
  }

  execute(data: CreateTodoDTO) {
    // NOTE: implement other business/app level validations, or some business logic
    return this.todoRepository.create(data);
  }
}
