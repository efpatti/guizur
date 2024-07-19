import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  useToast,
  Container,
  Stack,
} from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";
import { useAuth } from "../../../Hooks/useAuth";

const Grid = ({ tipos, setTipos, setAoEditarTipo }) => {
  const toast = useToast();
  const { addressBack } = useAuth();

  const handleEdit = (item) => {
    setAoEditarTipo(item);
  };

  const handleDelete = async (idType) => {
    try {
      await axios.delete(`${addressBack}/types/${idType}`);
      const newArray = tipos.filter((tipo) => tipo.idType !== idType);
      setTipos(newArray);
      toast({
        title: "Categoria excluída com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao deletar tipo!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="full">
      <Stack overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Code</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {tipos.map((item, i) => (
              <Tr key={i}>
                <Td>{item.name}</Td>
                <Td>{item.code}</Td>
                <Td>
                  <Icon
                    as={FaEdit}
                    onClick={() => handleEdit(item)}
                    cursor="pointer"
                    color="blue.500"
                  />
                </Td>
                <Td>
                  <Icon
                    as={FaTrash}
                    onClick={() => handleDelete(item.idType)}
                    cursor="pointer"
                    color="red.500"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>
    </Container>
  );
};

// Definindo PropTypes para validar as props
Grid.propTypes = {
  tipos: PropTypes.array.isRequired,
  setTipos: PropTypes.func.isRequired,
  setAoEditarTipo: PropTypes.func.isRequired,
};

export default Grid;
