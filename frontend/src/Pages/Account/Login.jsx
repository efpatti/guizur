import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Flex,
  Button,
  Input,
  InputGroup,
  FormLabel,
  InputRightElement,
  useColorMode,
  Text,
  Stack,
  Link,
} from "@chakra-ui/react";
import { useAuth } from "../../Hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [click, setClick] = useState(false);
  const { login, isAuthenticated, addressBack } = useAuth();

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const { colorMode } = useColorMode();

  const handleEmailFocus = () => setEmailFocused(true);
  const handleEmailBlur = (e) => {
    if (!e.target.value) setEmailFocused(false);
  };
  const handlePasswordFocus = () => setPasswordFocused(true);
  const handlePasswordBlur = (e) => {
    if (!e.target.value) setPasswordFocused(false);
  };

  const handleClick = () => setClick(!click);

  const handleLogin = () => {
    axios
      .post(`${addressBack}/loginUsuario`, {
        email,
        senha,
      })
      .then((res) => {
        const { token } = res.data;
        login(token);
        console.log(token);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  if (isAuthenticated) {
    return <Navigate to="/logado" />;
  }
  return (
    <Container
      minH="50vh"
      textAlign="center"
      paddingY="7rem"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        boxSize="lg"
        borderRadius="25px"
        flexDirection="column"
        m="10px"
        p="10px"
      >
        <Flex w="90%" align="center" justify="space-around">
          <Flex
            w="100%"
            borderRadius={25}
            p={5}
            align="center"
            flexDirection="column"
            gap="10px"
            bgColor={colorMode === "light" ? "darkblue" : "blue.700"}
            color={colorMode === "light" ? "gray.200" : "gray.800"}
          >
            <Text fontSize={40} mb={8} as="b">
              Login
            </Text>
            <InputGroup>
              <FormLabel
                htmlFor="email"
                position="absolute"
                fontSize={emailFocused ? "xs" : "sm"}
                transform={
                  emailFocused ||
                  (document.getElementById("email") &&
                    document.getElementById("email").value !== "")
                    ? "translateY(-1rem)"
                    : "translateY(0.25rem) translateX(0.35rem)"
                }
                transition="transform 0.2s, font-size 0.2s, color 0.2s"
              >
                Email
              </FormLabel>
              <Input
                color={colorMode === "light" ? "black" : "white"}
                borderRadius={15}
                placeholder={emailFocused ? "" : "Email"}
                bg={colorMode === "light" ? "gray.200" : "gray.800"}
                type="text"
                id="email"
                value={email}
                mb="3"
                onChange={(e) => setEmail(e.target.value)}
                disabled={isAuthenticated}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
              />
            </InputGroup>
            <InputGroup>
              <FormLabel
                htmlFor="password"
                position="absolute"
                fontSize={passwordFocused ? "xs" : "sm"}
                transform={
                  passwordFocused ||
                  (document.getElementById("password") &&
                    document.getElementById("password").value !== "")
                    ? "translateY(-1rem)"
                    : "translateY(0.25rem) translateX(0.35rem)"
                }
                transition="transform 0.2s, font-size 0.2s, color 0.2s"
              >
                Senha
              </FormLabel>
              <Input
                borderRadius={15}
                mb="3"
                placeholder={passwordFocused ? "" : "Senha"}
                bg={colorMode === "light" ? "gray.200" : "gray.800"}
                color={colorMode === "light" ? "black" : "white"}
                id="password"
                type={click ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                disabled={isAuthenticated}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                  variant="none"
                  _hover={{ opacity: "70%" }}
                  color={colorMode === "light" ? "black" : "white"}
                >
                  {click ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Stack direction="row" gap="3">
              <Link
                as={Button}
                href="/logado"
                onClick={handleLogin}
                _hover={{ opacity: "80%" }}
                color={colorMode === "light" ? "gray.800" : "gray.200"}
                bg={colorMode === "light" ? "gray.200" : "gray.800"}
              >
                Entrar
              </Link>
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}

export default Login;
