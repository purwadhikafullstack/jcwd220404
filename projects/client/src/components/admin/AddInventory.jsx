import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EditIcon } from "@chakra-ui/icons";
import { UpdateInventory } from "./UpdateInventory";
import { BsFilterLeft } from "react-icons/bs";
import { BiReset, BiSearchAlt } from "react-icons/bi";
import { useFormik } from "formik";
import * as Yup from "yup";

export const InventoryAdminComp = () => {
  const [branch, setBranch] = useState();
  const inputBranch = useRef("");
  const inputProductName = useRef("");
  const inputEntryDate = useRef("");
  const inputQty = useRef("");
  const [data2, setData2] = useState();
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState();
  const [data5, setData5] = useState();
  const [edit, setEdit] = useState({});
  const { id } = useSelector((state) => state.adminSlice.value);
  const data = useSelector((state) => state.inventorySlice.value);
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("ASC");
  const [order, setOrder] = useState("productName");
  const [searchProduct, setSearchProduct] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [state, setState] = useState(0);


  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const [overlay, setOverlay] = useState(<OverlayOne />);

  const getInventory = async () => {
    try {
      const res = await Axios.get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/inventory/pagInventory?search_query=${searchProduct}&page=${
          page - 1
        }&limit=${limit}&order=${order ? order : `productName`}&sort=${
          sort ? sort : "ASC"
        }`
      );
      // dispatch(syncData(res.data.result));
      console.log(res.data);
      setTotalPage(Math.ceil(res.data.totalRows / res.data.limit));
      setState(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInventory();
  }, [searchProduct, page, limit, sort]);

  useEffect(() => {
    fetchSort();
  }, []);

  async function fetchSort(filter) {
    setSort(filter);
  }

  const getBranch = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/branch/adminByBranch/${id}`
      );
      setBranch(res.data);
      console.log(res.data);
      setData4(res.data.id);
      console.log(res.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBranch();
  }, [id]);

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/inventory/findAllByBranch/${data4}`
      );
      setData2(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [data4, edit]);

  const getProduct = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/list`
      );
      setData3(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const onCreate = async () => {
    try {
      const addProduct = {
        AdminId: id,
        ProductId: inputProductName.current.value,
        stockQty: inputQty.current.value,
        entryDate: inputEntryDate.current.value,
        BranchId: data4,
      };
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/inventory/create`,
        addProduct
      );
      Swal.fire({
        icon: "success",
        text: "Stock Updated",
      });
      setTimeout(() => window.location.replace("/admin"), 2000);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const findStock = async () => {
    try {
      const stock = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/inventory/find/${data4}`
      );
      console.log(stock.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    findStock();
  }, [data4]);

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
    <div>
      <Flex
        color={useColorModeValue("#285430")}
        border="2px"
        borderRadius="xl"
        w={"32.8vw"}
        mt="17px"
        ml="17vw"
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
                  // onChange={(event) => {
                  //   fetchSort(event.target.value);
                  // }}
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
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </Select>
              </FormControl>
              <FormControl w="" m={1}>
                <FormLabel fontSize="x-small" color="#285430">
                  Search Inventory
                </FormLabel>
                <InputGroup>
                  <Input
                    placeholder="Search Inventory"
                    _placeholder={{ color: "#5F8D4E" }}
                    borderColor="#285430"
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
        </Box>
      </Flex>
      <Flex ml={"78px"}>
        <Box>
          <TableContainer mt={"15px"} w="55vw" bgColor={"white"}>
            <Table variant="simple" colorScheme="#285430">
              <Thead alignContent={"center"}>
                <Tr>
                  <Th color={"#285430"}>Product</Th>
                  <Th color={"#285430"}>Entry Date</Th>
                  <Th color={"#285430"}>Quantity</Th>
                  <Th color={"#285430"}>Final Stock</Th>
                  <Th color={"#285430"}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data2?.map((item) => {
                  return (
                    <Tr>
                      <Td color={"#285430"}>{item.Product.productName}</Td>
                      <Td>{item.entryDate}</Td>
                      <Td textAlign={"center"} color={"#285430"}>
                        {item.stockQty}
                      </Td>
                      <Td textAlign={"center"} color={"#285430"}>
                        {item?.totalQty}
                      </Td>
                      <Td>
                        <Box
                          mr="28px"
                          display={"flex"}
                          justifyContent="space-evenly"
                        >
                          <Button
                            onClick={() => {
                              setEdit(item);
                              setOverlay(<OverlayOne />);
                              onOpen();
                            }}
                          >
                            <EditIcon color={"#285430"} />
                          </Button>
                        </Box>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          {overlay}
          <ModalContent bgColor={"#E5D9B6"} color="#285430" border="2px">
            <ModalHeader textColor={"#285430"}>Edit Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UpdateInventory data={edit} />
            </ModalBody>
          </ModalContent>
        </Modal>
        <Box
          ml="40px"
          mt="20px"
          h={"550px"}
          color={useColorModeValue("#285430")}
          border="2px"
          borderRadius="2xl"
        >
          <Box
            w={"300px"}
            m="20px"
            mb="25px"
            borderWidth="2px"
            boxShadow="xl"
            borderRadius="8px"
            borderColor="#285430"
          >
            <Box
              pt="10px"
              h="50px"
              borderTopRadius="8px"
              align="center"
              bg="#E5D9B6"
              fontSize="18px"
            >
              <Text
                mx="10px"
                justifyContent="center"
                fontWeight="bold"
                color="#285430"
              >
                Add Stock
              </Text>
            </Box>
            <Stack spacing={"10px"}>
              <FormControl>
                <FormLabel
                  color="#285430"
                  mt="10px"
                  ml="8px"
                  fontSize="18px"
                  as={"b"}
                >
                  Branch
                </FormLabel>
                <Input
                  ref={inputBranch}
                  color={"#285430"}
                  borderColor="#285430"
                  ml="5px"
                  w="97%"
                  defaultValue={branch?.branchName}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel
                  color="#285430"
                  mt="10px"
                  ml="8px"
                  fontSize="18px"
                  as={"b"}
                >
                  Product{" "}
                </FormLabel>

                <Select
                  ref={inputProductName}
                  color={"#285430"}
                  borderColor="#285430"
                  ml="5px"
                  w="97%"
                >
                  <option>Select Product</option>
                  {data3?.map((item) => {
                    return (
                      <>
                        <option value={item.id}>{item.productName}</option>
                      </>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel
                  color="#285430"
                  mt="10px"
                  ml="8px"
                  fontSize="18px"
                  as={"b"}
                >
                  Entry Date
                </FormLabel>
                <Input
                  textColor="gray.800"
                  borderColor="#285430"
                  ml="5px"
                  w="97%"
                  ref={inputEntryDate}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel
                  color="#285430"
                  mt="10px"
                  ml="8px"
                  fontSize="18px"
                  as={"b"}
                >
                  Quantity
                </FormLabel>
                <Input
                  textColor="gray.800"
                  borderColor="#285430"
                  ml="5px"
                  w="97%"
                  ref={inputQty}
                ></Input>
              </FormControl>
              <Center>
                <Button
                  mb="20px"
                  bgColor={"#A4BE7B"}
                  borderColor="#285430"
                  border="2px"
                  fontSize="18px"
                  color="gray.800"
                  width={"50%"}
                  justifyContent="center"
                  onClick={onCreate}
                >
                  Add Stock
                </Button>
              </Center>
            </Stack>
          </Box>
        </Box>
      </Flex>
    </div>
  );
};
