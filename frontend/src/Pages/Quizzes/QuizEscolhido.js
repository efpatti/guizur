import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  Grid,
  Container,
  Flex,
  border,
  Stack,
} from "@chakra-ui/react";
import { useQuizContext } from "./QuizContext";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

const QuizEscolhido = () => {
  const { quiz_id } = useParams();
  const { quizzes, pegarQuestoes } = useQuizContext();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsData = await pegarQuestoes(quiz_id);
        const initialSelectedAnswers = {};
        questionsData.forEach((question) => {
          initialSelectedAnswers[question.question_id] = null;
        });
        setSelectedAnswers(initialSelectedAnswers);
        setQuestions(questionsData);
        console.log("Questions: ", questions);
      } catch (error) {
        console.error(`Erro ao carregar questões do quiz ${quiz_id}:`, error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerClick = (questionId, answerId) => {
    if (!showResult) {
      const updatedSelectedAnswers = {
        ...selectedAnswers,
        [questionId]: answerId,
      };
      setSelectedAnswers(updatedSelectedAnswers);
      setShowResult(true); // Show results after selecting an answer
    }
  };

  const quizzesFiltered = quizzes.filter(
    (quiz) => quiz.quiz_id === parseInt(quiz_id)
  );

  return (
    <Container maxW="container.lg" centerContent>
      {quizzesFiltered.map((quiz) => (
        <Text key={quiz.quiz_id} fontSize="2xl" mb="4">
          Quiz Escolhido: {quiz.title}
        </Text>
      ))}
      {questions.map((question) => (
        <Box
          key={question.question_id}
          mb="4"
          borderWidth="1px"
          borderRadius="md"
          w="90%"
          minH="30vh"
          alignContent="center"
          p="5"
        >
          <Text fontSize="xl" textAlign="center" m="5">
            {question.question_text}
          </Text>
          <Grid
            templateColumns="repeat(2, 1fr)"
            gap="4"
            placeContent="center"
            p="3"
          >
            {question.answers.map((answer) => {
              const isSelected =
                selectedAnswers[question.question_id] === answer.answer_id;
              const isCorrect = answer.is_correct === 1;
              const showCheck = showResult && isCorrect;
              const showTimes = showResult && !isCorrect && isSelected;

              return (
                <Flex
                  key={answer.answer_id}
                  minH="20vh"
                  placeContent="center"
                  textAlign="center"
                  bg={
                    showResult
                      ? isSelected
                        ? "blue.300"
                        : "blue.100"
                      : "blue.300"
                  }
                  cursor="pointer"
                  onClick={() =>
                    handleAnswerClick(question.question_id, answer.answer_id)
                  }
                  _hover={{
                    transform: !showResult
                      ? "scale(103%)"
                      : isCorrect && "scale(103%)",
                  }}
                  transition="all 0.2s"
                  borderRadius="md"
                  position="relative"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Text fontSize="2xl" fontWeight="semibold" mb="2">
                    {answer.answer_text}
                  </Text>
                  {showCheck && (
                    <Box
                      position="absolute"
                      top="5"
                      right="5"
                      transform="translate(50%, -50%)"
                      color="green.600"
                      bg="whitesmoke"
                      rounded="3xl"
                    >
                      <FaCheckCircle size="24" />
                    </Box>
                  )}
                  {showTimes && (
                    <Box
                      position="absolute"
                      top="5"
                      right="5"
                      transform="translate(50%, -50%)"
                      color="red"
                      bg="whitesmoke"
                      rounded="3xl"
                    >
                      <FaTimesCircle size="24" />
                    </Box>
                  )}
                </Flex>
              );
            })}
          </Grid>
          {showResult && (
            <Box
              mt="4"
              p="4"
              bg="gray.100"
              color="green.800"
              borderRadius="md"
              display="grid"
            >
              {questions.map((question) => (
                <Stack
                  key={question.question_id}
                  direction="row"
                  gap="3"
                  placeItems="center"
                >
                  {selectedAnswers[question.question_id] ===
                  question.answers.find((answer) => answer.is_correct === 1)
                    .answer_id ? (
                    <Box color="green.600">
                      <FaCheckCircle size="24" bg="whitesmoke" rounded="3xl" />
                    </Box>
                  ) : (
                    <Box color="red">
                      <FaTimesCircle size="24" bg="whitesmoke" rounded="3xl" />
                    </Box>
                  )}
                  <Text fontSize="xl" as="b">
                    {selectedAnswers[question.question_id] ===
                    question.answers.find((answer) => answer.is_correct === 1)
                      .answer_id
                      ? "Correto"
                      : "Errado"}
                    !
                  </Text>
                </Stack>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Container>
  );
};

export default QuizEscolhido;
