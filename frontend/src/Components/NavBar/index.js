import React from "react";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Flex,
  Text,
  InputGroup,
  Input,
  Grid,
  Stack,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaHome, FaPlusCircle, FaCompass, FaSearch } from "react-icons/fa";
import Profile from "../../Pages/Account/Profile";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    {
      name: "Home",
      icon: FaHome,
      href: "/",
    },
    {
      name: "Criar",
      icon: FaPlusCircle,
      href: isAuthenticated ? "studio" : "criar-quiz",
    },
    {
      name: "Explorar",
      icon: FaCompass,
      href: "/discover",
    },
  ];

  return (
    <Box boxShadow="sm" w="100%">
      <Flex
        as="nav"
        justify="center" // Center items horizontally
        wrap="wrap"
        padding="1rem"
        w="full"
        shadow="lg"
      >
        <Grid
          templateColumns={`repeat(3, 1fr)`} // Dynamically set columns based on number of navLinks
          gap={0}
          placeContent="center"
          placeItems="center"
          w="3/4"
        >
          <Stack direction="row" spacing={6}>
            {navLinks.map((item, i) => (
              <Button
                key={i}
                w="full"
                size="md"
                leftIcon={<item.icon />}
                variant="none"
                _hover={{ color: "blue.600" }}
                rounded="lg"
                mr={3}
                onClick={() => navigate(item.href)}
              >
                {item.name}
              </Button>
            ))}
          </Stack>
          <InputGroup
            w="20rem"
            bg="blackAlpha.50"
            rounded="xl"
            alignItems="center" // Alinha verticalmente os itens dentro do InputGroup
            justifyContent="center" // Centraliza os itens horizontalmente
          >
            <InputLeftElement
              pointerEvents="none"
              children={<FaSearch />}
              rounded="xl"
              h="full"
              color="gray.400"
              display="flex"
              alignItems="center" // Alinha o ícone verticalmente ao centro
              justifyContent="center" // Centraliza o ícone horizontalmente
            />
            {/* Adicionando um Box com largura definida para criar o espaço */}
            <Box width="2rem" />
            <Input variant="unstyled" placeholder="Pesquise no Guizur" p={3} />
          </InputGroup>
          <Grid templateColumns="repeat(2, 1fr)" gap={6} w="full">
            <Button
              bg="blue.600"
              color="gray.100"
              variant="none"
              align="center"
              justify="center"
              s
            >
              <Flex align="center">
                <FaPlusCircle />
                <Text ml={2}>Criar Quiz</Text>
              </Flex>
            </Button>
            <Button
              variant="ghost"
              bg="white"
              color="blue.600"
              border="1px"
              borderColor="gray.200"
              onClick={() => navigate("/")}
            >
              Entrar
            </Button>
          </Grid>
        </Grid>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Perfil do Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Profile />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default NavBar;
