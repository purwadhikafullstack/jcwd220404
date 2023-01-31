import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
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
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

export const InventoryAdminComp = () => {
  const [branch, setBranch] = useState();
  const inputProductName = useRef("");
  const inputQty = useRef("");
  const inputEntryDate = useRef("");
  const inputBranch = useRef("");
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const { id } = useSelector((state) => state.adminSlice.value);

  const getData = async () => {
    console.log(id);
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/inventory/findAll/${id}`
      );
      setData2(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const getProduct = async () => {
    console.log(id);
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
        BranchId: inputBranch.current.value,
      };
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/inventory/create`,
        addProduct
      );
      Swal.fire({
        icon: "success",
        text: "Stock Updated",
      });
      setTimeout(() => window.location.replace("/adminPage"), 2000);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getBranch = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/branch/findAll`
      );
      setBranch(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBranch();
  }, []);

  return (
    <div>
      <Flex>
        <Box>
          <TableContainer ml="78px" mt="215px" w="45vw" bgColor={"white"}>
            <Table variant="simple" colorScheme="#285430">
              <Thead alignContent={"center"}>
                <Tr>
                  <Th color={"#285430"}>Product</Th>
                  <Th color={"#285430"}>Entry Date</Th>
                  <Th color={"#285430"}>Quantity</Th>
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
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          p="10px"
          ml="50px"
          mt="215px"
          color={useColorModeValue("#285430")}
          border="2px"
          borderRadius="2xl"
        >
          <Box
            w={"385px"}
            m="10px"
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
                  ml="10px"
                  fontSize="18px"
                  as={"b"}
                >
                  Branch
                </FormLabel>
                <Select
                  ref={inputBranch}
                  color={"#285430"}
                  borderColor="#285430"
                  ml="10px"
                  w="360px"
                >
                  <option>Select Branch</option>
                  {branch?.map((item) => {
                    return (
                      <>
                        <option value={item.id} color="#285430">
                          {item.branchName}
                        </option>
                      </>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel
                  color="#285430"
                  mt="10px"
                  ml="10px"
                  fontSize="18px"
                  as={"b"}
                >
                  Product{" "}
                </FormLabel>

                <Select
                  ref={inputProductName}
                  color={"#285430"}
                  borderColor="#285430"
                  ml="10px"
                  w="360px"
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
                  ml="10px"
                  fontSize="18px"
                  as={"b"}
                >
                  Entry Date
                </FormLabel>
                <Input
                  textColor="gray.800"
                  borderColor="#285430"
                  ml="10px"
                  w="360px"
                  ref={inputQty}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel
                  color="#285430"
                  mt="10px"
                  ml="10px"
                  fontSize="18px"
                  as={"b"}
                >
                  Quantity
                </FormLabel>
                <Input
                  textColor="gray.800"
                  borderColor="#285430"
                  ml="10px"
                  w="360px"
                  ref={inputEntryDate}
                ></Input>
              </FormControl>
              <Center>
                <Button
                  mt={"20px"}
                  mb={"20px"}
                  w={"360px"}
                  bgColor={"#A4BE7B"}
                  borderColor="#285430"
                  border="2px"
                  fontSize="16px"
                  color="gray.800"
                  justifyContent="center"
                  onClick={onCreate}
                >
                  Confirm
                </Button>
              </Center>
            </Stack>
          </Box>
        </Box>
      </Flex>
    </div>
  );
};