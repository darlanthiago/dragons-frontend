import { useState } from "react";
import {
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
  FormErrorMessage,
  Image,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { useReactAuth } from "../../hooks/AuthContext";
import { useForm } from "react-hook-form";

import LogoImage from "../../assets/img/logo.png";

interface SignInProps {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn } = useReactAuth();

  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const handleSignIn = async ({ email, password }: SignInProps) => {
    await signIn({ email, password });
  };

  return (
    <Flex w="100" h="100vh" align="center" justify="center" bg="purple.500">
      <Stack
        as="form"
        w="100%"
        maxWidth={360}
        p="8"
        bg="gray.100"
        color="gray.600"
        borderRadius={8}
        flexDir="column"
        spacing="8"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Image
          src={LogoImage}
          alt="Dragons"
          height="68px"
          width="auto"
          marginX="auto"
          loading="lazy"
        />
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email" color="gray.500">
            E-mail
          </FormLabel>
          <Input
            required
            id="email"
            type="email"
            bg="gray.300"
            variant="filled"
            _focus={{ boxShadow: "none" }}
            _hover={{
              bg: "gray.300",
            }}
            errorBorderColor="red.300"
            size="lg"
            placeholder="Digite aqui o seu e-mail"
            _placeholder={{
              color: "gray.500",
            }}
            {...register("email")}
          />
          {!!errors.email && (
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password" color="gray.500">
            Senha
          </FormLabel>
          <InputGroup size="lg">
            <Input
              required
              id="password"
              type={show ? "text" : "password"}
              focusBorderColor="blue.500"
              bg="gray.300"
              errorBorderColor="red.300"
              variant="filled"
              _focus={{ boxShadow: "none" }}
              _hover={{
                bg: "gray.300",
              }}
              size="lg"
              placeholder="Digite aqui a sua senha"
              _placeholder={{
                color: "gray.500",
              }}
              {...register("password")}
            />
            <InputRightElement width="2rem">
              <IconButton
                h="1.75rem"
                size="sm"
                variant="unstyled"
                aria-label="Toggle Password Visible"
                onClick={handleClick}
                icon={show ? <RiEyeCloseFill /> : <RiEyeFill />}
              />
            </InputRightElement>
          </InputGroup>

          {!!errors.password && (
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          )}
        </FormControl>

        <Button type="submit" marginTop="8" colorScheme="purple" size="lg">
          Entrar
        </Button>

        <Alert status="info">
          <AlertIcon />
          E-mail: admin@admin.com Senha: admin@123
        </Alert>
      </Stack>
    </Flex>
  );
};
