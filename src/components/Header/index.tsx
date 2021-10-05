import { Flex, Box, Heading, Spacer, Button } from "@chakra-ui/react";
import { useReactAuth } from "../../hooks/AuthContext";

export const Header = () => {
  const { signOut } = useReactAuth();

  return (
    <Flex
      justify="center"
      align="center"
      p="4"
      borderBottom="1px"
      borderColor="gray.100"
      bg="purple.500"
      w="100%"
      marginX="auto"
      px="6"
    >
      <Box>
        <Heading size="md" color="purple.100">
          Dragons
        </Heading>
      </Box>
      <Spacer />
      <Box>
        <Button colorScheme="red" mr="4" size="sm" onClick={signOut}>
          Sair
        </Button>
      </Box>
    </Flex>
  );
};
