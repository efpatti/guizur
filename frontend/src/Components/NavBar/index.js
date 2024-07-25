import React, { useEffect, useState } from "react";
import {
  Button,
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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

function NavBar() {
  const [page, setPage] = useState(""); // State to track current page
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Update page state with current pathname on component mount
    setPage(window.location.pathname);
  }, []);

  // Function to update page state when navigation changes
  const handleNavigation = (href) => {
    setPage(href); // Update page state with the new pathname
    navigate(href); // Navigate to the new page
  };

  // Navigation links configuration
  const navLinks = [
    {
      name: "Home",
      icon: FaHome,
      href: "/",
    },
    {
      name: "Criar",
      icon: FaPlusCircle,
      href: isAuthenticated ? "/studio" : "/criar-quiz",
    },
    {
      name: "Explorar",
      icon: FaCompass,
      href: "/discover",
    },
  ];

  return (
    <Box position="fixed" width="100%" zIndex={100}>
      <Box boxShadow="sm" w="100%" bg="white">
        <Flex
          as="nav"
          justify="center"
          wrap="wrap"
          padding="0.8rem"
          w="full"
          shadow="lg"
        >
          <Grid
            templateColumns={`repeat(3, 1fr)`}
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
                  leftIcon={
                    <item.icon
                      style={{
                        color:
                          page === item.href &&
                          item.href === "/logado" &&
                          "blue.500",
                      }}
                    />
                  }
                  variant="none"
                  _hover={{ color: "blue.600" }}
                  color={page === item.href && "blue.700"}
                  bg={page === item.href ? "gray.50" : "transparent"}
                  rounded="lg"
                  mr={3}
                  onClick={() => handleNavigation(item.href)}
                >
                  {item.name}
                </Button>
              ))}
            </Stack>
            <InputGroup
              w="20rem"
              bg="blackAlpha.50"
              rounded="xl"
              alignItems="center"
              justifyContent="center"
            >
              <InputLeftElement
                pointerEvents="none"
                children={<FaSearch />}
                rounded="xl"
                h="full"
                color="gray.400"
                display="flex"
                alignItems="center"
                justifyContent="center"
              />
              <Box width="2rem" />
              <Input
                variant="unstyled"
                placeholder="Pesquise no Guizur"
                p={3}
              />
            </InputGroup>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} w="full">
              <Button
                bg="blue.600"
                color="gray.100"
                variant="none"
                align="center"
                justify="center"
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
                onClick={() => handleNavigation("/")}
              >
                Entrar
              </Button>
            </Grid>
          </Grid>
        </Flex>
      </Box>
    </Box>
  );
}

export default NavBar;
