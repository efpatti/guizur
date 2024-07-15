import React, { useRef, useState } from "react";
import axios from "axios";
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useAuth } from "../../Hooks/useAuth";
import CreateQuestion from "./CreateQuestion";

const Index = () => {
  const { addressBack, user } = useAuth();
  const ref = useRef();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [quizData, setQuizData] = useState({ title: "", description: "" });

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();

    const newQuizData = {
      title: ref.current.title.value,
      description: ref.current.description.value,
    };

    try {
      const response = await axios.post(`${addressBack}/quizzes`, newQuizData);
      toast.success("Quiz criado com sucesso!");
      clearQuizInputs();
      setSelectedQuiz(response.data.quiz_id);
      setShowQuestionForm(true);

      // Store quiz data in state after successful creation
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
    <Box>
      <form ref={ref} onSubmit={handleSubmitQuiz} id="form-quiz">
        <h1>{user.idUsuario}</h1>
        <FormControl>
          <FormLabel>Título do Quiz</FormLabel>
          <Input name="title" type="text" defaultValue="" />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Descrição do Quiz</FormLabel>
          <Input name="description" type="text" defaultValue="" />
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
};

export default Index;
