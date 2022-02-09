import { useCreateTodo } from "client/src/features/todo/api/createTodo";
import { useDeleteTodo } from "client/src/features/todo/api/deleteTodo";
import { useGetTodos } from "client/src/features/todo/api/getTodos";
import { TodoFormProps } from "client/src/features/todo/components/TodoForm";
import { useState, FormEventHandler, ChangeEventHandler } from "react";
import { Todo } from "shared/domain/Todo";

interface UseIndexPresenterProps {
  todos: Todo[];
}

export interface UseIndexPresenter {
  todos: Todo[];
  todoFormProps: TodoFormProps;
  onClickDeleteTodo: (params: { todo: Todo }) => void;
}

export function useIndexPresenter({
  todos: initialTodos,
}: UseIndexPresenterProps): UseIndexPresenter {
  const { data: todos } = useGetTodos({
    config: {
      initialData: initialTodos,
    },
  });
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: createTodo } = useCreateTodo();
  const [contentValue, setContentValue] = useState<string>("");

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    createTodo({ content: contentValue });

    setContentValue("");
  };

  const onChangeContent: ChangeEventHandler<HTMLInputElement> = (e) => {
    setContentValue(e.target.value);
  };

  const onClickDeleteTodo = async ({ todo }: { todo: Todo }) => {
    deleteTodo({
      id: todo.id,
    });
  };

  return {
    todoFormProps: {
      contentValue,
      onChangeContent,
      onSubmit,
    },
    todos: todos || [],
    onClickDeleteTodo,
  };
}
