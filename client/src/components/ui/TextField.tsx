import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import React, { VFC } from "react";

interface TextFieldProps extends InputProps {
  label: string;
  helperText?: string;
  errorMessage?: string;
  isError?: boolean;
}

const TextField: VFC<TextFieldProps> = ({
  id,
  errorMessage,
  helperText,
  isError,
  label,
  ...inputProps
}) => {
  return (
    <FormControl isInvalid={isError}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input {...inputProps} />
      {!isError
        ? helperText && <FormHelperText>{helperText}</FormHelperText>
        : errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export default TextField;
