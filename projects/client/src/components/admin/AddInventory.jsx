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
  const inputQty = useRef(0);
  const inputEntryDate = useRef("");
  const inputBranch = useRef("");
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const { id } = useSelector((state) => state.adminSlice.value);

  const getBranch = async (AdminId) => {
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

  const getData = async (BranchId) => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/inventory/findAllByBranch/${data4}`
      );
      setData2(res.data);
      console.log(res.data[0]?.id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [data4]);

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
      setTimeout(() => window.location.replace("/admin/inventory"), 2000);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBranch();
  }, [id]);

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
                {/* {data2?.map((item) => {
                  return (
                    <Tr>
                      <Td color={"#285430"}>{item.Product.productName}</Td>
                      <Td>{item.entryDate}</Td>
                      <Td textAlign={"center"} color={"#285430"}>
                        {item.stockQty}
                      </Td>
                    </Tr>
                  );
                })} */}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          ml="120px"
          mt="215px"
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
