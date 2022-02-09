import { Todo } from "shared/domain/Todo";

export interface CreateTodoDTO extends Pick<Todo, "content"> {}

export interface DeleteTodoDTO extends Pick<Todo, "id"> {}
