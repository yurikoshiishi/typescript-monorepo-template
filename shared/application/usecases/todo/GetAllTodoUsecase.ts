import { ITodoRepository } from "shared/application/repositories/todo/ITodoRepository";

export class GetAllTodoUsecase {
  private todoRepository: ITodoRepository;

  constructor(todoRepository: ITodoRepository) {
    this.todoRepository = todoRepository;
  }

  execute() {
    // NOTE: implement other business/app level validations, or some business logic
    return this.todoRepository.getAll();
  }
}
