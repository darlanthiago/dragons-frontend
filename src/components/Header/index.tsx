import { Flex, Box, Heading, Spacer, Button } from "@chakra-ui/react";

export const Header = () => {
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
        <Button colorScheme="red" mr="4" size="sm">
          Sair
        </Button>
      </Box>
    </Flex>
  );
};
