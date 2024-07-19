import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Stack, Heading } from "@chakra-ui/react";
import Form from "./Form";
import Grid from "./Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../Hooks/useAuth";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Guizur | Categorias";
  }, []);

  const [categorias, setCategorias] = useState([]);
  const [aoEditarCategoria, setAoEditarCategoria] = useState(null);
  const { addressBack } = useAuth();

  const pegarCategorias = async () => {
    try {
      const res = await axios.get(`${addressBack}/categories`);
      setCategorias(
        res.data.sort((a, b) => (a.idCategory > b.idCategory ? 1 : -1))
      );
    } catch (error) {
      toast.error("Erro ao carregar categorias");
    }
  };

  useEffect(() => {
    pegarCategorias();
  }, []);

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
        <Heading as="h2">Categorias</Heading>
        <Stack direction="column" gap="2rem">
          <Form
            aoEditarCategoria={aoEditarCategoria}
            setAoEditarCategoria={setAoEditarCategoria}
            pegarCategorias={pegarCategorias}
          />
          <Grid
            categorias={categorias}
            setCategorias={setCategorias}
            setAoEditarCategoria={setAoEditarCategoria}
          />
        </Stack>
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
};

export default Dashboard;
