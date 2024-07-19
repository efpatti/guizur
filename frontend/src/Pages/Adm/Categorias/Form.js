import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useAuth } from "../../../Hooks/useAuth";

const Form = ({ pegarCategorias, aoEditarCategoria, setAoEditarCategoria }) => {
  const { addressBack } = useAuth();
  const ref = useRef();

  useEffect(() => {
    if (aoEditarCategoria) {
      const categoria = ref.current;
      categoria.name.value = aoEditarCategoria.name;
      categoria.code.value = aoEditarCategoria.code;
    }
  }, [aoEditarCategoria]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulário enviado!");

    const categoria = ref.current;

    // Verifique se todos os campos estão preenchidos
    const campos = ["name", "code"];
    if (campos.some((campo) => !categoria[campo].value)) {
      return toast.warn("Preencha todos os campos!");
    }

    const dadosCategoria = {
      name: categoria.name.value,
      code: categoria.code.value,
    };

    try {
      const response = await axios.post(
        aoEditarCategoria
          ? `${addressBack}/categories/${aoEditarCategoria.idCategory}`
          : `${addressBack}/categories`,
        dadosCategoria
      );
      console.log("Resposta:", response.data);
      toast.success(response.data);
      campos.forEach((campo) => (categoria[campo].value = ""));
      setAoEditarCategoria(null);
      pegarCategorias();
    } catch (error) {
      console.error("Erro:", error.response.data);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Box>
      <form ref={ref} onSubmit={handleSubmit} id="form">
        <FormControl>
          <FormLabel>Nome</FormLabel>
          <Input name="name" defaultValue="" />
        </FormControl>
        <FormControl>
          <FormLabel>Code</FormLabel>
          <Input name="code" type="text" defaultValue="" />
        </FormControl>
        <Button type="submit" variant="ghost">
          Salvar
        </Button>
      </form>
    </Box>
  );
};

// Definindo PropTypes para validar as props
Form.propTypes = {
  pegarCategorias: PropTypes.func.isRequired,
  aoEditarCategoria: PropTypes.object,
  setAoEditarCategoria: PropTypes.func.isRequired,
};

export default Form;
