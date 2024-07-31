import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Select,
  Text,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useAuth } from "../../../Hooks/useAuth";
import CreateQuestion from "./CreateQuestion";
import { useParams } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

function NovoQuiz() {
  const { addressBack, user } = useAuth();
  const [counter, setCounter] = useState(0);
  const ref = useRef();
  const { tipoEscolhido } = useParams();
  const [tipo, setTipo] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
  });

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();

    const newQuizData = {
      title: ref.current.title.value,
      description: ref.current.description.value,
      author_id: user.idUsuario,
      category: ref.current.category.value,
      type: tipoEscolhido,
    };

    try {
      const response = await axios.post(`${addressBack}/quizzes`, newQuizData);
      toast.success("Quiz criado com sucesso!");
      clearQuizInputs();
      setSelectedQuiz(response.data.quiz_id);
      setShowQuestionForm(true);
      setQuizData(newQuizData);
      setCounter(1); // Move to the next stage after creating quiz
    } catch (error) {
      console.error("Erro ao criar quiz:", error);
      toast.error(
        "Erro ao criar quiz. Verifique o console para mais detalhes."
      );
    }
  };

  const clearQuizInputs = () => {
    ref.current.title.value = "";
    ref.current.description.value = "";
  };

  const handleQuestionFormClose = () => {
    setShowQuestionForm(false);
  };

  const getTypeChoosed = () => {
    let chosenType = "";
    switch (tipoEscolhido) {
      case "right_or_wrong":
        chosenType = "Certo e Errado";
        break;
      case "personality":
        chosenType = "Personalidade";
        break;
      case "about_me":
        chosenType = "Sobre Mim";
        break;
      case "list":
        chosenType = "Lista";
        break;
      default:
        chosenType = "";
        break;
    }
    setTipo(chosenType);
  };

  useEffect(() => {
    getTypeChoosed();
  });

  const labelInput = {
    fontWeight: "light",
  };

  const btn = {
    rounded: "20rem",
    bg: "gray.50",
    fontWeight: "light",
    color: "gray.500",
    variant: "none",
    _hover: {
      bg: "",
    },
  };

  const FooterCreatingNewQuiz = () => {
    return (
      <Flex position="relative" justify="center">
        <Flex
          position="fixed"
          bottom="0"
          p={10}
          shadow="lg"
          w="100%"
          border="1px"
          justify="center"
          bg="white"
          zIndex={30}
        >
          <Stack
            direction="row"
            align="center"
            templateColumns="repeat(3, 1fr)"
            fontWeight="light"
            fontSize="lg"
            w="55%"
          >
            <Button
              sx={{
                ...btn,
                bg: counter === 0 ? "blue.500" : "gray.50",
                color: counter === 0 ? "white" : "gray.500",
                _active: counter !== 0 ? { bg: "" } : "",
              }}
              cursor={counter === 0 ? "pointer" : "default"}
            >
              Capa
            </Button>
            <Button
              sx={{
                ...btn,
                bg: counter === 1 ? "blue.500" : "gray.50",
                color: counter === 1 ? "white" : "gray.500",
                _active: counter !== 1 ? { bg: "" } : "",
              }}
              cursor={counter === 1 ? "pointer" : "default"}
            >
              Perguntas
            </Button>
            <Button
              sx={{
                ...btn,
                bg: counter === 2 ? "blue.500" : "gray.50",
                color: counter === 2 ? "white" : "gray.500",
                _active: counter !== 2 ? { bg: "" } : "",
              }}
              cursor={counter === 2 ? "pointer" : "default"}
            >
              Resultado
            </Button>
          </Stack>
          <Button onClick={handleSubmitQuiz}>Continuar</Button>
        </Flex>
      </Flex>
    );
  };

  return (
    <Box w="70%" margin="auto">
      <Stack direction="column" spacing={3} mb={3}>
        <Box>
          <Stack
            direction="row"
            align="center"
            templateColumns="repeat(5, 1fr)"
            fontWeight="light"
            fontSize="lg"
            w="55%"
          >
            <Text color="gray.600">Criar</Text>
            <MdKeyboardArrowRight style={{ color: "gray.500" }} />
            <Text color="gray.600">Quiz</Text>
            <MdKeyboardArrowRight style={{ color: "gray.500" }} />
            <Text color="blue.700" fontWeight="semibold">
              {tipo}
            </Text>
          </Stack>
        </Box>
        <Box fontSize="2xl" fontWeight="semibold">
          <Text>{counter === 0 ? "Capa do quiz" : "Perguntas do quiz"}</Text>
        </Box>
      </Stack>
      <Box w="50%" margin="auto">
        {counter === 0 && (
          <form ref={ref} onSubmit={handleSubmitQuiz} id="form-quiz">
            <FormControl>
              <FormLabel sx={labelInput}>Título</FormLabel>
              <Input name="title" type="text" defaultValue="" />
            </FormControl>
            <FormControl>
              <FormLabel sx={labelInput}>Descrição</FormLabel>
              <Input name="description" type="text" defaultValue="" />
            </FormControl>
            <FormControl mt={4}>
              <Select placeholder="Categoria" defaultValue="" name="category">
                <option>Futebol</option>
                <option>Basquete</option>
              </Select>
            </FormControl>
          </form>
        )}

        {counter === 1 && showQuestionForm && selectedQuiz && (
          <CreateQuestion
            quizId={selectedQuiz}
            quizTitle={quizData.title}
            onClose={handleQuestionFormClose}
          />
        )}
      </Box>
      <FooterCreatingNewQuiz />
    </Box>
  );
}

export default NovoQuiz;
