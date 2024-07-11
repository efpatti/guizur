import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { useQuizContext } from "./QuizContext";

const QuizEscolhido = () => {
  const { quiz_id } = useParams();
  const { quizzes, pegarQuestoes } = useQuizContext();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsData = await pegarQuestoes(quiz_id);
        setQuestions(questionsData);
      } catch (error) {
        console.error(`Erro ao carregar questões do quiz ${quiz_id}:`, error);
      }
    };

    fetchQuestions();
  }, [quiz_id, pegarQuestoes]);

  const quizzesFiltered = quizzes.filter(
    (quiz) => quiz.quiz_id === parseInt(quiz_id)
  );

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
            <Text fontSize="xl">{question.question_text}</Text>
            <Box mt="2">
              {question.answers.map((answer) => (
                <Box key={answer.answer_id} ml="4">
                  <Text>{answer.answer_text}</Text>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default QuizEscolhido;
