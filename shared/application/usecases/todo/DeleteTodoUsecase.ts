import { DeleteTodoDTO } from "shared/application/repositories/todo/dto";
import { ITodoRepository } from "shared/application/repositories/todo/ITodoRepository";

export class DeleteTodoUsecase {
  private todoRepository: ITodoRepository;

  constructor(todoRepository: ITodoRepository) {
    this.todoRepository = todoRepository;
  }

  execute(data: DeleteTodoDTO) {
    // NOTE: implement other business/app level validations, or some business logic
    return this.todoRepository.delete(data);
  }
}
