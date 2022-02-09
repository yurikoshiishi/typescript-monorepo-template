import { ChakraProvider } from "@chakra-ui/react";
import { queryClient } from "client/src/infrastructure/react-query";
import React from "react";
import { QueryClientProvider } from "react-query";

interface AppProviderProps {}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>{children}</ChakraProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
