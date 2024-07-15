import React, { useState } from "react";
import {
  Flex,
  Box,
  Grid,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  SimpleGrid,
  IconButton,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useQuizContext } from "./QuizContext";

const Quizzes = () => {
  const { setQuiz, quizzes } = useQuizContext(); // Utilizando quizzes do contexto global
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleQuizClick = (quiz_id) => {
    setQuiz(quiz_id); // Armazenando o ID do quiz no contexto global
    navigate(`/discover/${quiz_id}`); // Redireciona para o caminho com o ID do quiz
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Flex
      justify="center"
      align="center"
      minHeight="70vh"
      flexDirection="column"
    >
      <Box>
        <InputGroup
          m="3"
          h="30px"
          w="15rem"
          as={SimpleGrid}
          columns="3"
          spacing={10}
          transform={isFocused ? "scale(1.3)" : ""}
          transition="all 0.2s"
          onFocus={handleFocus}
          onBlur={handleBlur}
          _focus={{ outline: "none" }}
        >
          {isFocused && (
            <InputLeftElement h="full" w="1/3">
              <Button
                variant="none"
                size="sm"
                color="gray.600"
                _hover={{ opacity: "70%" }}
                _focus={{ outline: "none" }}
                aria-label="Clear"
                onClick={clearSearch}
              >
                x
              </Button>
            </InputLeftElement>
          )}
          <Input
            w="1/3"
            id="customInput"
            type="text"
            placeholder={!isFocused && "Pesquise um quiz"}
            variant="flushed"
            borderColor="gray.600"
            h="full"
            size="sm"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <InputRightElement h="full" w="1/3">
            <IconButton
              size="sm"
              variant="none"
              icon={<FaSearch size="10px" />}
              color="gray.600"
              _hover={{ opacity: "70%" }}
              _focus={{ outline: "none" }}
              aria-label="Search"
            />
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box mt="4">
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
