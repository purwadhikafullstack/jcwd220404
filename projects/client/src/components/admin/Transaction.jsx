import {
  Box,
  Button,
  Flex,
  Image,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

export const TransactionComp = () => {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const [data4, setData4] = useState();
  const [data5, setData5] = useState();
  const [data6, setData6] = useState();
  const { username, id } = useSelector((state) => state.adminSlice.value);

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listWaitingPayment/${id}`
      );
      setData(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const getData2 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listConfirmPayment/${id}`
      );
      setData2(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData2();
  }, [id]);

  const getData3 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listOnProcess/${id}`
      );
      setData3(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData3();
  }, [id]);

  const getData4 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listDelivery/${id}`
      );
      setData4(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData4();
  }, [id]);

  const getData5 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listDone/${id}`
      );
      setData5(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData5();
  }, [id]);

  const getData6 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listCancelled/${id}`
      );
      setData6(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData6();
  }, [id]);

  const setOrder = async (id) => {
    try {
      const result = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/setOrder/${id}`
      );
      console.log(result.data);
      getData3();
    } catch (err) {
      console.log(err);
    }
  };

  const setDelivery = async (id) => {
    try {
      const result = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/setDelivery/${id}`
      );
      console.log(result.data);
      getData4();
    } catch (err) {
      console.log(err);
    }
  };

  const setCancelled = async (id) => {
    try {
      const result = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/setCancelled/${id}`
      );
      console.log(result.data);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Box>
        <Tabs mt="50px" ml="140px">
          <TabList>
            <Tab borderRadius={"5px"}>
              <Text>Cancelled</Text>
            </Tab>
            <Tab>
              <Text>Waiting Payment</Text>
            </Tab>
            <Tab>
              <Text>Confirm Payment</Text>
            </Tab>
            <Tab>
              <Text>On Process</Text>
            </Tab>
            <Tab>
              <Text>On Delivery</Text>
            </Tab>
            <Tab>
              <Text>Done</Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TableContainer mt="30px" w="60vw" bgColor={"white"}>
                <Table variant="simple" colorScheme="#285430">
                  <Thead alignContent={"center"}>
                    <Tr>
                      <Th textAlign={"center"} color={"#285430"}>
                        Invoice
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Total Product
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Delivery Cost
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Weight
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data6?.map((item) => {
                      return (
                        <Tr>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.id_order}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.totalOrder}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.totalCharge}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.totalWeight}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <TableContainer mt="30px" w="60vw" bgColor={"white"}>
                <Table variant="simple" colorScheme="#285430">
                  <Thead alignContent={"center"}>
                    <Tr>
                      <Th textAlign={"center"} color={"#285430"}>
                        Invoice
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Total Product
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Delivery Cost
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Weight
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        ACTIONS
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.map((item) => {
                      return (
                        <Tr>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.id_order}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.totalOrder}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.totalCharge}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.totalWeight}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            <Box
                              mr="28px"
                              display={"flex"}
                              justifyContent="space-evenly"
                            >
                              <Button onClick={() => setCancelled(item.id)}>
                                <CloseIcon color={"#285430"} />
                              </Button>
                            </Box>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <TableContainer mt="30px" w="60vw" bgColor={"white"}>
                <Table variant="simple" colorScheme="#285430">
                  <Thead alignContent={"center"}>
                    <Tr>
                      <Th textAlign={"center"} color={"#285430"}>
                        Invoice
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Total Product
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Delivery Cost
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Weight
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Picture
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        ACTIONS
                      </Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {data2?.map((item) => {
                      return (
                        <Tr>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.id_order}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.totalOrder}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.totalCharge}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.totalWeight}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            <Image
                              boxSize={"50px"}
                              src={
                                `${process.env.REACT_APP_API_BASE_URL}/` +
                                item.picture
                              }
                            ></Image>
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            <Box
                              mr="28px"
                              display={"flex"}
                              justifyContent="space-evenly"
                            >
                              <Button
                                onClick={() => {
                                  setOrder(item.id);
                                }}
                              >
                                <CheckIcon color={"#285430"} />
                              </Button>
                              <Button>
                                <CloseIcon color={"#285430"} />
                              </Button>
                            </Box>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <TableContainer mt="30px" w="60vw" bgColor={"white"}>
                <Table variant="simple" colorScheme="#285430">
                  <Thead alignContent={"center"}>
                    <Tr>
                      <Th textAlign={"center"} color={"#285430"}>
                        Invoice
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Total Product
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Delivery Cost
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Weight
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        ACTIONS
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data3?.map((item) => {
                      return (
                        <Tr>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.id_order}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.totalOrder}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.totalCharge}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.totalWeight}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            <Box
                              mr="28px"
                              display={"flex"}
                              justifyContent="space-evenly"
                            >
                              <Button
                                onClick={() => {
                                  setDelivery(item.id);
                                }}
                              >
                                <CheckIcon color={"#285430"} />
                              </Button>
                              <Button>
                                <CloseIcon color={"#285430"} />
                              </Button>
                            </Box>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <TableContainer mt="30px" w="60vw" bgColor={"white"}>
                <Table variant="simple" colorScheme="#285430">
                  <Thead alignContent={"center"}>
                    <Tr>
                      <Th textAlign={"center"} color={"#285430"}>
                        Invoice
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Total Product
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Delivery Cost
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Weight
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data4?.map((item) => {
                      return (
                        <Tr>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.id_order}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.totalOrder}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.totalCharge}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.totalWeight}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <TableContainer mt="30px" w="60vw" bgColor={"white"}>
                <Table variant="simple" colorScheme="#285430">
                  <Thead alignContent={"center"}>
                    <Tr>
                      <Th textAlign={"center"} color={"#285430"}>
                        Invoice
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Total Product
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Delivery Cost
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Weight
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Picture
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data5?.map((item) => {
                      return (
                        <Tr>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.id_order}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.totalOrder}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.totalCharge}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.totalWeight}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            <Image
                              boxSize={"50px"}
                              src={
                                `${process.env.REACT_APP_API_BASE_URL}/` +
                                item.picture
                              }
                            ></Image>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};
