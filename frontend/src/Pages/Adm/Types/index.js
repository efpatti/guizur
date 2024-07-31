import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Stack, Heading } from "@chakra-ui/react";
import Form from "./Form";
import Grid from "./Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../Hooks/useAuth";

const Dashboard = () => {
  const { addressBack } = useAuth();

  const [tipos, setTipos] = useState([]);
  const [aoEditarTipo, setAoEditarTipo] = useState(null);
  const pegarTipos = async () => {
    try {
      const res = await axios.get(`${addressBack}/types`);
      setTipos(res.data.sort((a, b) => (a.idTypes > b.idTypes ? 1 : -1)));
    } catch (error) {
      toast.error("Erro ao carregar tipos");
    }
  };
  useEffect(() => {
    document.title = "Guizur | Tipos";
    pegarTipos(); // Chamada inicial para carregar tipos
  }); // Array vazio indica que useEffect será executado apenas uma vez após a montagem do componente

  return (
    <>
      <Container
        mt={50}
        maxW="800px"
        minH="50vh"
        textAlign="center"
        paddingY="7rem"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading as="h2">Tipos</Heading>
        <Stack direction="column" gap="2rem">
          <Form
            aoEditarTipo={aoEditarTipo}
            setAoEditarTipo={setAoEditarTipo}
            pegarTipos={pegarTipos}
          />
          <Grid
            tipos={tipos}
            setTipos={setTipos}
            setAoEditarTipo={setAoEditarTipo}
          />
        </Stack>
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
};

export default Dashboard;
