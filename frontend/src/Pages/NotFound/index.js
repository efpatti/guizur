import { Box, Text, Button } from "@chakra-ui/react";
function NotFound() {
  return (
    <Box minH="100vh">
      <Text fontSize="xl" as="b">
        Error 404
      </Text>
      <Text fontSize="md">Página não encontrada</Text>
      <Button>Retornar ao início</Button>
    </Box>
  );
}

export default NotFound;
