import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../Hooks/useAuth";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quiz, setQuiz] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [tipos, setTipos] = useState([]);
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
    const pegarCategorias = async () => {
      try {
        const res = await axios.get(`${addressBack}/categories`);
        setCategorias(res.data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };
    const pegarTipos = async () => {
      try {
        const res = await axios.get(`${addressBack}/types`);
        setTipos(res.data);
      } catch (error) {
        console.error("Erro ao carregar tipos:", error);
      }
    };

    pegarQuizzes();
    pegarCategorias();
    pegarTipos();
  }, []); // Executa apenas uma vez ao montar o contexto

  const pegarQuestoes = async (quiz_id) => {
    try {
      const res = await axios.get(
        `${addressBack}/quizzes/${quiz_id}/questions`
      );
      return res.data;
    } catch (error) {
      if (error.response) {
        // O servidor retornou um status de erro específico (por exemplo, 404)
        console.error(
          `Erro ${error.response.status} ao carregar questões do quiz ${quiz_id}:`,
          error.response.data
        );
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta do servidor
        console.error("Erro na requisição:", error.request);
      } else {
        // Algum outro erro ocorreu
        console.error("Erro ao processar requisição:", error.message);
      }
      // Retorna um array vazio em caso de erro
      return [];
    }
  };

  return (
    <QuizContext.Provider
      value={{
        quiz,
        setQuiz,
        quizzes,
        pegarQuestoes,
        setCategorias,
        categorias,
        tipos,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);
