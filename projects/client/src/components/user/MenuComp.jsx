import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { FaCartArrowDown } from "react-icons/fa";
import {
  Box,
  Center,
  Text,
  Flex,
  Avatar,
  SimpleGrid,
  Card,
  CardBody,
  CardFooter,
  Button,
  Image,
  Input,
  FormHelperText,
  InputRightElement,
  Icon,
  useColorModeValue,
  FormControl,
  InputGroup,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { cartSync } from "../../redux/cartSlice";
import { addCart } from "../../redux/userSlice";
import { useFormik } from "formik";
import { syncInventory } from "../../redux/inventorySlice";
import * as Yup from "yup";

export const MenuComp = () => {
  const [category, setCategory] = useState();
  const [searchProduct, setSearchProduct] = useState("");
  const [state, setState] = useState("");
  const [state3, setState3] = useState();
  const data = useSelector((state) => state.inventorySlice.value);
  const { id } = useSelector((state) => state.userSlice.value);
  const dispatch = useDispatch();

  const getCategory = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/listCategory`
      );
      setCategory(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getData2 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/findDefault/${id}`
      );
      console.log(result.data.defaultAdd);
      setState3(result.data.defaultAdd);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData2();
  }, [id]);

  const getProduct = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/inventory/findByBranch/${Number(
          state3["Branch.longitude"]
        )}/${Number(state3.longitude)}`
      );
      dispatch(syncInventory(res.data));
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, [state3]);

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
        text: `Add to Cart Success`,
        timer: 2000,
        width: "370px",
        customClass: {
          container: "my-swal",
        },
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        text: `Add Cart Failed`,
        width: "370px",
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      searchName: ``,
    },
    validationSchema: Yup.object().shape({
      searchName: Yup.string().min(3, "Minimal 3 huruf"),
    }),
    validationOnChange: false,
    onSubmit: async () => {
      const { searchName } = formik.values;
      setSearchProduct(searchName);
    },
  });

  return (
    <>
      <Center>
        <Flex
          flexWrap="wrap"
          mt="-200px"
          w={[330, 330, 380]}
          justifyContent="center"
        >
          <Center>
            <Flex
              ml="3"
              mr="3"
              flexWrap={"wrap"}
              color={useColorModeValue("#285430")}
              borderRadius="xl"
            >
              <Box className="filter">
                <Box
                  alignItems={"center"}
                  h="50px"
                  borderTopRadius="8px"
                  align="center"
                  display="flex"
                ></Box>
                <Flex mt={"30px"} wrap="wrap">
                  <FormControl w="370px" m={1}>
                    <InputGroup>
                      <Input
                        placeholder="Only Fresh Here..."
                        _placeholder={{ color: "#5F8D4E" }}
                        bgColor={"white"}
                        w={"400px"}
                        textColor="black"
                        borderColor={"#285430"}
                        border="1px"
                        fontSize="18px"
                        color="gray.800"
                        id="search"
                        type="text"
                        onChange={(event) =>
                          formik.setFieldValue("searchName", event.target.value)
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            formik.handleSubmit();
                          }
                        }}
                      />
                      <InputRightElement>
                        <Icon
                          fontSize="xl"
                          as={BiSearchAlt}
                          sx={{ _hover: { cursor: "pointer" } }}
                          onClick={() => formik.handleSubmit()}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormHelperText color="red">
                      {formik.errors.searchName}
                    </FormHelperText>
                  </FormControl>
                </Flex>
              </Box>
            </Flex>
          </Center>

          {category?.map((item) => {
            return (
              <div>
                <Box>
                  <Avatar
                    border="1px"
                    bgColor="#E5D9B6"
                    _hover={{ border: "2px" }}
                    mr={[2, 3, 4]}
                    ml={[2, 3, 4]}
                    mt="20px"
                    size="md"
                    name="Grocery"
                    src={
                      `${process.env.REACT_APP_API_BASE_URL}/` +
                      item.categoryPicture
                    }
                    as={Link}
                    to={`/category/${item.id}`}
                  ></Avatar>
                  <Text textAlign="center" fontSize="x-small" color={"#285430"}>
                    {item.categoryName}
                  </Text>
                </Box>
              </div>
            );
          })}
        </Flex>
      </Center>
      <Box>
        <SimpleGrid
        mt={"10px"}
          spacing={3}
          templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
          w={"350px"}
        >
          {data?.map((item) => {
            return (
              <div>
                <Card
                  justify={"center"}
                  border={"1px"}
                  borderColor="#285430"
                  bgColor="#E5D9B6"
                  h={"330px"}
                >
                    <CardBody as={Link} to={`product/${item.Product?.id}`}>
                      <Image ml="10px" mb={"10px"}
                        boxSize={"100px"}
                        src={
                          `${process.env.REACT_APP_API_BASE_URL}/` +
                          item.Product.picture
                        }
                      />
                      <Text mt={"10"} pb={"10px"} as={"b"} size="md" color={"#285430"}>
                        {item.Product.productName}
                      </Text>
                      <Text mt={"10px"} fontSize={"sm"} color="#285430">
                      {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.Product.Price.productPrice)}
                      </Text>
                      <Text fontSize={"sm"} color={"#285430"}>
                        {item.stockQty} pcs
                      </Text>
                    </CardBody>
                  <CardFooter>
                    <Button
                      onClick={() => onAddCart(item.Product.id)}
                      bgColor={"#A4BE7B"}
                      borderColor="#285430"
                      border="2px"
                      fontSize="14px"
                      color="gray.800"
                      width={"180px"}
                      justifyContent="center"
                    ><Icon as={FaCartArrowDown} w="5" h="5" m="2"/>
                      to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </SimpleGrid>
      </Box>
    </>
  );
};