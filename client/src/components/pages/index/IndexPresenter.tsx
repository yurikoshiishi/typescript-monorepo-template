import { Box } from "@chakra-ui/react";
import Main from "client/src/components/layouts/Main";
import { UseIndexPresenter } from "client/src/components/pages/index/useIndexPresenter";
import TodoForm from "client/src/features/todo/components/TodoForm";
import TodoItem from "client/src/features/todo/components/TodoItem";
import React, { VFC } from "react";

const IndexPresenter: VFC<UseIndexPresenter> = ({
  todoFormProps,
  todos,
  onClickDeleteTodo,
}) => {
  return (
    <Main>
      <TodoForm {...todoFormProps} />
      <Box mt={4}>
        {todos.map((todo) => (
          <Box mt={2} key={todo.id}>
            <TodoItem todo={todo} onClickDelete={onClickDeleteTodo} />
          </Box>
        ))}
      </Box>
    </Main>
  );
};

export default IndexPresenter;
