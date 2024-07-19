import { Box, Grid, Link, Text } from "@chakra-ui/react";
function Adm() {
  return (
    <Box justify="center" align="center" mb={3}>
      <Text>Página ADM TOP</Text>
      <Grid
        templateColumns="repeat(3, 1fr)"
        placeContent="center"
        placeItems="center"
      >
        <Link href="/adm/types">Tipos</Link>
        <Link href="/adm/categories">Categorias</Link>
        <Link href="/adm/users">Usuarios</Link>
      </Grid>
    </Box>
  );
}

export default Adm;
