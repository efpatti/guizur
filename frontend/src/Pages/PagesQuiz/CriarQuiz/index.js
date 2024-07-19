import { Stack } from "@chakra-ui/react";
import {
  HeadingText as Heading,
  TypesQuiz as Types,
  QuizzesDescription as QuizzesDesc,
} from "../SharedElements";

function CriarQuiz() {
  return (
    <Stack direction="column" w="50%" margin="auto">
      <Heading />
      <Types columns="4" />
      <QuizzesDesc />
    </Stack>
  );
}

export default CriarQuiz;
