import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Stack,
  Checkbox,
  Textarea,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useAuth } from "../../Hooks/useAuth";

const CreateQuestion = ({ quizId }) => {
  const { addressBack } = useAuth();
  const [questionText, setQuestionText] = useState("");
  const [alternatives, setAlternatives] = useState([
    { answer_text: "", is_correct: false },
    { answer_text: "", is_correct: false },
    { answer_text: "", is_correct: false },
    { answer_text: "", is_correct: false },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se pelo menos uma alternativa está marcada como correta
    if (!alternatives.some((alt) => alt.is_correct)) {
      toast.error("É necessário definir uma resposta correta.");
      return;
    }

    try {
      const questionData = {
        quiz_id: quizId,
        question_text: questionText,
        alternatives: alternatives,
      };

      const response = await axios.post(
        `${addressBack}/quizzes/questions`,
        questionData
      );

      toast.success("Questão criada com sucesso!");
      clearInputs();
    } catch (error) {
      console.error("Erro ao criar questão:", error);
      toast.error(
        "Erro ao criar questão. Verifique o console para mais detalhes."
      );
    }
  };

  const handleAlternativeChange = (index, e) => {
    const updatedAlternatives = [...alternatives];
    updatedAlternatives[index].answer_text = e.target.value;
    setAlternatives(updatedAlternatives);
  };

  const handleCheckboxChange = (index) => {
    const updatedAlternatives = [...alternatives];
    updatedAlternatives.forEach((alt, i) => {
      alt.is_correct = index === i;
    });
    setAlternatives(updatedAlternatives);
  };

  const clearInputs = () => {
    setQuestionText("");
    setAlternatives([
      { answer_text: "", is_correct: false },
      { answer_text: "", is_correct: false },
      { answer_text: "", is_correct: false },
      { answer_text: "", is_correct: false },
    ]);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Texto da Questão</FormLabel>
          <Textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </FormControl>

        <Stack spacing={4} mt={4}>
          {alternatives.map((alternative, index) => (
            <FormControl key={index}>
              <FormLabel>
                Alternativa {String.fromCharCode(97 + index).toUpperCase()}
              </FormLabel>
              <Input
                value={alternative.answer_text}
                onChange={(e) => handleAlternativeChange(index, e)}
              />
              <Checkbox
                isChecked={alternative.is_correct}
                onChange={() => handleCheckboxChange(index)}
              >
                Resposta Correta
              </Checkbox>
            </FormControl>
          ))}
        </Stack>

        <Button type="submit" mt={4} colorScheme="blue">
          Criar Questão
        </Button>
      </form>
    </Box>
  );
};

export default CreateQuestion;
