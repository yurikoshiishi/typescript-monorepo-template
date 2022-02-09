import { Box, Button, Flex } from "@chakra-ui/react";
import React, { VFC } from "react";
import { Todo } from "shared/domain/Todo";

interface TodoItemProps {
  todo: Todo;
  onClickDelete?: (params: { todo: Todo }) => any;
}

// reusable component in modules dir
const TodoItem: VFC<TodoItemProps> = ({ todo, onClickDelete }) => {
  return (
    <Box border="1px" borderColor="gray.200" borderRadius="md" p={2}>
      <Flex justify="space-between" align="center">
        {todo.content} {todo.formatCreatedAt()}
        {onClickDelete && (
          <Button
            colorScheme="red"
            size="sm"
            variant="ghost"
            onClick={() => onClickDelete({ todo })}
          >
            Delete
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default TodoItem;
