import { AddIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Flex,
  FormControl,
  Icon,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

import Axios from "axios";
import { syncInventory } from "../../redux/inventorySlice";
import Swal from "sweetalert2";
import { cartSync } from "../../redux/cartSlice";
import { addCart } from "../../redux/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";

export const InventoryList = () => {
  const [state, setState] = useState();
  const [state2, setState2] = useState();
  const [state3, setState3] = useState();
  const [state4, setState4] = useState();
  const [state5, setState5] = useState();
  const [state6, setState6] = useState();
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.userSlice.value);
  const data = useSelector((state) => state.inventorySlice.value);
  const data2 = useSelector((state) => state.userSlice.value)
  console.log(data)

  const getData2 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/findDefault/${id}`
      );
      
      console.log(result.data.defaultAdd["User.id"]);
      setState6(result.data.defaultAdd["User.id"]);
      setState2(result.data.defaultAdd);
      setState3(result.data.defaultAdd["Branch.id"]);
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
          state2["Branch.longitude"]
        )}/${Number(state2.longitude)}`,
        // {
        //   UserId: id,
        // }
      );
      dispatch(syncInventory(res.data));
      setState5(res.data?.Product?.Price?.productPrice);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, [state2, id]);

  const onAddCart = async (ProductId, BranchId) => {
    try {
      const result = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/cart/create`,
        {
          UserId: id,
          ProductId,
          BranchId,
        }
      );
      setState(result.data);
      console.log(result.data);
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
        customClass: {
          container: "my-swal",
        },
      });
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

  const getDiscount = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/listDiscount`
      );
      setState4(res.data.nominal);
      const discNominal = res.data.nominal;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDiscount();
  }, []);

  //   const formik = useFormik({
  //     initialValues: {
  //       searchName: ``,
  //     },
  //     validationSchema: Yup.object().shape({
  //       searchName: Yup.string().min(3, "Minimal 3 huruf"),
  //     }),
  //     validationOnChange: false,
  //     onSubmit: async () => {
  //       const { searchName } = formik.values;
  //       setSearchProduct(searchName);
  //     },
  //   });

  return (
    <div>
      <Box mb={"50px"}>
        {/* <Center>
        <Flex
          flexWrap="wrap"
          mt="-200"
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
            > */}
        <Box className="filter">
          {/* <Box
                  m="10px"
                  mb="20px"
                  borderWidth="2px"
                  boxShadow="md"
                  borderRadius="8px"
                  borderColor="#285430"
                > */}
          <Box
            alignItems={"center"}
            h="50px"
            borderTopRadius="8px"
            align="center"
            // bg="#E5D9B6"
            display="flex"
          >
            <Box h="25px" ml="10px">
              {/* <Icon color="#285430" boxSize="6" as={BsFilterLeft} /> */}
            </Box>
            <Box h="25px">
              {/* <Text mx="10px" fontWeight="bold" color="#285430">
                        Filter & Search
                      </Text> */}
            </Box>
          </Box>
          <Flex m={2} wrap="wrap">
            <FormControl w="" m={1}>
              {/* <InputGroup>
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
                    </InputGroup> */}
              {/* <FormHelperText color="red">
                      {formik.errors.searchName}
                    </FormHelperText> */}
            </FormControl>
            <Center>
              <FormControl m={1}>
                {/* <Select
                        color={"#285430"}
                        borderColor="#285430"
                        onChange={(event) => {
                          fetchSort(event.target.value);
                        }}
                      >
                        <option value="ASC">A-Z</option>
                        <option value="DESC">Z-A</option>
                      </Select> */}
              </FormControl>
              <FormControl m={1}>
                {/* <Select
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
                      </Select> */}
              </FormControl>
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
        {/* </Flex>
          </Center>
        </Flex>
      </Center> */}
        <Box>
          {/* <Box display="flex" justifyContent="center" alignContent="center">
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
        </Box> */}

          <Center>
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
                        <Image
                          ml="10px"
                          mb={"10px"}
                          boxSize={"100px"}
                          src={
                            `${process.env.REACT_APP_API_BASE_URL}/` +
                            item.Product.picture
                          }
                        />
                        <Text
                          mt={"10"}
                          pb={"10px"}
                          as={"b"}
                          size="md"
                          color={"#285430"}
                        >
                          {item.Product.productName}
                        </Text>
                        <Box>
                          {!item.Product.Price.discPrice ? (
                            <Text fontSize={"xs"}>
                              {" "}
                              {new Intl.NumberFormat("IND", {
                                style: "currency",
                                currency: "IDR",
                              }).format(item.Product.Price.productPrice)}
                            </Text>
                          ) : (
                            <Text fontSize={"xs"} as="s">
                              {" "}
                              {new Intl.NumberFormat("IND", {
                                style: "currency",
                                currency: "IDR",
                              }).format(item.Product.Price.productPrice)}
                            </Text>
                          )}
                        </Box>
                        <Box>
                          {!item.Product.Price.discPrice ? (
                            ""
                          ) : (
                            <Text fontSize={"xs"}>
                              {" "}
                              {new Intl.NumberFormat("IND", {
                                style: "currency",
                                currency: "IDR",
                              }).format(item.Product.Price.discPrice)}
                              <Badge>Promo</Badge>
                            </Text>
                          )}
                        </Box>
                        <Text fontSize={"sm"} color={"#285430"}>
                          {item.stockQty} pcs
                        </Text>
                      </CardBody>
                      <CardFooter>
                        {item.Branch.Product_Carts.find(
                          (item2) => item2.UserId !== id
                        ) ? (
                          <Button
                            disabled
                            w="full"
                            borderRadius="9px"
                            size="sm"
                            my="5px"
                          >
                            <Icon boxSize="4" as={FaCartArrowDown} mr="5px" x />
                            to Cart
                          </Button>
                        ) : (
                          <Button
                            onClick={() =>
                              onAddCart(item.Product.id, item.Branch.id)
                            }
                            bgColor={"#A4BE7B"}
                            borderColor="#285430"
                            border="2px"
                            fontSize="14px"
                            color="gray.800"
                            width={"180px"}
                            justifyContent="center"
                          >
                            <Icon as={FaCartArrowDown} w="5" h="5" m="2" />
                            to Cart
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </div>
                );
              })}
            </SimpleGrid>
          </Center>
        </Box>
      </Box>
    </div>
  );
};