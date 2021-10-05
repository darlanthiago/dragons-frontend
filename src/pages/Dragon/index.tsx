import { useEffect, useState } from "react";
import {
  SimpleGrid,
  Box,
  Text,
  Badge,
  Flex,
  Avatar,
  Spinner,
} from "@chakra-ui/react";

import { api } from "../../services/api";

interface DragonsData {
  avatar?: string;
  createdAt: string;
  id: number;
  name: string;
  type: string;
}

export const Dragon = () => {
  const [dragons, setDragons] = useState<DragonsData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      await api.get("/").then((resp) => {
        setDragons(resp.data);
        setLoading(false);
      });
    })();
  }, []);

  return (
    <>
      {loading ? (
        <Flex
          bg="gray.100"
          height="100vh"
          justifyContent="center"
          alignItems="center"
          flex="1"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="purple.500"
            size="xl"
          />
        </Flex>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={10} flex="1" height="100%">
          {dragons.map((dragon, index) => (
            <Flex
              p="8"
              bg="white"
              w="100%"
              key={index}
              borderRadius="8"
              border="2px solid #E2E8F0"
              justifyContent="space-between"
              alignItems="center"
              _hover={{
                transition: "background 0.2s",
                backgroundColor: "purple.50",
                cursor: "pointer",
                border: "2px solid #E9D8FD",
              }}
            >
              <Box>
                <Text fontSize="2xl" fontWeight="bold" color="purple.500">
                  {dragon.name}
                </Text>
                <Badge colorScheme="purple" size="sm">
                  {dragon.type}
                </Badge>
              </Box>
              <Box>
                <Flex
                  flexDir="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Avatar
                    name={dragon.name}
                    src={dragon.avatar}
                    size="lg"
                    mb="1"
                  />
                  <Badge colorScheme="purple" size="sm">
                    {new Date(dragon.createdAt).toLocaleString("pt-BR", {
                      timeZone: "America/Sao_Paulo",
                      dateStyle: "short",
                    })}
                  </Badge>
                </Flex>
              </Box>
            </Flex>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
