import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useAuth } from "../../../Hooks/useAuth";

const Form = ({ aoEditarCategoria, setAoEditarCategoria }) => {
  const { addressBack } = useAuth();
  const ref = useRef();

  useEffect(() => {
    if (aoEditarCategoria) {
      const categoria = ref.current;
      categoria.elements.name.value = aoEditarCategoria.name;
      categoria.elements.code.value = aoEditarCategoria.code;
    }
  }, [aoEditarCategoria]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulário enviado!");

    const categoria = ref.current;

    // Verifique se todos os campos estão preenchidos
    const campos = ["name", "code"];
    if (campos.some((campo) => !categoria.elements[campo].value)) {
      return toast.warn("Preencha todos os campos!");
    }

    const dadosCategoria = {
      name: categoria.elements.name.value,
      code: categoria.elements.code.value,
    };

    try {
      let response;

      if (aoEditarCategoria) {
        // Se aoEditarCategoria existe, faz um PUT para atualizar
        const url = `${addressBack}/categories/${aoEditarCategoria.idCategory}`;
        response = await axios.put(url, dadosCategoria);
        toast.success("Categoria atualizada com sucesso!");
      } else {
        // Caso contrário, faz um POST para adicionar uma nova categoria
        const url = `${addressBack}/categories`;
        response = await axios.post(url, dadosCategoria);
        toast.success("Categoria adicionada com sucesso!");
      }

      console.log("Resposta da API:", response.data);

      // Limpa os campos do formulário
      categoria.reset();

      // Limpa o estado de aoEditarCategoria
      setAoEditarCategoria(null);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast.error(error.response.data.message || "Erro desconhecido");
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

Form.propTypes = {
  aoEditarCategoria: PropTypes.object,
  setAoEditarCategoria: PropTypes.func.isRequired,
};

export default Form;
