import { useCallback, useEffect, useState } from "react";
import {
  SimpleGrid,
  Box,
  Text,
  Badge,
  Flex,
  Avatar,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Input,
  Button,
  useToast,
  Center,
  ModalFooter,
} from "@chakra-ui/react";

import { BiPlus } from "react-icons/bi";

import { api } from "../../services/api";

interface DragonsData {
  avatar?: string;
  createdAt: string;
  id: number;
  name: string;
  type: string;
  isNew?: boolean;
}

export const Dragon = () => {
  const [dragons, setDragons] = useState<DragonsData[]>([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dragon, setDragon] = useState<DragonsData>();
  const [dragonToEdit, setDragonToEdit] = useState(String);
  const [isUpdating, setUpdating] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const toast = useToast();

  const sortByName = useCallback((data: any) => {
    return data.sort((a: any, b: any) => {
      return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
    });
  }, []);

  const dragonsUpdate = useCallback(
    (dataId, options) => {
      setDragons(
        dragons.map((r) => {
          if (r.id === dataId) {
            r = {
              ...r,
              ...options,
            };
          }
          return r;
        })
      );
    },
    [dragons]
  );

  useEffect(() => {
    (async () => {
      setLoading(true);

      await api.get("/").then((resp) => {
        setDragons(sortByName(resp.data));
        setLoading(false);
      });
    })();
  }, [sortByName]);

  const openDetails = useCallback(
    (dragonId) => {
      const findDragon = dragons.find((item) => item.id === dragonId);

      if (!!findDragon) {
        setDragon(findDragon);

        setDragonToEdit(findDragon.name);

        onOpen();
      }
    },
    [dragons, onOpen]
  );

  const updateDragon = useCallback(async () => {
    if (!!dragon) {
      setUpdating(true);
      await api
        .put(`/${dragon.id}`, {
          name: dragonToEdit,
        })
        .then((resp) => {
          dragonsUpdate(dragon.id, resp.data);
          toast({
            title: "Dragon Updated.",
            description: "Success updated",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setUpdating(false);
        })
        .catch((error) => {
          console.error(error);
          setUpdating(false);
        });
    }
  }, [dragon, dragonToEdit, dragonsUpdate, toast]);

  const deleteDragon = useCallback(
    async (dragonId) => {
      setDeleting(true);
      await api
        .delete(`/${dragonId}`)
        .then((resp) => {
          const filteredDragons = dragons.filter(
            (dragon) => dragon.id !== dragonId
          );
          onClose();

          setDragons(sortByName(filteredDragons));

          setDeleting(false);
        })
        .catch((error) => {
          setDeleting(false);
        });
    },
    [dragons, onClose, sortByName]
  );

  const createDragon = useCallback(async () => {
    setCreating(true);

    await api
      .post("/")
      .then((resp) => {
        let newDragon: DragonsData = resp.data;
        newDragon.isNew = true;
        setDragons((prevState) => sortByName([...prevState, newDragon]));
        setCreating(false);
      })
      .catch((error) => {
        setCreating(false);
      });
  }, [sortByName]);

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
        <>
          <Flex
            w="100%"
            marginX="auto"
            paddingX="6"
            paddingY="6"
            bg="gray.100"
            height="100%"
          >
            <Button
              colorScheme="purple"
              leftIcon={<BiPlus />}
              isLoading={isCreating}
              onClick={createDragon}
            >
              Dragão
            </Button>
          </Flex>
          <Flex
            w="100%"
            marginX="auto"
            px="6"
            paddingY="2"
            bg="gray.100"
            height="100%"
          >
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
                  onClick={() => openDetails(dragon.id)}
                >
                  <Box>
                    <Text fontSize="2xl" fontWeight="bold" color="purple.500">
                      {dragon.name}
                      {dragon.isNew && (
                        <Badge ml="1" colorScheme="green">
                          New
                        </Badge>
                      )}
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
            {!!dragon && (
              <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>{dragon?.name}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Flex flexDir="column" paddingY="10">
                      <Center>
                        <Avatar
                          name={dragon.name}
                          src={dragon.avatar}
                          size="2xl"
                          mb="1"
                        />
                      </Center>

                      <Flex
                        flexDir="row"
                        justifyContent="center"
                        align="center"
                        mt="6"
                      >
                        <Input
                          placeholder="Nome do Dragão"
                          mr="2"
                          value={dragonToEdit}
                          onChange={(e) => setDragonToEdit(e.target.value)}
                        />
                        <Button
                          colorScheme="purple"
                          size="sm"
                          mr="2"
                          onClick={updateDragon}
                          isLoading={isUpdating}
                        >
                          Salvar
                        </Button>
                      </Flex>

                      <Text fontSize="2xl" mt="1">
                        Tipo: {dragon.type}
                      </Text>
                      <Text fontSize="xl" mt="1">
                        Data de Criação:{" "}
                        {new Date(dragon.createdAt).toLocaleString("pt-BR", {
                          timeZone: "America/Sao_Paulo",
                          dateStyle: "short",
                        })}
                      </Text>
                    </Flex>
                  </ModalBody>
                  <ModalFooter>
                    <Button mr={3} onClick={onClose}>
                      Fechar
                    </Button>
                    <Button
                      colorScheme="red"
                      isLoading={isDeleting}
                      onClick={() => deleteDragon(dragon.id)}
                    >
                      Excluir
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            )}
          </Flex>
        </>
      )}
    </>
  );
};
