import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../Hooks/useAuth";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quiz, setQuiz] = useState(null); // Estado para armazenar o quiz selecionado
  const [quizzes, setQuizzes] = useState([]); // Estado para armazenar a lista de quizzes
  const { addressBack } = useAuth();

  useEffect(() => {
    const pegarQuizzes = async () => {
      try {
        const res = await axios.get(`${addressBack}/quizzes`);
        setQuizzes(res.data);
      } catch (error) {
        console.error("Erro ao carregar quizzes:", error);
      }
    };

    pegarQuizzes();
  }, []); // Executa apenas uma vez ao montar o contexto

  const pegarQuestoes = async (quiz_id) => {
    try {
      const res = await axios.get(
        `${addressBack}/quizzes/${quiz_id}/questions`
      );
      return res.data;
    } catch (error) {
      console.error(`Erro ao carregar questões do quiz ${quiz_id}:`, error);
      return []; // Retorna um array vazio em caso de erro
    }
  };

  return (
    <QuizContext.Provider value={{ quiz, setQuiz, quizzes, pegarQuestoes }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);
