import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Box,
  InputRightElement,
  InputGroup,
  IconButton,
  Flex,
  Text,
  Stack,
  Link,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import { useAuth } from "../../../Hooks/useAuth";
import ImageUpload from "../../Images/ImageUpload";

const Form = ({ pegarUsuarios, aoEditarUsuario, setAoEditarUsuario }) => {
  const { addressBack } = useAuth();
  const ref = useRef();
  const [resetAppear, setResetAppear] = useState(false);
  const [checkedCep, setCheckedCep] = useState(false);
  const [endereco, setEndereco] = useState({
    rua: "",
    cidade: "",
    estado: "",
  });
  const [cpfValido, setCpfValido] = useState(false);
  const [image, setImage] = useState(null);

  const handleCpfCheck = () => {
    const cpf = ref.current.cpf.value;
    setCpfValido(validarCPF(cpf));
  };

  useEffect(() => {
    if (aoEditarUsuario) {
      const usuario = ref.current;
      usuario.nome.value = aoEditarUsuario.nome;
      usuario.telefone.value = aoEditarUsuario.telefone;
      usuario.email.value = aoEditarUsuario.email;
      usuario.cpf.value = aoEditarUsuario.cpf;
      usuario.cep.value = aoEditarUsuario.cep;
      usuario.rua.value = aoEditarUsuario.rua;
      usuario.numeroCasa.value = aoEditarUsuario.numeroCasa;
      usuario.cidade.value = aoEditarUsuario.cidade;
      usuario.estado.value = aoEditarUsuario.estado;
      usuario.tipo.value = aoEditarUsuario.tipo;
      usuario.senha.value = aoEditarUsuario.senha;
    }
  }, [aoEditarUsuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulário enviado!");

    const usuario = ref.current;

    const campos = [
      "nome",
      "email",
      "telefone",
      "cpf",
      "cep",
      "rua",
      "numeroCasa",
      "cidade",
      "estado",
      "tipo",
      "senha",
    ];
    if (campos.some((campo) => !usuario[campo].value)) {
      return toast.warn("Preencha todos os campos!");
    }

    const dadosUsuario = {
      nome: usuario.nome.value,
      email: usuario.email.value,
      telefone: usuario.telefone.value,
      cpf: usuario.cpf.value,
      cep: usuario.cep.value,
      rua: usuario.rua.value,
      numeroCasa: usuario.numeroCasa.value,
      cidade: usuario.cidade.value,
      estado: usuario.estado.value,
      tipo: usuario.tipo.value,
      senha: usuario.senha.value,
    };

    try {
      // Envio dos dados do usuário
      const response = await axios.post(
        aoEditarUsuario
          ? `${addressBack}/usuarios/${aoEditarUsuario.idUsuario}`
          : `${addressBack}/usuarios`,
        dadosUsuario
      );
      console.log("Resposta:", response.data);
      toast.success(response.data);

      // Envio da imagem se existir
      if (image) {
        await axios.post(`${addressBack}/api/upload`, {
          imageData: image.data,
          mimeType: image.mimeType,
        });
        toast.success("Imagem enviada com sucesso!");
      }

      // Limpeza dos campos
      campos.forEach((campo) => (usuario[campo].value = ""));
      setAoEditarUsuario(null);
      pegarUsuarios();
      clearInputs();
    } catch (error) {
      console.error("Erro:", error.response.data);
      toast.error(error.response.data.message);
    }
  };

  const handleCheckCep = async () => {
    const cep = ref.current.cep.value;

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, localidade, uf } = response.data;
      setEndereco({
        rua: logradouro,
        cidade: localidade,
        estado: uf,
      });
      setCheckedCep(true);
    } catch (error) {
      toast.error("CEP não encontrado");
      console.error(error);
    }
  };

  const clearInputs = () => {
    document.getElementById("form").reset();
    setResetAppear(false);
    setCpfValido(false);
    setCheckedCep(false);
    setImage(null); // Limpar imagem após envio
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos
    setResetAppear(true);
    const cpfErro = () => {
      toast.warn("CPF inválido");
    };

    if (cpf === "") {
      cpfErro();
      return false;
    }

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      cpfErro();
      return false;
    }

    let add = 0;
    for (let i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) {
      cpfErro();
      return false;
    }

    add = 0;
    for (let i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) {
      cpfErro();
      return false;
    }

    return true;
  };

  return (
    <Box>
      <Flex
        position="fixed"
        top="20%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex="2"
        align="center"
        justify="center"
        p="5"
      >
        <Stack direction="row" gap="5" borderRadius="lg" mb="5">
          {resetAppear && (
            <Link as={Text} onClick={clearInputs} variant="none" fontSize="xl">
              Reset
            </Link>
          )}
        </Stack>
      </Flex>
      <form ref={ref} onSubmit={handleSubmit} id="form">
        <FormControl>
          <FormLabel>Nome</FormLabel>
          <Input name="nome" defaultValue="" />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input name="email" type="email" defaultValue="" />
        </FormControl>
        <FormControl>
          <FormLabel>Telefone</FormLabel>
          <Input name="telefone" type="phone" defaultValue="" />
        </FormControl>
        <FormControl>
          <FormLabel>Imagem</FormLabel>
          <ImageUpload onImageSelect={(image) => setImage(image)} />
        </FormControl>
        <FormControl>
          <FormLabel>CPF</FormLabel>
          <InputGroup>
            <Input
              name="cpf"
              defaultValue=""
              readOnly={cpfValido ? "readonly" : ""}
              cursor={cpfValido ? "not-allowed" : ""}
            />
            <InputRightElement>
              <IconButton
                as={Button}
                aria-label="Checar Cpf"
                icon={<FaCheck />}
                bg="transparent"
                variant="none"
                onClick={handleCpfCheck}
                _hover={{ opacity: "70%", bg: "transparent" }}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        {cpfValido && (
          <>
            <FormControl>
              <FormLabel>CEP</FormLabel>
              <InputGroup>
                <Input
                  name="cep"
                  type="text"
                  readOnly={checkedCep ? "readonly" : ""}
                  cursor={checkedCep ? "not-allowed" : ""}
                />
                <InputRightElement>
                  <IconButton
                    as={Button}
                    aria-label="Checar CEP"
                    icon={<FaCheck />}
                    onClick={handleCheckCep}
                    bg="transparent"
                    variant="none"
                    _hover={{ opacity: "70%", bg: "transparent" }}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {checkedCep && (
              <>
                <FormControl>
                  <FormLabel>Rua</FormLabel>
                  <Input
                    name="rua"
                    type="text"
                    defaultValue={endereco.rua}
                    readOnly="readonly"
                    cursor="not-allowed"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Número</FormLabel>
                  <Input name="numeroCasa" type="text" defaultValue="" />
                </FormControl>
                <FormControl>
                  <FormLabel>Cidade</FormLabel>
                  <Input
                    name="cidade"
                    type="text"
                    defaultValue={endereco.cidade}
                    readOnly="readonly"
                    cursor="not-allowed"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Estado</FormLabel>
                  <Input
                    name="estado"
                    type="text"
                    defaultValue={endereco.estado}
                    readOnly="readonly"
                    cursor="not-allowed"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Tipo</FormLabel>
                  <Select name="tipo" defaultValue="Usuário">
                    <option value="Usuário">Usuário</option>
                    <option value="Administrador">Administrador</option>
                  </Select>
                </FormControl>
                <FormControl mb="5">
                  <FormLabel>Senha</FormLabel>
                  <Input name="senha" type="password" defaultValue="" />
                </FormControl>
                <Button type="submit" variant="ghost">
                  Salvar
                </Button>
              </>
            )}
          </>
        )}
      </form>
    </Box>
  );
};

Form.propTypes = {
  pegarUsuarios: PropTypes.func.isRequired,
  aoEditarUsuario: PropTypes.object,
  setAoEditarUsuario: PropTypes.func.isRequired,
};

export default Form;
