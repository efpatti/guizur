import { useAuth } from "../../Hooks/useAuth"; // Alteração aqui
import {
  Container,
  Text,
  Heading,
  Box,
  Icon,
  keyframes,
} from "@chakra-ui/react";
import { FaRegHandshake } from "react-icons/fa6";

// Move animation keyframes definition outside the component
const shakeKeyframes = keyframes`
  0% { transform: translateY(0); }
  25% { transform: translateY(-2px); }
  50% { transform: translateY(3px); }
  75% { transform: translateY(-3px); }
  100% { transform: translateY(0); }
`;

function Logado() {
  const { user } = useAuth();

  return (
    <Container
      maxW="800px"
      minH="50vh"
      textAlign="center"
      paddingY="7rem"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Text mt={50} mb={5}>
        Conectado como:
      </Text>
      <Heading fontSize={30}>{user.email}</Heading>

      <Box textAlign="center" mt={12}>
        <Icon
          as={FaRegHandshake}
          boxSize="100px"
          color="darkblue"
          animation={`${shakeKeyframes} 1.5s infinite`}
        />
      </Box>
    </Container>
  );
}

export default Logado;
