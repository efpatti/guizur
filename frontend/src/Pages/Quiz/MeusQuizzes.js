import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Grid,
  Text,
  Select,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useAuth } from "../../Hooks/useAuth";
import { Link } from "react-router-dom";
import {
  CiHeart as Heart,
  CiBookmark as Save,
  CiHome as Home,
} from "react-icons/ci";
import { HiBars3BottomLeft as Filter } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";

function MeusQuizzes() {
  const { addressBack, user } = useAuth();
  const [meusQuizzes, setMeusQuizzes] = useState([]);
  const [selectedButton, setSelectedButton] = useState("Meus conteúdos"); // Estado para controlar o botão selecionado

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

  const btnDefault = {
    fontWeight: "300",
    color: "gray.500",
  };
  const btnSelected = {
    fontWeight: "semibold",
    color: "blue.500",
  };

  const placeholderStyled = {
    color: "gray.600",
    fontWeight: "light",
  };

  const handleButtonClick = (label) => {
    setSelectedButton(label); // Define o botão clicado como selecionado
  };

  const homeSelected = selectedButton === "Meus conteúdos" ? true : false;
  const saveSelected = selectedButton === "Salvos" ? true : false;
  const heartSelected = selectedButton === "Curtidos" ? true : false;
  const types = [
    {
      type: "Rascunho",
    },
    {
      type: "Certo ou errado",
    },
    {
      type: "Personalidade",
    },
    {
      type: "Lista",
    },
  ];

  return (
    <Box w="50%" margin="auto">
      <Stack direction="column" spacing={4}>
        <Grid templateColumns="repeat(3, 1fr)" gap={3} w="60%">
          <Button
            onClick={() => handleButtonClick("Meus conteúdos")}
            p="3"
            key="Meus conteúdos"
            rounded="2xl"
            variant="none"
            border="1px"
            borderColor={!homeSelected && "gray.200"}
            bg={homeSelected && "blue.50"}
            sx={{
              ...btnDefault,
              ...(homeSelected && btnSelected),
            }}
          >
            <Home size="20px" />
            <Text fontSize="sm" ml={2}>
              Meus conteúdos
            </Text>
          </Button>
          <Button
            onClick={() => handleButtonClick("Salvos")}
            p="3"
            key="Salvos"
            rounded="2xl"
            variant="none"
            border="1px"
            borderColor={!saveSelected && "gray.200"}
            bg={saveSelected && "blue.50"}
            sx={{
              ...btnDefault,
              ...(saveSelected && btnSelected),
            }}
          >
            <Save size="20px" />
            <Text fontSize="sm" ml={2}>
              Salvos
            </Text>
          </Button>
          <Button
            onClick={() => handleButtonClick("Curtidos")}
            p="3"
            key="Curtidos"
            rounded="2xl"
            variant="none"
            border="1px"
            borderColor={!heartSelected && "gray.200"}
            bg={heartSelected && "blue.50"}
            sx={{
              ...btnDefault,
              ...(heartSelected && btnSelected),
            }}
          >
            <Heart size="20px" />
            <Text fontSize="sm" ml={2}>
              Curtidos
            </Text>
          </Button>
        </Grid>
        <Grid templateColumns="repeat(2, 1fr)" gap="3px" w="50%">
          <Box>
            <Stack direction="row" align="center">
              <Filter size="20px" />
              <Select
                placeholder="Filtrar por tipo"
                size="sm"
                sx={placeholderStyled}
              >
                <option>Todos</option>
                {types.map((item, i) => (
                  <option key={i}>{item.type}</option>
                ))}
              </Select>
            </Stack>
          </Box>
          <Select
            placeholder="Filtre por visibilidade"
            size="sm"
            sx={placeholderStyled}
          >
            <option>1</option>
            <option>2</option>
          </Select>
        </Grid>
        <InputGroup
          bg="blackAlpha.50"
          rounded="xl"
          alignItems="center" // Alinha verticalmente os itens dentro do InputGroup
          justifyContent="center" // Centraliza os itens horizontalmente
        >
          <InputLeftElement
            pointerEvents="none"
            children={<FaSearch />}
            rounded="xl"
            h="full"
            color="gray.400"
            display="flex"
            alignItems="center" // Alinha o ícone verticalmente ao centro
            justifyContent="center" // Centraliza o ícone horizontalmente
          />
          {/* Adicionando um Box com largura definida para criar o espaço */}
          <Box width="2rem" />
          <Input variant="unstyled" placeholder="Procurar conteúdo" p={3} />
        </InputGroup>
      </Stack>
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        {homeSelected &&
          meusQuizzes.map((quiz) => (
            <Link
              as={Box}
              key={quiz.quiz_id}
              to={`/meu-quiz-escolhido/${quiz.quiz_id}`}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                key={quiz.quiz_id}
                mt={4}
                p={4}
                borderWidth="1px"
                rounded="md"
                h="8rem"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                textAlign="center"
              >
                <Box fontWeight="semibold">{quiz.title}</Box>
                <Box>{quiz.description}</Box>
              </Box>
            </Link>
          ))}
      </Grid>
    </Box>
  );
}

export default MeusQuizzes;
