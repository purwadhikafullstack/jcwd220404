import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BiReset, BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { cartSync } from "../../redux/cartSlice";
import { addCart } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../../redux/productSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

export const ProductList = () => {
  const [state, setState] = useState();
  const [product, setProduct] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("ASC");
  const [order, setOrder] = useState("productName");
  const [searchProduct, setSearchProduct] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const dispatch = useDispatch();
  const { id, cart } = useSelector((state) => state.userSlice.value);
  const data = useSelector((state) => state.productSlice.value);

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

  const onAddCart = async (ProductId) => {
    try {
      if (!id) {
        return Swal.fire({
          icon: "error",

          text: "Login First",
          timer: 2000,
          customClass: {
            container: "my-swal",
          },
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",

        text: `Add Cart Failed`,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  const onDiscount = async () => {
    try {
      const res = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/product/discItem`
      )
      console.log(res.data)
    } catch (err) {
      console.log(err)

    }
  }

  return (
    <div>
      <Center>
        <Stack>
          <Flex
            flexWrap="wrap"
            // mt="-200"
            w={[330, 330, 380]}
            justifyContent="center"
          >
            <Center>
              <Flex
                ml="3"
                mr="3"
                flexWrap={"wrap"}
                color={useColorModeValue("#285430")}
                // border="2px"
                borderRadius="xl"
              >
                <Box className="filter">
                  <Box
                    alignItems={"center"}
                    h="50px"
                    borderTopRadius="8px"
                    align="center"
                    // bg="#E5D9B6"
                    display="flex"
                  >
                    {/* <Box h="25px" ml="10px"></Box>
                  <Box h="25px"></Box> */}
                  </Box>
                  <Flex m={2} wrap="wrap">
                    <FormControl w="" m={1}>
                      <InputGroup 
                      mt={"-30px"}
                      >
                        <Input
                          placeholder="Only Fresh Here..."
                          _placeholder={{ color: "#5F8D4E" }}
                          bgColor={"white"}
                          w={"300px"}
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
                    <Center>
                      <FormControl w="" m={1}></FormControl>
                      <FormControl w="" m={1}></FormControl>
                    </Center>
                    {/* <Icon
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
                  /> */}
                  </Flex>
                </Box>
                {/* </Box> */}
              </Flex>
            </Center>
          </Flex>
          <Box>
            <Box display="flex" justifyContent="center" alignContent="center">
              <Button
                onClick={() => {
                  async function submit() {
                    setPage(page === 1 ? 1 : page - 1);
                  }
                  submit();
                  var pageNow = page - 1;
                  pageNow = pageNow <= 0 ? 1 : pageNow;
                  document.getElementById("pagingInput").value =
                    parseInt(pageNow);
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
                  document.getElementById("pagingInput").value =
                    parseInt(pageNow);
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
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(100px, 1fr))"
            >
              {data?.map((item) => {
                return (
                  <>
                    <Card>
                      <Center>
                        <CardBody as={Link} to={`product/${item.id}`}>
                          <Image
                            boxSize={"50px"}
                            src={
                              `${process.env.REACT_APP_API_BASE_URL}/` +
                              item.picture
                            }
                          />
                          <Text as={"b"} size="sm">
                            {item.productName}
                          </Text>
                          <Text fontSize={"xs"}>
                            Rp{item.Price?.productPrice}
                          </Text>
                        </CardBody>
                      </Center>
                      <CardFooter>
                        <Button onClick={() => onAddCart(item.id)}>
                          <AddIcon />
                          Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  </>
                );
              })}
            </SimpleGrid>
          </Box>
        </Stack>
      </Center>
    </div>
  );
};
