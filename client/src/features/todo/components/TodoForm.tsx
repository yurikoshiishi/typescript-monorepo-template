import { Button } from "@chakra-ui/react";
import TextField from "client/src/components/ui/TextField";
import React, { ChangeEventHandler, FormEventHandler, VFC } from "react";

export interface TodoFormProps {
  contentValue: string;
  onChangeContent: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const TodoForm: VFC<TodoFormProps> = ({
  onChangeContent,
  onSubmit,
  contentValue,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <TextField
        label="Todo Content"
        onChange={onChangeContent}
        value={contentValue}
      />
      <Button mt={2} colorScheme="blue">
        Add Todo
      </Button>
    </form>
  );
};

export default TodoForm;
