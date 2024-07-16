import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useAuth } from "../../Hooks/useAuth";
import CreateQuestion from "./CreateQuestion";

const Index = () => {
  return (
    <Box w="70%" margin="auto" textAlign="center">
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Novo Quiz</Tab>
          <Tab>Meus Quizzes</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <NovoQuiz />
          </TabPanel>
          <TabPanel>
            <MeusQuizzes />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
const MeusQuizzes = () => {
  const { addressBack, user } = useAuth();
  const [meusQuizzes, setMeusQuizzes] = useState([]);

  useEffect(() => {
    const fetchMeusQuizzes = async () => {
      try {
        const response = await axios.get(`${addressBack}/quizzes/autor`, {
          params: {
            author_id: user.idUsuario,
          },
        });
        setMeusQuizzes(response.data);
      } catch (error) {
        console.error("Erro ao buscar quizzes do usuário:", error);
        toast.error("Erro ao carregar seus quizzes. Verifique o console.");
      }
    };

    fetchMeusQuizzes();
  }, [addressBack, user.idUsuario]);

  return (
    <Box>
      {meusQuizzes.map((quiz) => (
        <Box key={quiz.quiz_id} mt={4} p={4} borderWidth="1px" rounded="md">
          <Box fontWeight="semibold">{quiz.title}</Box>
          <Box>{quiz.description}</Box>
          {/* Aqui você pode adicionar mais detalhes do quiz, se necessário */}
        </Box>
      ))}
    </Box>
  );
};

function NovoQuiz() {
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
      author_id: user.idUsuario,
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
    <Box w="50%" margin="auto">
      <form ref={ref} onSubmit={handleSubmitQuiz} id="form-quiz">
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
}

export default Index;
