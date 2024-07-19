import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useAuth } from "../../../Hooks/useAuth";

const Form = ({ aoEditarTipo, setAoEditarTipo }) => {
  const { addressBack } = useAuth();
  const ref = useRef();

  useEffect(() => {
    if (aoEditarTipo) {
      const tipo = ref.current;
      tipo.elements.name.value = aoEditarTipo.name;
      tipo.elements.code.value = aoEditarTipo.code;
    }
  }, [aoEditarTipo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulário enviado!");

    const tipo = ref.current;

    // Verifique se todos os campos estão preenchidos
    const campos = ["name", "code"];
    if (campos.some((campo) => !tipo.elements[campo].value)) {
      return toast.warn("Preencha todos os campos!");
    }

    const dadosCategoria = {
      name: tipo.elements.name.value,
      code: tipo.elements.code.value,
    };

    try {
      let response;

      if (aoEditarTipo) {
        // Se aoEditarTipo existe, faz um PUT para atualizar
        const url = `${addressBack}/types/${aoEditarTipo.idType}`;
        response = await axios.put(url, dadosCategoria);
        toast.success("Categoria atualizada com sucesso!");
      } else {
        // Caso contrário, faz um POST para adicionar uma nova tipo
        const url = `${addressBack}/types`;
        response = await axios.post(url, dadosCategoria);
        toast.success("Categoria adicionada com sucesso!");
      }

      console.log("Resposta da API:", response.data);

      // Limpa os campos do formulário
      tipo.reset();

      // Limpa o estado de aoEditarTipo
      setAoEditarTipo(null);
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
  aoEditarTipo: PropTypes.object,
  setAoEditarTipo: PropTypes.func.isRequired,
};

export default Form;
