import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Button,
  SimpleGrid,
  Grid,
  Stack,
  Spinner,
  useMediaQuery,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useQuizContext } from "../SharedElements/QuizContext";
import { useAuth } from "../../../Hooks/useAuth";
import ImageViewer from "../../Images/ImageViewer";

const styleButtonFilterSelected = {
  borderRadius: "10rem",
  variant: "solid",
  border: "1px",
  borderColor: "transparent",
  color: "blue.600",
  padding: "15px",
  fontWeight: "extralight",
  fontSize: "12px",
};

const styleButtonFilter = {
  borderRadius: "10rem",
  variant: "solid",
  border: "1px",
  borderColor: "gray.200",
  color: "gray.500",
  padding: "15px",
  fontWeight: "extralight",
  fontSize: "12px",
};

const styleButtonProfile = {
  borderRadius: "lg",
  variant: "solid",
  border: "1px",
  borderColor: "gray.300",
  bg: "transparent",
  color: "blue.600",
  fontWeight: "extralight",
};

// Função para simular um atraso
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Quizzes = () => {
  const { setQuiz, quizzes, setQuizzes, categorias, tipos } = useQuizContext();
  const [filter, setFilter] = useState(null);
  const [activeTab, setActiveTab] = useState("todos");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);

      // Simular um atraso de 1 segundo
      await delay(500);

      try {
        const response = await fetch(
          `/api/quizzes?category=${filter}&_limit=10`
        ); // Ajuste o endpoint conforme necessário
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Erro ao buscar quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [filter, setQuizzes]);

  const handleQuizClick = (quiz_id) => {
    setQuiz(quiz_id);
    navigate(`/discover/${quiz_id}`);
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    filter ? quiz.category === filter || quiz.type === filter : true
  );

  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");

  return (
    <Flex w="100%" mb={10} justify="center" align="center">
      <Stack
        direction={isLargerThanMD ? "row" : "column"}
        w="100%"
        h="100%"
        spacing={isLargerThanMD ? 0 : 0}
      >
        <Box w={isLargerThanMD ? "70%" : "100%"}>
          <Grid
            templateColumns={isLargerThanMD ? "" : "repeat(1, 1fr)"}
            w="100%"
            h="100%"
            direction="column"
            placeItems="center"
          >
            <Box w="100%">
              <Stack
                direction="column"
                spacing={4}
                w="100%"
                align="center"
                justify="center"
              >
                <Grid
                  templateColumns="repeat(3, 1fr)"
                  gap={3}
                  placeContent="center"
                  placeItems="center"
                >
                  <Button
                    onClick={() => {
                      setFilter(null);
                      setActiveTab("todos");
                    }}
                    bg={activeTab === "todos" ? "blue.50" : "transparent"}
                    sx={
                      activeTab === "todos"
                        ? styleButtonFilterSelected
                        : styleButtonFilter
                    }
                    size={isLargerThanMD ? "sm" : "xs"}
                    w="100%"
                  >
                    Todos
                  </Button>
                  <Button
                    onClick={() => setActiveTab("categorias")}
                    bg={activeTab === "categorias" ? "blue.50" : "transparent"}
                    sx={
                      activeTab === "categorias"
                        ? styleButtonFilterSelected
                        : styleButtonFilter
                    }
                    size={isLargerThanMD ? "sm" : "xs"}
                    w="100%"
                  >
                    Categorias
                  </Button>
                  <Button
                    onClick={() => setActiveTab("tipos")}
                    bg={activeTab === "tipos" ? "blue.50" : "transparent"}
                    sx={
                      activeTab === "tipos"
                        ? styleButtonFilterSelected
                        : styleButtonFilter
                    }
                    size={isLargerThanMD ? "sm" : "xs"}
                    w="100%"
                  >
                    Tipos
                  </Button>
                </Grid>
                {activeTab === "categorias" && (
                  <Grid
                    templateColumns="repeat(auto-fit, minmax(100px, 1fr))"
                    gap={3}
                    w="50%"
                  >
                    {categorias.map((item, i) => (
                      <Button
                        key={i}
                        onClick={() => {
                          setFilter(item.name);
                          setActiveTab("categorias");
                        }}
                        bg={filter === item.name ? "blue.50" : "transparent"}
                        sx={
                          filter === item.name
                            ? styleButtonFilterSelected
                            : styleButtonFilter
                        }
                        size={isLargerThanMD ? "sm" : "xs"}
                        width="100%"
                      >
                        {item.name} (
                        {quizzes.filter((q) => q.category === item.name).length}
                        )
                      </Button>
                    ))}
                  </Grid>
                )}
                {activeTab === "tipos" && (
                  <Grid
                    templateColumns="repeat(auto-fit, minmax(100px, 1fr))"
                    gap={3}
                    w="50%"
                  >
                    {tipos.map((item, i) => (
                      <Button
                        key={i}
                        onClick={() => {
                          setFilter(item.code);
                          setActiveTab("tipos");
                        }}
                        bg={filter === item.code ? "blue.50" : "transparent"}
                        sx={
                          filter === item.code
                            ? styleButtonFilterSelected
                            : styleButtonFilter
                        }
                        size={isLargerThanMD ? "sm" : "xs"}
                        w="100%"
                      >
                        {item.name === "Quiz de Certo e Errado"
                          ? "Quiz"
                          : item.name === "Quiz de Personalidade"
                          ? "Personalidade"
                          : item.name}{" "}
                      </Button>
                    ))}
                  </Grid>
                )}
                {loading ? (
                  <Flex justify="center" align="center" height="300px">
                    <Spinner size="xl" />
                  </Flex>
                ) : (
                  <SimpleGrid
                    columns={isLargerThanMD ? 3 : 1}
                    gap={3}
                    mt="4"
                    w="70%"
                    placeContent="center"
                    placeItems="center"
                  >
                    {filteredQuizzes.length > 0 ? (
                      filteredQuizzes.map((quiz, i) => (
                        <Box
                          key={i}
                          w="100%"
                          borderWidth="1px"
                          borderRadius="md"
                          shadow="md"
                          cursor="pointer"
                          onClick={() => handleQuizClick(quiz.quiz_id)}
                          _hover={{ shadow: "lg" }}
                          height="300px"
                          rounded="xl"
                          position="relative"
                        >
                          <Box w="100%" h="65%" position="relative">
                            <Image
                              src=".."
                              alt={quiz.desc}
                              h="100%"
                              border="0px"
                              borderBottom="1px"
                              borderColor="gray.300"
                            />
                            <Button
                              position="absolute"
                              bottom="0"
                              p={3}
                              m={3}
                              size="xs"
                              rounded="full"
                              textAlign="center"
                              bg="blue.50"
                              variant="none"
                              w="20%"
                            >
                              <Text
                                fontSize="10px"
                                color="blue.500"
                                rounded="full"
                              >
                                {quiz.type === "right_or_wrong"
                                  ? "Quiz"
                                  : quiz.type === "list"
                                  ? "Lista"
                                  : quiz.type === "about_me"
                                  ? "Sobre Mim"
                                  : "Personalidade"}
                              </Text>
                            </Button>
                          </Box>

                          <Stack
                            position="absolute"
                            bottom="4"
                            direction="column"
                            spacing={1}
                            p="4"
                            alignContent="center"
                            alignItems="center"
                            justifyItems="center"
                            justifyContent="center"
                          >
                            <Text fontSize="md" fontWeight="semibold" mb={2}>
                              {quiz.title}
                            </Text>
                          </Stack>
                        </Box>
                      ))
                    ) : (
                      <Text>Nenhum quiz encontrado.</Text>
                    )}
                  </SimpleGrid>
                )}
              </Stack>
            </Box>
          </Grid>
        </Box>
        {isLargerThanMD && (
          <Box w="30%">
            <Profiles />
          </Box>
        )}
      </Stack>
    </Flex>
  );
};

const Profiles = () => {
  const { users } = useAuth();
  return (
    <Flex justify="center" w="100%">
      <Grid w="50%">
        <Text fontSize="lg" fontWeight="semibold" mb={4} textAlign="start">
          Perfis Recomendados
        </Text>
        <Grid gap={5}>
          {users.map((item, i) => (
            <Grid templateColumns="auto 1fr auto" key={i} gap={3}>
              <Box boxSize="50px">
                <ImageViewer idUsuario={item.idUsuario} pad={0} />
              </Box>
              <Box>
                <Text fontWeight="semibold">{item.nome}</Text>
                <Text fontSize="sm" fontWeight="light" color="gray.600">
                  {item.email}
                </Text>
              </Box>
              <Box>
                <Button
                  color="blue.700"
                  size="sm"
                  border="1px"
                  borderColor="gray.900"
                  sx={styleButtonProfile}
                >
                  Seguir
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Flex>
  );
};

export default Quizzes;
