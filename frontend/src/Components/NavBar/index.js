import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Flex,
  Text,
  InputGroup,
  Input,
  Grid,
  useMediaQuery,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaHome, FaPlusCircle, FaCompass, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import ImageViewer from "../../Pages/Images/ImageViewer";

function NavBar() {
  const [page, setPage] = useState(""); // State to track current page
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

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

  // Verifica o tamanho da tela usando useMediaQuery
  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");

  return (
    <Box
      pos="fixed"
      top={0}
      left={0}
      right={0}
      bg="white"
      boxShadow="sm"
      zIndex={2}
      h="10%"
      w="100%"
    >
      <Flex as="nav" justify="space-evenly" w="100%" h="100%">
        <Grid
          w={isLargerThanMD ? "85%" : "100%"}
          templateColumns={isLargerThanMD ? "repeat(3, 1fr)" : "repeat(1, 1fr)"}
          p="0px"
          m={0}
          placeContent="center"
          placeItems="center"
        >
          {isLargerThanMD && (
            <Grid
              direction="row"
              spacing={6}
              templateColumns={`repeat(3, 1fr)`}
              placeContent="center"
              placeItems="center"
            >
              {navLinks.map((item, i) => (
                <Button
                  key={i}
                  w="full"
                  size="md"
                  leftIcon={<item.icon />}
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
            </Grid>
          )}
          {isLargerThanMD && (
            <InputGroup
              w="70%"
              bg="blackAlpha.50"
              rounded="xl"
              alignItems="center"
              justifyContent="space-between"
              px={4}
              py={2}
            >
              <InputLeftElement
                pointerEvents="none"
                children={<FaSearch />}
                color="gray.400"
                ml={2}
              />
              <Input
                variant="unstyled"
                placeholder="Pesquise no Guizur"
                _placeholder={{ color: "gray.500" }}
                px={2}
                py={1}
                mr={2}
                rounded="xl"
                _focus={{ outline: "none" }}
              />
            </InputGroup>
          )}
          <Grid
            templateColumns="repeat(2, 1fr)"
            gap={6}
            w={isLargerThanMD ? "50%" : "100%"}
            h="100%"
            placeContent="center"
            placeItems="center"
          >
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
            {isAuthenticated ? (
              <Box boxSize="45px">
                <Button
                  size="100%"
                  variant="none"
                  float="left"
                  h="100%"
                  borderRadius="full"
                >
                  <ImageViewer idUsuario={user.idUsuario} />
                </Button>
              </Box>
            ) : (
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
            )}
          </Grid>
        </Grid>
      </Flex>
    </Box>
  );
}

export default NavBar;
