import { Flex } from "@chakra-ui/react";
import { Header } from "../Header";

export const AppLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Flex
        w="100%"
        paddingY="10"
        marginX="auto"
        px="6"
        bg="gray.100"
        height="100%"
      >
        {children}
      </Flex>
    </>
  );
};
