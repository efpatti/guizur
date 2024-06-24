import React, { useState, useEffect } from "react";
import { useColorMode } from "@chakra-ui/react";
import { useAuth } from "../../Hooks/useAuth";
import { FaEdit } from "react-icons/fa";
import {
  Flex,
  Stack,
  Box,
  Text,
  IconButton,
  Avatar,
  Heading,
  Grid,
} from "@chakra-ui/react";

function Profile() {
  useEffect(() => {
    optionClick();
  }, []);

  const [option, setOption] = useState(false);
  const { colorMode } = useColorMode();
  const { user } = useAuth();

  const optionClick = () => {
    setOption(true);
  };

  return (
    <Flex direction={{ base: "column", md: "row" }}>
      <Box w={{ base: "100%", md: "25%" }} h="100%" position="static">
        <Box
          bg={colorMode === "light" ? "gray.200" : "gray.600"}
          h="100%"
          p="5"
        >
          <Stack direction="row" gap="2" m="3" p="5">
            <Avatar
              size="lg"
              ml={{ base: "auto", md: "117" }}
              name={user.nome}
              src={user.avatarUrl}
              mb="6"
            />
            <Box>
              <Stack direction="row" gap="1">
                <Text
                  fontSize="lg"
                  color={colorMode === "light" ? "black" : "white"}
                >
                  Bem vindo (a),
                </Text>
                <Text fontSize="xl" align="center" fontWeight="bold">
                  {user.nome}
                </Text>
              </Stack>
            </Box>
            <Text
              fontSize="md"
              align="center"
              as="em"
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              {user.email}
            </Text>
          </Stack>
        </Box>
      </Box>
      <Box w={{ base: "100%", md: "75%" }}>{option && <ProfileOption />}</Box>
    </Flex>
  );
}

function ProfileOption() {
  const itemProfile = {
    border: "1px",
    borderColor: "gray.300",
    borderRadius: "15px",
    p: "5",
    m: "3",
    boxShadow: "lg",
  };
  const labelInfo = {
    fontWeight: "bold",
  };
  const { user } = useAuth();
  const { colorMode } = useColorMode();

  return (
    <Flex
      justify="center"
      align="center"
      w="100%"
      minH="100vh"
      color={colorMode === "light" ? "black" : "white"}
    >
      <Stack direction="column" gap="2" w={{ base: "90%", md: "50%" }} m="8">
        <Heading as="h3" mt={10} align="center">
          Meu perfil
        </Heading>
        <Box sx={itemProfile}>
          <Flex
            direction="column"
            align="center"
            justify="center"
            mb="5"
          ></Flex>
          <Flex
            borderBottom="1px"
            w="100%"
            borderColor="gray.300"
            align="center"
            justifyContent="space-between"
            p="2"
          >
            <Text>Informações Pessoais</Text>
            <IconButton
              bg="0"
              borderRadius="xl"
              border="1px"
              borderColor="gray.300"
              variant="none"
              icon={<FaEdit />}
              color={colorMode === "light" ? "black" : "white"}
            />
          </Flex>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap="2"
            p="2"
            m="3"
          >
            <Box>
              <Stack direction="column">
                <Text sx={labelInfo}>Nome</Text>
                <Text>{user.nome}</Text>
              </Stack>
            </Box>
            <Box>
              <Stack direction="column">
                <Text sx={labelInfo}>Email</Text>
                <Text>{user.email}</Text>
              </Stack>
            </Box>
            <Box>
              <Stack direction="column">
                <Text sx={labelInfo}>CPF</Text>
                <Text>{user.cpf}</Text>
              </Stack>
            </Box>
          </Grid>
        </Box>
        <Box sx={itemProfile}>
          <Flex
            borderBottom="1px"
            w="100%"
            borderColor="gray.300"
            align="center"
            justifyContent="space-between"
            p="2"
          >
            <Text>Endereço</Text>
            <IconButton
              bg="0"
              borderRadius="xl"
              border="1px"
              borderColor="gray.300"
              variant="none"
              icon={<FaEdit />}
              color={colorMode === "light" ? "black" : "white"}
            />
          </Flex>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap="2"
            p="2"
            m="3"
          >
            <Box>
              <Stack direction="column">
                <Text sx={labelInfo}>Rua</Text>
                <Text>{user.rua}</Text>
              </Stack>
            </Box>
            <Box>
              <Stack direction="column">
                <Text sx={labelInfo}>Número</Text>
                <Text>{user.numero}</Text>
              </Stack>
            </Box>
            <Box>
              <Stack direction="column">
                <Text sx={labelInfo}>Cidade</Text>
                <Text>{user.cidade}</Text>
              </Stack>
            </Box>
            <Box>
              <Stack direction="column">
                <Text sx={labelInfo}>Estado</Text>
                <Text>{user.estado}</Text>
              </Stack>
            </Box>
            <Box>
              <Stack direction="column">
                <Text sx={labelInfo}>CEP</Text>
                <Text>{user.cep}</Text>
              </Stack>
            </Box>
          </Grid>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Profile;
