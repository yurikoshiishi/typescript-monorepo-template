import { todosQueryKey } from "client/src/features/todo/api/todoQueryKeys";
import { httpClient } from "client/src/infrastructure/http";
import {
  MutationConfig,
  queryClient,
} from "client/src/infrastructure/react-query";
import { useMutation } from "react-query";
import { CreateTodoDTO } from "shared/application/repositories/todo/dto";
import {
  SerializedTodo,
  todoSerializer,
} from "shared/interfaces/serializers/TodoSerializer";

type UseCreateTodoOption = {
  config?: MutationConfig<typeof createTodo>;
};

async function createTodo(data: CreateTodoDTO) {
  const res = await httpClient.post<{ todo: SerializedTodo }, CreateTodoDTO>(
    "/api/v1/todos",
    data
  );

  return todoSerializer.deserializeOne(res.todo);
}

export function useCreateTodo({ config }: UseCreateTodoOption = {}) {
  return useMutation({
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries(todosQueryKey);

      const prevTodos = queryClient.getQueryData<Comment[]>(todosQueryKey);

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
    mutationFn: createTodo,
  });
}
