import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import NovoQuiz from "./NovoQuiz";
import MeusQuizzes from "./MeusQuizzes";

const Index = () => {
  return (
    <Stack
      direction="column"
      spacing={3}
      w="90%"
      margin="auto"
      textAlign="center"
    >
      {/* <Box mb={4}>
        <NovoQuiz />
      </Box> */}
      <Box>
        <MeusQuizzes />
      </Box>
    </Stack>
  );
};

export default Index;
