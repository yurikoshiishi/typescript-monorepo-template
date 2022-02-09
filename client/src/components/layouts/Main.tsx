import { Box, Container } from "@chakra-ui/react";
import React from "react";

interface MainProps {}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <Container maxW="container.lg">
      <Box px={4} py={8}>
        {children}
      </Box>
    </Container>
  );
};

export default Main;
