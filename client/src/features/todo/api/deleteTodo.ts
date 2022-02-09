import { todosQueryKey } from "client/src/features/todo/api/todoQueryKeys";
import { httpClient } from "client/src/infrastructure/http";
import {
  MutationConfig,
  queryClient,
} from "client/src/infrastructure/react-query";
import { useMutation } from "react-query";
import { DeleteTodoDTO } from "shared/application/repositories/todo/dto";
import { Todo } from "shared/domain/Todo";
import {
  SerializedTodo,
  todoSerializer,
} from "shared/interfaces/serializers/TodoSerializer";

type UseDeleteTodoOption = {
  config?: MutationConfig<typeof deleteTodo>;
};

async function deleteTodo(data: DeleteTodoDTO) {
  const res = await httpClient.delete<{ todo: SerializedTodo }>(
    `/api/v1/todos/${data.id}`
  );

  return todoSerializer.deserializeOne(res.todo);
}

export function useDeleteTodo({ config }: UseDeleteTodoOption = {}) {
  return useMutation({
    onMutate: async (deletedTodo) => {
      await queryClient.cancelQueries(todosQueryKey);

      const prevTodos = queryClient.getQueryData<Todo[]>(todosQueryKey);

      queryClient.setQueryData(
        todosQueryKey,
        prevTodos?.filter((todo) => todo.id !== deletedTodo.id)
      );

      return { prevTodos };
    },
    onError: (_, __, context: any) => {
      if (context?.prevTodos) {
        queryClient.setQueryData(todosQueryKey, context.prevTodos);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(todosQueryKey);
    },
    ...config,
    mutationFn: deleteTodo,
  });
}
