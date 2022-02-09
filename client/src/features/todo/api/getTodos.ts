import { todosQueryKey } from "client/src/features/todo/api/todoQueryKeys";
import { httpClient } from "client/src/infrastructure/http";
import { QueryConfig } from "client/src/infrastructure/react-query";
import { useQuery } from "react-query";

import { Todo } from "shared/domain/Todo";
import {
  SerializedTodo,
  todoSerializer,
} from "shared/interfaces/serializers/TodoSerializer";

type UseTodosOption = {
  config?: QueryConfig<typeof getTodos>;
};

async function getTodos(): Promise<Todo[]> {
  const res = await httpClient.get<{ todos: SerializedTodo[] }>(
    "/api/v1/todos"
  );

  return todoSerializer.deserializeMany(res.todos);
}

export function useGetTodos({ config }: UseTodosOption) {
  return useQuery({
    ...config,
    queryKey: todosQueryKey,
    queryFn: getTodos,
  });
}
