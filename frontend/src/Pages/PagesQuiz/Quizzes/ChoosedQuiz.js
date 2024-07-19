import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Text, Grid, Container, Flex, Stack } from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../../Hooks/useAuth";
import { useQuizContext } from "../SharedElements/QuizContext"; // Importe useQuizContext se necessário

const QuizEscolhido = () => {
  const { quiz_id } = useParams();
  const { pegarQuestoes } = useQuizContext();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState({});
  const { addressBack } = useAuth();
  const [usuario, setUsuario] = useState(null); // Inicializa como null

  const pegarUsuarioPorId = async (userId) => {
    try {
      const res = await axios.get(`${addressBack}/usuarios/${userId}`);
      setUsuario(res.data);
    } catch (error) {
      toast.error("Erro ao carregar usuário");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseQuiz = await axios.get(
          `${addressBack}/quizzes/${quiz_id}`
        );
        const fetchedQuiz = responseQuiz.data[0];
        setQuiz(fetchedQuiz); // Define o quiz obtido

        // Verifica se o quiz foi obtido com sucesso e se tem author_id
        if (fetchedQuiz && fetchedQuiz.author_id) {
          await pegarUsuarioPorId(fetchedQuiz.author_id); // Busca o autor pelo author_id do quiz
        }

        const questionsData = await pegarQuestoes(quiz_id); // Obtém as questões do quiz
        const initialSelectedAnswers = {};
        const initialShowResults = {};
        questionsData.forEach((question) => {
          initialSelectedAnswers[question.question_id] = null;
          initialShowResults[question.question_id] = false; // Inicializa todos como false
        });
        setSelectedAnswers(initialSelectedAnswers);
        setShowResults(initialShowResults);
        setQuestions(questionsData);
      } catch (error) {
        console.error(`Erro ao carregar dados do quiz ${quiz_id}:`, error);
        toast.error("Erro ao carregar dados do quiz");
      }
    };

    fetchData();
  }, [quiz_id, addressBack, pegarQuestoes]); // Dependências: quiz_id, addressBack e pegarQuestoes

  const handleAnswerClick = (questionId, answerId) => {
    if (!showResults[questionId]) {
      const updatedSelectedAnswers = {
        ...selectedAnswers,
        [questionId]: answerId,
      };
      setSelectedAnswers(updatedSelectedAnswers);

      // Atualiza apenas o estado da questão clicada para mostrar o resultado
      setShowResults({
        ...showResults,
        [questionId]: true,
      });
    }
  };

  if (!quiz || !usuario) {
    return <div>Carregando...</div>;
  }

  return (
    <Container maxW="container.lg" centerContent>
      <Text fontSize="2xl" mb="4">
        {quiz.title}, por {usuario.nome}
      </Text>
      <Stack direction="column" w="full">
        {questions.map((question) => (
          <Box
            key={question.question_id}
            mb="4"
            rounded="md"
            boxShadow="md"
            w="90%"
            minH="30vh"
            alignContent="center"
            p="5"
          >
            <Text fontSize="xl" m="5">
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
                const showCheck =
                  showResults[question.question_id] && isCorrect;
                const showTimes =
                  showResults[question.question_id] && !isCorrect && isSelected;

                return (
                  <Flex
                    key={answer.answer_id}
                    minH="20vh"
                    placeContent="center"
                    textAlign="center"
                    bg={
                      showResults[question.question_id]
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
                      transform: !showResults[question.question_id]
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
            {showResults[question.question_id] && (
              <Box
                mt="4"
                p="4"
                bg="gray.100"
                color="green.800"
                borderRadius="md"
                display="grid"
              >
                {selectedAnswers[question.question_id] ===
                question.answers.find((answer) => answer.is_correct === 1)
                  .answer_id ? (
                  <Stack
                    key={question.question_id}
                    direction="row"
                    gap="3"
                    placeItems="center"
                  >
                    <Box color="green.600">
                      <FaCheckCircle size="24" bg="whitesmoke" rounded="3xl" />
                    </Box>
                    <Text fontSize="xl" as="b">
                      Correto!
                    </Text>
                  </Stack>
                ) : (
                  <Stack
                    key={question.question_id}
                    direction="row"
                    gap="3"
                    placeItems="center"
                  >
                    <Box color="red">
                      <FaTimesCircle size="24" bg="whitesmoke" rounded="3xl" />
                    </Box>
                    <Text fontSize="xl" as="b">
                      Errado!
                    </Text>
                  </Stack>
                )}
              </Box>
            )}
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default QuizEscolhido;
