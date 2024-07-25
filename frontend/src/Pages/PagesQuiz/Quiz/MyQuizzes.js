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
  SimpleGrid,
  IconButton,
  InputRightElement,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useAuth } from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";
import {
  CiHeart as Heart,
  CiBookmark as Save,
  CiHome as Home,
} from "react-icons/ci";
import { HiBars3BottomLeft as Filter } from "react-icons/hi2";
import { FaSearch as Search, FaWindowClose as Close } from "react-icons/fa";
import { TypesQuiz as Types, HeadingText as Heading } from "../SharedElements";

function MyQuizzes() {
  const { addressBack, user } = useAuth();
  const [meusQuizzes, setMeusQuizzes] = useState([]);
  const [selectedButton, setSelectedButton] = useState("Meus conteúdos");

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
    borderBottom: "1px solid #CBD5E0",
    paddingBottom: "2px",
  };

  const handleButtonClick = (label) => {
    setSelectedButton(label);
  };

  const homeSelected = selectedButton === "Meus conteúdos";
  const saveSelected = selectedButton === "Salvos";
  const heartSelected = selectedButton === "Curtidos";
  const typesFilter = [
    { type: "Rascunho" },
    { type: "Certo ou errado" },
    { type: "Personalidade" },
    { type: "Lista" },
  ];

  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const filteredMeusQuizzes = meusQuizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box w="60%" margin="auto">
      <Heading />
      <Types columns="3" />
      <Stack direction="column" spacing={4} mt={3}>
        <Stack direction="row" spacing={3} w="40%">
          <Button
            onClick={() => handleButtonClick("Meus conteúdos")}
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
            <Home size="15px" />
            <Text fontSize="xs" ml={1}>
              Meus conteúdos
            </Text>
          </Button>
          <Button
            onClick={() => handleButtonClick("Salvos")}
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
            <Save size="15px" />
            <Text fontSize="xs" ml={1}>
              Salvos
            </Text>
          </Button>
          <Button
            onClick={() => handleButtonClick("Curtidos")}
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
            <Heart size="15px" />
            <Text fontSize="xs" ml={1}>
              Curtidos
            </Text>
          </Button>
        </Stack>
        <Grid templateColumns="repeat(2, 1fr)" gap={3} w="50%">
          <Box>
            <Stack direction="row" align="center">
              <Filter size="20px" />
              <Select
                placeholder="Filtrar por tipo"
                size="sm"
                sx={placeholderStyled}
              >
                <option>Todos</option>
                {typesFilter.map((item, i) => (
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
          as={SimpleGrid}
          columns="3"
          spacing={10}
          bg="blackAlpha.50"
          rounded="xl"
          alignItems="center"
          justifyContent="center"
          transition="all 0.2s"
          onFocus={handleFocus}
          onBlur={handleBlur}
          _focus={{ outline: "none" }}
          p={3}
        >
          <InputLeftElement h="full">
            <IconButton
              size="sm"
              variant="none"
              icon={<Search size="10px" />}
              color="gray.400"
              _hover={{ opacity: "70%" }}
              _focus={{ outline: "none" }}
              aria-label="Search"
            />
          </InputLeftElement>
          <Input
            id="customInput"
            type="text"
            placeholder="Pesquise um quiz"
            variant="unstyled"
            size="sm"
            value={searchQuery}
            onChange={handleInputChange}
          />
          {isFocused && (
            <InputRightElement h="full">
              <IconButton
                variant="none"
                size="sm"
                color="gray.400"
                _hover={{ opacity: "70%" }}
                _focus={{ outline: "none" }}
                aria-label="Clear"
                onClick={clearSearch}
                icon={<Close />}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </Stack>
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        {homeSelected &&
          filteredMeusQuizzes.map((quiz) => (
            <Link
              as={Box}
              key={quiz.quiz_id}
              to={`/meu-quiz-escolhido/${quiz.quiz_id}`}
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb="10rem"
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

export default MyQuizzes;
