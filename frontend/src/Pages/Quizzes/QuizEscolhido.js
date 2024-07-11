import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  IconButton,
  Stack,
  Text,
  Button,
  Checkbox,
  Grid,
} from "@chakra-ui/react";
import { useQuizContext } from "./QuizContext";
import { FaCheckCircle } from "react-icons/fa";

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
        // Inicializa o estado de respostas selecionadas para cada pergunta
        const initialSelectedAnswers = {};
        questionsData.forEach((question) => {
          initialSelectedAnswers[question.question_id] = null; // null indica que nenhuma resposta está selecionada inicialmente
        });
        setSelectedAnswers(initialSelectedAnswers);
        setQuestions(questionsData);
      } catch (error) {
        console.error(`Erro ao carregar questões do quiz ${quiz_id}:`, error);
      }
    };

    fetchQuestions();
  }, [quiz_id, pegarQuestoes]);

  const checkAnswer = () => {
    setShowResult(true);
  };

  const quizzesFiltered = quizzes.filter(
    (quiz) => quiz.quiz_id === parseInt(quiz_id)
  );

  const correctAnswer = {
    bg: "green",
    color: "white",
  };

  return (
    <Box p="4" borderWidth="1px" borderRadius="md" shadow="md">
      {quizzesFiltered.map((quiz) => (
        <Text key={quiz.quiz_id} fontSize="2xl">
          Quiz Escolhido: {quiz.title}
        </Text>
      ))}
      <Box mt="4">
        {questions.map((question) => (
          <Box
            key={question.question_id}
            p="4"
            borderWidth="1px"
            borderRadius="md"
            shadow="md"
          >
            <Text fontSize="xl" textAlign="center">
              {question.question_text}
            </Text>
            <Grid
              mt="2"
              placeContent="center"
              placeItems="center"
              templateColumns="repeat(2, 1fr)"
              gap="10"
            >
              {question.answers.map((answer) => (
                <Grid
                  key={answer.answer_id}
                  ml="4"
                  placeItems="center"
                  spacing="4"
                  templateColumns="repeat(2, 1fr)"
                  minH="50px"
                >
                  <Checkbox
                    isChecked={
                      selectedAnswers[question.question_id] === answer.answer_id
                    }
                    onChange={(e) =>
                      setSelectedAnswers({
                        ...selectedAnswers,
                        [question.question_id]: answer.answer_id,
                      })
                    }
                  />
                  <Text>{answer.answer_text}</Text>
                </Grid>
              ))}
            </Grid>
            {showResult && (
              <Box
                mt="4"
                p="2"
                bg={correctAnswer.bg}
                color={correctAnswer.color}
              >
                Resposta correta:{" "}
                {
                  question.answers.find((answer) => answer.is_correct === 1)
                    .answer_text
                }
              </Box>
            )}
          </Box>
        ))}
        <Button mt="4" onClick={checkAnswer}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default QuizEscolhido;
