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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useQuizContext } from "../SharedElements/QuizContext";
import { useAuth } from "../../../Hooks/useAuth";

const styleButtonFilterSelected = {
  borderRadius: "10rem",
  variant: "solid",
  border: "1px",
  borderColor: "transparent",
  color: "blue.600",
  fontWeight: "extralight",
};

const styleButtonFilter = {
  borderRadius: "10rem",
  variant: "solid",
  border: "1px",
  borderColor: "gray.200",
  color: "gray.800",
  fontWeight: "extralight",
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

  return (
    <Flex w="100%" mb={10} justify="center" align="center">
      <Grid templateColumns="1fr 400px" w="80%" direction="column">
        <Box>
          <Stack direction="column" spacing={5}>
            <Grid templateColumns="repeat(7, 1fr)" gap={3}>
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
                size="sm"
                width="100%"
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
                size="sm"
                width="100%"
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
                size="sm"
                width="100%"
              >
                Tipos
              </Button>
            </Grid>
            {activeTab === "categorias" && (
              <Grid
                templateColumns="repeat(auto-fit, minmax(120px, 1fr))"
                gap={3}
              >
                <Button
                  onClick={() => {
                    setFilter(null);
                    setActiveTab("todos");
                  }}
                  bg={
                    filter === null && activeTab === "todos"
                      ? "blue.50"
                      : "transparent"
                  }
                  sx={
                    filter === null && activeTab === "todos"
                      ? styleButtonFilterSelected
                      : styleButtonFilter
                  }
                  size="sm"
                  width="100%"
                >
                  Todos
                </Button>
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
                    size="sm"
                    width="100%"
                  >
                    {item.name} (
                    {quizzes.filter((q) => q.category === item.name).length})
                  </Button>
                ))}
              </Grid>
            )}
            {activeTab === "tipos" && (
              <Grid
                templateColumns="repeat(auto-fit, minmax(120px, 1fr))"
                gap={3}
              >
                <Button
                  onClick={() => {
                    setFilter(null);
                    setActiveTab("todos");
                  }}
                  bg={
                    filter === null && activeTab === "todos"
                      ? "blue.50"
                      : "transparent"
                  }
                  sx={
                    filter === null && activeTab === "todos"
                      ? styleButtonFilterSelected
                      : styleButtonFilter
                  }
                  size="sm"
                  width="100%"
                >
                  Todos
                </Button>
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
                    size="sm"
                    width="100%"
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
              <SimpleGrid columns={3} gap={4} mt="4" w="100%">
                {filteredQuizzes.length > 0 ? (
                  filteredQuizzes.map((quiz, i) => (
                    <Box
                      key={i}
                      p="4"
                      borderWidth="1px"
                      borderRadius="md"
                      shadow="md"
                      cursor="pointer"
                      onClick={() => handleQuizClick(quiz.quiz_id)}
                      _hover={{ shadow: "lg" }}
                      height="300px"
                      position="relative"
                    >
                      <Text fontSize="xl" fontWeight="semibold" mb={2}>
                        {quiz.title}
                      </Text>
                      <Text fontSize="sm" color="gray.600" mb="2">
                        {quiz.description}
                      </Text>
                      <Box position="absolute" bottom="4" left="4">
                        <Text fontSize="sm">Categoria: {quiz.category}</Text>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Text>Nenhum quiz encontrado.</Text>
                )}
              </SimpleGrid>
            )}
          </Stack>
        </Box>
        <Box>
          <Profiles />
        </Box>
      </Grid>
    </Flex>
  );
};

const Profiles = () => {
  const { users } = useAuth();
  return (
    <Flex justify="center">
      <Grid>
        <Text fontSize="xl" fontWeight="bold">
          Perfis Recomendados
        </Text>
        <Grid gap={5} mt={3}>
          {users.map((item, i) => (
            <Grid
              templateColumns="repeat(2, 1fr)"
              key={i}
              gap={3}
              placeItems="start"
            >
              <Box as={Grid} placeItems="start">
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
