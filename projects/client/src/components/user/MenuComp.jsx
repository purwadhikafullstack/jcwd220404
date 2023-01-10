import { useEffect } from "react";
import {
  Box,
  Center,
  Text,
  Flex,
  Avatar,
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Button,
  Image,
} from "@chakra-ui/react";
import Axios from "axios";
import { useState } from "react";

export const MenuComp = () => {
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();

  const getCategory = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/listCategory`
      );
      console.log(res.data);
      setCategory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getProduct = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/list`
      );
      console.log(res.data);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <Center>
        <Flex
          flexWrap="wrap"
          mt="-12"
          w={[330, 330, 380]}
          justifyContent="center"
        >
          {category?.map((item) => {
            return (
              <div>
                <Avatar
                  border="1px"
                  bgColor="#A4BE7B"
                  _hover={{ border: "2px" }}
                  mr={[2, 3, 4]}
                  ml={[2, 3, 4]}
                  mt="3"
                  size="md"
                  name="Grocery"
                  src={
                    `${process.env.REACT_APP_API_BASE_URL}/` +
                    item.categoryPicture
                  }
                ></Avatar>
                <Text fontSize="x-small" color={"#285430"}>
                  {item.categoryName}
                </Text>
              </div>
            );
          })}
        </Flex>
      </Center>
      <Box>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(100px, 1fr))"
        >
          {product?.map((item) => {
            return (
              <Card>
                <CardHeader>
                  <Text size="sm">{item.productName}</Text>
                </CardHeader>
                <CardBody>
                  <Text fontSize={"xs"}>Price</Text>
                  <Image
                    boxSize={"50px"}
                    src={`${process.env.REACT_APP_API_BASE_URL}/` + item.picture}
                  />
                </CardBody>
                <CardFooter>
                  <Button>Tambah</Button>
                </CardFooter>
              </Card>
            );
          })}
        </SimpleGrid>
      </Box>
    </div>
  );
};