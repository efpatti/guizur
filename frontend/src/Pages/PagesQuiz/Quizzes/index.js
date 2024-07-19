import React, { useState } from "react";
import { Flex, Box, Grid, Text, Button } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useQuizContext } from "./QuizContext";

const Quizzes = () => {
  const { setQuiz, quizzes, categorias } = useQuizContext(); // Utilizando quizzes do contexto global
  const [category, setCategory] = useState(null); // Inicialmente nenhum filtro de categoria
  console.log(categorias);

  const navigate = useNavigate();

  const handleQuizClick = (quiz_id) => {
    setQuiz(quiz_id); // Armazenando o ID do quiz no contexto global
    navigate(`/discover/${quiz_id}`); // Redireciona para o caminho com o ID do quiz
  };

  const filteredQuizzes = category
    ? quizzes.filter((item) => item.category === category)
    : quizzes;

  const numResultados = filteredQuizzes.length; // Conta o número de quizzes após o filtro

  return (
    <Flex
      justify="center"
      align="center"
      minHeight="70vh"
      flexDirection="column"
    >
      <Box mt="4">
        <Button onClick={() => setCategory(null)}>Todos</Button>
        {categorias.map((item, i) => (
          <Button
            onClick={() =>
              setCategory(category === item.category ? null : item.category)
            }
            variant={category === item.category ? "solid" : "outline"}
          >
            {item.category}
          </Button>
        ))}

        <Button
          onClick={() =>
            setCategory(category === "Basquete" ? null : "Basquete")
          }
          variant={category === "Basquete" ? "solid" : "outline"}
        >
          Basquete
        </Button>
        <Text mt="2" mb="4">
          {category !== null && (
            <Text>{numResultados} resultados encontrados</Text>
          )}
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap="3">
          {filteredQuizzes.map((quiz, i) => (
            <Box
              key={i}
              p="4"
              borderWidth="1px"
              borderRadius="md"
              shadow="md"
              onClick={() => handleQuizClick(quiz.quiz_id)}
              style={{ cursor: "pointer" }}
            >
              <Text fontSize="2xl">{quiz.title}</Text>
              <Text>{quiz.description}</Text>
            </Box>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Quizzes;
