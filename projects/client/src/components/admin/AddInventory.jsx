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
import { useParams } from "react-router-dom";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { UpdateInventory } from "./UpdateInventory";

export const InventoryAdminComp = () => {
  const [branch, setBranch] = useState();
  const inputBranch = useRef("");
  const [data2, setData2] = useState();
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState();
  const [edit, setEdit] = useState({});
  const { id } = useSelector((state) => state.adminSlice.value);
  const data = useSelector((state) => state.inventorySlice.value);
  const params = useParams();
  console.log(data)
  console.log(edit)

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

  // const onCreate = async () => {
  //   try {
  //     const addProduct = {
  //       AdminId: id,
  //       ProductId: inputProductName.current.value,
  //       stockQty: inputQty.current.value,
  //       entryDate: inputEntryDate.current.value,
  //       BranchId: data4,
  //     };
  //     const res = await Axios.post(
  //       `${process.env.REACT_APP_API_BASE_URL}/inventory/create`,
  //       addProduct
  //     );
  //     Swal.fire({
  //       icon: "success",
  //       text: "Stock Updated",
  //     });
  //     setTimeout(() => window.location.replace("/admin"), 2000);
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
                      <Td>
                        <Box
                          mr="28px"
                          display={"flex"}
                          justifyContent="space-evenly"
                        >
                          <Button
                            onClick={() => {
                              setEdit(item);
                            }}
                          >
                            <EditIcon color={"#285430"} />
                          </Button>
                          <Button
                            onClick={() => {
                              // onDelete(item.id)
                            }}
                          >
                            <DeleteIcon color={"#285430"} />
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
        <UpdateInventory data={edit}/>
      </Flex>
    </div>
  );
};
