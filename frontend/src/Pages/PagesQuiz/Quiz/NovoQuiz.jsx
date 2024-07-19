import React, { useRef, useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Select,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useAuth } from "../../../Hooks/useAuth";
import CreateQuestion from "./CreateQuestion";
import { useParams } from "react-router-dom";

function NovoQuiz() {
  const { addressBack, user } = useAuth();
  const ref = useRef();
  const { tipoEscolhido } = useParams(); // Captura o parâmetro tipo-escolhido da URL
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
      type: tipoEscolhido, // Usa o tipo capturado da URL
    };

    try {
      const response = await axios.post(`${addressBack}/quizzes`, newQuizData);
      toast.success("Quiz criado com sucesso!");
      clearQuizInputs();
      setSelectedQuiz(response.data.quiz_id);
      setShowQuestionForm(true);

      // Armazena os dados do quiz no estado após a criação bem-sucedida
      setQuizData(newQuizData);
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

  return (
    <Box w="50%" margin="auto">
      <form ref={ref} onSubmit={handleSubmitQuiz} id="form-quiz">
        <FormControl>
          <FormLabel>Título do Quiz</FormLabel>
          <Input name="title" type="text" defaultValue="" />
        </FormControl>
        <FormControl>
          <FormLabel>Descrição do Quiz</FormLabel>
          <Input name="description" type="text" defaultValue="" />
        </FormControl>
        <FormControl mt={4}>
          <Select placeholder="Categoria" defaultValue="" name="category">
            <option>Futebol</option>
            <option>Basquete</option>
          </Select>
        </FormControl>
        <Button type="submit" mt={4} colorScheme="blue">
          Criar Quiz
        </Button>
      </form>
      {showQuestionForm && selectedQuiz && (
        <CreateQuestion
          quizId={selectedQuiz}
          quizTitle={quizData.title}
          onClose={handleQuestionFormClose}
        />
      )}
    </Box>
  );
}

export default NovoQuiz;
