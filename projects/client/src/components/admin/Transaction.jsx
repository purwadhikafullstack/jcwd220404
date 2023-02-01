import {
  Box,
  Button,
  Flex,
  Image,
  Stat,
  StatLabel,
  StatNumber,
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
import { MdOutlinePayment } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { GoPackage } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";
import { MdDoneOutline } from "react-icons/md";
import React from "react";

import Axios from "axios";
import { useState, useEffect } from "react";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

export const TransactionComp = () => {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const [data4, setData4] = useState();
  const [data5, setData5] = useState();

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listWaitingPayment`
      );
      setData(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData2 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listConfirmPayment`
      );
      setData2(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData2();
  }, []);

  const getData3 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listOnProcess`
      );
      setData3(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData3();
  }, []);

  const getData4 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listDelivery`
      );
      setData4(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData4();
  }, []);

  const getData5 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listDone`
      );
      setData5(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData5();
  }, []);

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
                        Transaction ID
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
                            {item.id}
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
                                  // setEdit(item);
                                  // console.log("test2")
                                }}
                              >
                                <CheckIcon color={"#285430"} />
                              </Button>
                              <Button
                              // onClick={() => onDelete(item.id)}
                              >
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
                        Transaction ID
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
                            {item.id}
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
                                  // setEdit(item);
                                  // console.log("test2")
                                }}
                              >
                                <CheckIcon color={"#285430"} />
                              </Button>
                              <Button
                              // onClick={() => onDelete(item.id)}
                              >
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
                        Transaction ID
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
                            {item.id}
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
                                  // setEdit(item);
                                  // console.log("test2")
                                }}
                              >
                                <CheckIcon color={"#285430"} />
                              </Button>
                              <Button
                              // onClick={() => onDelete(item.id)}
                              >
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
                        Transaction ID
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
                    {data4?.map((item) => {
                      return (
                        <Tr>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.id}
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
                                  // setEdit(item);
                                  // console.log("test2")
                                }}
                              >
                                <CheckIcon color={"#285430"} />
                              </Button>
                              <Button
                              // onClick={() => onDelete(item.id)}
                              >
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
                        Transaction ID
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
                            {item.id}
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

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <div>
      <Stat
        px={{ base: 2, md: 4 }}
        py={"5"}
        shadow={"xl"}
        border={"2px solid"}
        borderColor={useColorModeValue("#285430")}
        bgColor="#E5D9B6"
        rounded={"lg"}
      >
        <Flex justifyContent={"space-between"}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={"medium"} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={"auto"}
            color={useColorModeValue("#285430")}
            alignContent={"center"}
          >
            {icon}
          </Box>
        </Flex>
      </Stat>
    </div>
  );
}
