import {
  Box,
  Center,
  Container,
  Flex,
  Image,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

export const ProductDetail = () => {
  const [data, setData] = useState([]);
  const params = useParams();

  const getProduct = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/list/${params.id}`
      );
      console.log(result.data);
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Box>
        <Center>
          <Box
            className="header"
            w={"390px"}
            h={"80px"}
            bgColor="#E5D9B6"
            display={"flex"}
            justifyContent="space-between"
            pt={"10px"}
            pl={"1px"}
            pos="fixed"
            top={"0"}
            zIndex={"2"}
          >
            <Box as={Link} to={"/"}>
              <ArrowBackIcon
                mt={"20px"}
                ml={"20px"}
                pos={"fixed"}
                color="#285430"
                fontSize={"25px"}
              />
            </Box>
            <Box margin={"auto"} alignItems={"center"} textColor="#285430">
              <Text m="100px" as={"b"} fontSize="xl">
                {data?.productName}
              </Text>
            </Box>
          </Box>
          <Box
            mt={"80px"}
            pt={"3px"}
            className="body"
            bgColor="white"
            h={"740px"}
            w={"390px"}
          >
            <Container maxW={"7xl"}>
              <Box>
                <Flex>
                  <Image
                    rounded={"md"}
                    alt={data?.productName}
                    src={
                      `${process.env.REACT_APP_API_BASE_URL}/` + data?.picture
                    }
                    fit={"fill"}
                    align={"center"}
                    boxSize="100px"
                  />
                </Flex>
                <Stack spacing={{ base: 6, md: 10 }}>
                  <Text
                    color={useColorModeValue("gray.900", "gray.400")}
                    fontWeight={300}
                    fontSize={"2xl"}
                  >
                    Berat: {data?.weight} g
                  </Text>
                  <Stack
                    spacing={{ base: 4, sm: 6 }}
                    direction={"column"}
                    divider={
                      <StackDivider
                        borderColor={useColorModeValue("gray.200", "gray.600")}
                      />
                    }
                  >
                    <Box>
                      <Text
                        fontSize={{ base: "16px", lg: "18px" }}
                        color={useColorModeValue("yellow.500", "yellow.300")}
                        fontWeight={"500"}
                        textTransform={"uppercase"}
                        mb={"4"}
                      >
                        Description
                      </Text>

                      <List spacing={2}>
                        <ListItem>{data?.description}</ListItem>
                      </List>
                    </Box>
                    <Box>
                      <Text
                        fontSize={{ base: "16px", lg: "18px" }}
                        color={useColorModeValue("yellow.500", "yellow.300")}
                        fontWeight={"500"}
                        textTransform={"uppercase"}
                        mb={"4"}
                      >
                        Distributor
                      </Text>

                      <List spacing={2}>
                        <ListItem>
                          <Text as={"span"} fontWeight={"bold"}>
                            {data?.distributor}
                          </Text>{" "}
                        </ListItem>
                      </List>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
              <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 18, md: 24 }}
              >
                {/* <Box as={"header"}></Box> */}

                {/* <Button
                rounded={"none"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
                bg={useColorModeValue("gray.900", "gray.50")}
                color={useColorModeValue("white", "gray.900")}
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
              >
                Borrow
              </Button> */}

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent={"center"}
                ></Stack>
              </SimpleGrid>
            </Container>
          </Box>
        </Center>
      </Box>
    </>
  );
};
