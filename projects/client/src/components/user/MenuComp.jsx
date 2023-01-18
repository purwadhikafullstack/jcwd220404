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
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { cartSync } from "../../redux/cartSlice";
import { addCart } from "../../redux/userSlice";

export const MenuComp = () => {
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();
  const [address, setAddress] = useState();
  const [state, setState] = useState("");
  const { id, cart } = useSelector((state) => state.userSlice.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const onAddCart = async (ProductId) => {
    try {
      if (!id) {
        return Swal.fire({
          icon: "error",
          title: "Oooops ...",
          text: "Login First",
          timer: 2000,
          customClass: {
            container: "my-swal",
          },
        });
      }
      const result = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/cart/create`,
        {
          UserId: id,
          ProductId,
        }
      );
      setState(result.data);
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/cart/findBy/${id}`
      );
      dispatch(cartSync(res.data));
      dispatch(addCart(res.data));
      getProduct();
      Swal.fire({
        icon: "success",
        // title: "Good Job",
        text: `Add to Cart Success`,
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        // title: "Oops...",
        text: `Add Cart Failed`,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  const onNavigate = () => {
    if (!tokenLocalStorage) {
      navigate("/account");
    } else {
      navigate(`/cart`);
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
                <CardBody>
                  <Text as={"b"} size="sm">
                    {item.productName}
                  </Text>
                  <Text fontSize={"xs"}>{item.Price?.productPrice}</Text>
                  <Text>Stok</Text>
                </CardBody>
                <CardFooter>
                  <Button onClick={() => onAddCart(item.id)}>
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
