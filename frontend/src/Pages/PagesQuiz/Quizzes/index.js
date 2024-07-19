import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Button,
  SimpleGrid,
  Grid,
  Stack,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useQuizContext } from "../SharedElements/QuizContext";

const Quizzes = () => {
  const { setQuiz, quizzes, categorias } = useQuizContext();
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  const handleQuizClick = (quiz_id) => {
    setQuiz(quiz_id);
    navigate(`/discover/${quiz_id}`);
  };

  const filteredQuizzes = category
    ? quizzes.filter((item) => item.category === category)
    : quizzes;

  const numResultados = filteredQuizzes.length;

  return (
    <Flex justify="center" w="100%">
      <Stack direction="column" w="80%">
        <Grid templateColumns="repeat(3, 1fr)" gap={3}>
          {categorias.map((item, i) => (
            <Button
              key={i}
              onClick={() =>
                setCategory(category === item.name ? null : item.name)
              }
              variant={category === item.name ? "solid" : "outline"}
              mb="2"
            >
              {item.name} (
              {quizzes.filter((q) => q.category === item.name).length})
            </Button>
          ))}
          <Button onClick={() => setCategory(null)} variant="outline">
            Todas
          </Button>
        </Grid>
        <Flex justifyContent="center">
          <SimpleGrid columns={3} gap={4} mt="4" w="100%">
            {filteredQuizzes.map((quiz, i) => (
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
            ))}
          </SimpleGrid>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Quizzes;
