import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../Hooks/useAuth";
import { Box, Text } from "@chakra-ui/react";
import CreateQuestion from "./CreateQuestion"; // Importe o componente CreateQuestion aqui

function MeuQuizEscolhido() {
  const { addressBack } = useAuth();
  const { quiz_id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await axios.get(`${addressBack}/quizzes/${quiz_id}`);
        setQuiz(response.data[0]); // Como quiz_id é único, assumimos que há apenas um quiz retornado
      } catch (error) {
        console.error("Erro ao buscar detalhes do quiz:", error);
      }
    };

    fetchQuizDetails();
  }, [quiz_id, addressBack]);

  if (!quiz) {
    return <div>Carregando...</div>;
  }

  console.log(quiz);

  return (
    <Box>
      <Text>{quiz.title}</Text>
      <Text>{quiz.description}</Text>

      {/* Componente CreateQuestion integrado aqui */}
      <CreateQuestion quizId={quiz.quiz_id} />

      {/* Aqui você pode adicionar mais detalhes do quiz */}
    </Box>
  );
}

export default MeuQuizEscolhido;
