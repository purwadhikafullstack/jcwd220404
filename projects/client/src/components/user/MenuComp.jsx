import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsFilterLeft } from "react-icons/bs";
import { BiReset, BiSearchAlt } from "react-icons/bi";
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
  Input,
  FormHelperText,
  InputRightElement,
  Icon,
  useColorModeValue,
  Select,
  FormLabel,
  FormControl,
  InputGroup,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { cartSync } from "../../redux/cartSlice";
import { addCart } from "../../redux/userSlice";
import { useFormik } from "formik";
import { syncData } from "../../redux/productSlice";
import * as Yup from "yup";

export const MenuComp = () => {
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();
  const [address, setAddress] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("ASC");
  const [order, setOrder] = useState("productName");
  const [searchProduct, setSearchProduct] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [state2, setState2] = useState(0);
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
      setCategory(res.data);
      console.log(res.data);
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
      setProduct(res.data);
      console.log(res.data);
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

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/product/pagProduct?search_query=${searchProduct}&page=${
          page - 1
        }&limit=${limit}&order=${order ? order : `productName`}&sort=${
          sort ? sort : "ASC"
        }`
      );
      dispatch(syncData(res.data.result));
      console.log(res.data.result);
      setTotalPage(Math.ceil(res.data.totalRows / res.data.limit));
      setState(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [searchProduct, page, limit, sort]);

  async function fetchSort(filter) {
    setSort(filter);
  }

  useEffect(() => {
    fetchSort();
  }, []);

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
          mt="-110"
          w={[330, 330, 380]}
          justifyContent="center"
        >
          <Input
            placeholder="Only Fresh Here..."
            _placeholder={{ color: "#5F8D4E" }}
            bgColor={"white"}
            w={"400px"}
            textColor="black"
            borderColor={"#285430"}
          />
          <Center>
            <Flex
              ml="3"
              mr="3"
              flexWrap={"wrap"}
              color={useColorModeValue("#285430")}
              border="2px"
              borderRadius="xl"
            >
              <Box className="filter">
                <Box
                  m="10px"
                  mb="20px"
                  borderWidth="2px"
                  boxShadow="md"
                  borderRadius="8px"
                  borderColor="#285430"
                >
                  <Box
                    alignItems={"center"}
                    h="50px"
                    borderTopRadius="8px"
                    align="center"
                    bg="#E5D9B6"
                    display="flex"
                  >
                    <Box h="25px" ml="10px">
                      <Icon color="#285430" boxSize="6" as={BsFilterLeft} />
                    </Box>
                    <Box h="25px">
                      <Text mx="10px" fontWeight="bold" color="#285430">
                        Filter & Search
                      </Text>
                    </Box>
                    <Icon
                      color="#285430"
                      sx={{ _hover: { cursor: "pointer" } }}
                      boxSize="6"
                      as={BiReset}
                      onClick={() => {
                        async function submit() {
                          setSearchProduct("");
                          document.getElementById("search").value = "";
                          formik.values.searchName = "";
                        }
                        submit();
                      }}
                    />
                  </Box>
                  <Flex m={2} wrap="wrap">
                    <FormControl w="" m={1}>
                      <FormLabel fontSize="x-small" color="#285430">
                        Format Sort
                      </FormLabel>
                      <Select
                        color={"#285430"}
                        borderColor="#285430"
                        onChange={(event) => {
                          fetchSort(event.target.value);
                        }}
                      >
                        <option value="ASC">A-Z</option>
                        <option value="DESC">Z-A</option>
                      </Select>
                    </FormControl>
                    <FormControl w="" m={1}>
                      <FormLabel fontSize="x-small" color="#285430">
                        Show
                      </FormLabel>
                      <Select
                        color={"#285430"}
                        borderColor="#285430"
                        onChange={(event) => {
                          setLimit(event.target.value);
                        }}
                      >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                      </Select>
                    </FormControl>
                    <FormControl w="" m={1}>
                      <FormLabel fontSize="x-small" color="#285430">
                        Search Product & Category
                      </FormLabel>
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
                            formik.setFieldValue(
                              "searchName",
                              event.target.value
                            )
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
              </Box>
            </Flex>
          </Center>
          {category?.map((item) => {
            return (
              <div>
                <Avatar
                  border="1px"
                  bgColor="#A4BE7B"
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
        <Box display="flex" justifyContent="center" alignContent="center">
          <Button
            onClick={() => {
              async function submit() {
                setPage(page === 1 ? 1 : page - 1);
              }
              submit();
              var pageNow = page - 1;
              pageNow = pageNow <= 0 ? 1 : pageNow;
              document.getElementById("pagingInput").value = parseInt(pageNow);
            }}
            bgColor={"#A4BE7B"}
            borderColor="#285430"
            border="2px"
            fontSize="14px"
            color="gray.800"
            width={"60px"}
            justifyContent="center"
            size="sm"
            mt="1rem"
          >
            Prev
          </Button>
          <Text alignSelf="center" mx="10px" pt="15px">
            {" "}
            {page} of {totalPage}
          </Text>
          <Button
            onClick={() => {
              async function submit() {
                setPage(totalPage === page ? page : page + 1);
              }
              submit();
              var pageNow = page + 1;
              pageNow = pageNow > totalPage ? page : pageNow;
              document.getElementById("pagingInput").value = parseInt(pageNow);
            }}
            bgColor={"#A4BE7B"}
            borderColor="#285430"
            border="2px"
            fontSize="14px"
            color="gray.800"
            width={"60px"}
            justifyContent="center"
            size="sm"
            mt="1rem"
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
};
