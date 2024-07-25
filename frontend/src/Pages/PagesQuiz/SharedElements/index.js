import React from "react";
import {
  Grid,
  Text,
  Box,
  Stack,
  Button,
  Link,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import {
  FaClover as Clover,
  FaPerson as Person,
  FaPersonWalkingArrowLoopLeft as About,
  FaList as List,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useQuizContext } from "./QuizContext";
function TypesQuiz({ columns }) {
  const { tipos } = useQuizContext();

  const navigate = useNavigate();

  return (
    <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={4} p={5} mb={7}>
      {tipos.map((item, i) => (
        <Box
          key={i}
          bg={item.color_bg_main}
          p={5}
          rounded="xl"
          boxShadow="md"
          onClick={() => navigate(`/studio/create/${item.code}`)}
          cursor="pointer"
        >
          <Stack direction="row">
            <Box>
              <Button
                bg={item.color_bg_icon}
                size="sm"
                rounded="3xl"
                color={item.color_icon}
                variant="none"
                cursor=""
              >
                {React.createElement(
                  item.icon === "Clover"
                    ? Clover
                    : item.icon === "Person"
                    ? Person
                    : item.icon === "About"
                    ? About
                    : List
                )}
              </Button>
            </Box>
            <Box textAlign="start">
              <Text fontWeight="semibold">{item.name}</Text>
              <Text fontSize="sm" fontWeight="light">
                {item.desc}
              </Text>
            </Box>
          </Stack>
        </Box>
      ))}
    </Grid>
  );
}

function HeadingText() {
  return (
    <Stack direction="column" spacing={1} textAlign="start" mb={3} p={4}>
      <Text fontWeight="semibold" fontSize="xl">
        Quer criar um quiz? É muito fácil!
      </Text>
      <Text fontWeight="light" fontSize="sm">
        Para começar a criar o seu quiz, teste de personalidade ou lista, basta
        clicar no respectivo botão abaixo e começar agora mesmo.
      </Text>
      <Text fontSize="lg" fontWeight="semibold">
        É grátis, rápido e muito fácil.
      </Text>
    </Stack>
  );
}

function QuizzesDescription() {
  const quizzesDesc = [
    {
      title: "Quiz de Certo e Errado",
      desc: "Este é o tipo de quiz em que o objetivo é acertar todas as respostas corretas. Este tipo de teste é muito utilizado para medir os seus conhecimentos sobre um determinado assunto. É o preferido daqueles fãs que querem desafiar os amigos para ver quem conhece mais sobre um certo tópico. Além disso, muitos professores criam este tipo de teste interativo como um quiz educativo para medir os conhecimentos de seus alunos. Também é conhecido como quiz de perguntas e respostas. Alguns exemplos:",
      links: [
        {
          title: "Você conhece as bandeiras dos estados brasileiros?",
          href: "#",
        },
        {
          title: "Você conhece o Guizika?",
          href: "#",
        },
        {
          title: "Você conhece o Santos?",
        },
      ],
    },
    {
      title: "Quiz de Personalidade",
      desc: "Este é um tipo de teste em que você responde algumas perguntas e de acordo com as suas resposta o quiz vai lhe dar o resultado que é mais compatível com a sua personalidade. Este não é um quiz utilizado para medir os seus conhecimentos e sim para dizer o com qual resultado você é mais compatível. Se você pretende criar um quiz com um título semelhante a estes: *Quem você seria em ____?*, *Que tipo de____ você é?*, *Qual ____ mais combina com você?*, *Será que adivinhamos?* então este é o tipo de quiz que você deve criar! Alguns exemplos:",
      links: [
        {
          title: "Quem você seria em um filme de terror?",
          href: "#",
        },
        {
          title: "Quem você seria em Bob Esponja?",
          href: "#",
        },
        {
          title: "Qual membro do BTS seria seu namorado?",
          href: "#",
        },
      ],
    },
    {
      title: "Lista",
      desc: "Este é o estilo de conteúdo mais tradicional do Quizur. Muito semelhante a um post em um blog uma lista é um artigo organizado em formato de lista. Muito comumente nossos criadores escrevem listas com títulos como *Top 10 melhores _____*, *Os 15 maiores _____*, *10 fatos sobre ______ que você nem imagina*. Alguns exemplos:",
      links: [
        {
          title:
            "Top 9: escritores que odiaram as adaptações cinematográficas de seus livros",
          href: "#",
        },
        {
          title: "Top 10 maiores times de futebol",
          href: "#",
        },
        {
          title: "Top 10 jogos da atualidade",
          href: "#",
        },
      ],
    },
  ];
  return (
    <Stack direction="column" spacing={5} mb={7} p={3}>
      {quizzesDesc.map((item, i) => (
        <Stack key={i} direction="column" textAlign="justify" spacing="1">
          <Text fontSize="lg" fontWeight="semibold">
            {item.title}
          </Text>
          <Text fontSize="md" color="gray.600" fontWeight="light">
            {item.desc}
          </Text>
          <UnorderedList>
            {item.links.map((link, index) => (
              <ListItem
                key={index}
                fontSize="sm"
                fontWeight="light"
                color="blue.600"
              >
                <Link href={link.href}>{link.title}</Link>
              </ListItem>
            ))}
          </UnorderedList>
        </Stack>
      ))}
    </Stack>
  );
}

export { TypesQuiz, HeadingText, QuizzesDescription };
