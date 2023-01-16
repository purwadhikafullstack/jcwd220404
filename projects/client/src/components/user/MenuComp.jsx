import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Center,
  Text,
  Flex,
  Avatar,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

export const MenuComp = () => {
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();
  const [address, setAddress] = useState();
  const { id } = useSelector((state) => state.userSlice.value);
  const navigate = useNavigate();
  const tokenLocalStorage = localStorage.getItem("tokenUser");

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

  const onNavigate = () => {
    if (!tokenLocalStorage) {
      navigate("/account");
    } else {
      navigate(`/cart/${id}`);
    }
  };

  return (
    <>
      <Center>
        <Flex
          flexWrap="wrap"
          mt="-110"
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
              <Card as={"button"}>
                <Image
                  boxSize={"50px"}
                  src={`${process.env.REACT_APP_API_BASE_URL}/` + item.picture}
                />
                <CardHeader>
                  <Text size="sm">{item.productName}</Text>
                </CardHeader>
                <CardBody>
                  <Text fontSize={"xs"}>Price</Text>
                </CardBody>
                <CardFooter>
                  <Button onClick={onNavigate}>
                    <AddIcon />
                    Cart
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </SimpleGrid>
      </Box>
    </>
  );
};
