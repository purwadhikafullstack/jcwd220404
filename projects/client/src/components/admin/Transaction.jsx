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
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { BsFillCheckSquareFill } from "react-icons/bs";
import { FaWindowClose } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";

import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  MdOutlineCancel,
  MdOutlinePayment,
  MdOutlinePayments,
  MdDoneOutline,
} from "react-icons/md";





export const TransactionComp = () => {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const [data4, setData4] = useState();
  const [data5, setData5] = useState();
  const [data6, setData6] = useState();
  const { id } = useSelector((state) => state.adminSlice.value);
  const { isOpen, onClose, onToggle } = useDisclosure();

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
        <Tabs variant="solid-rounded" colorScheme="">
          <TabList maxW="6xl" pl="10px" mt="50px" mx={"auto"}>
            <Tab>
              <StatsCard
                title={"Waiting Payment"}
                stat={data?.length}
                icon={<MdOutlinePayment size={"2.5em"} />}
              />
            </Tab>
            <Tab>
              <StatsCard
                title={"Cancel Order"}
                stat={data6?.length}
                icon={<MdOutlineCancel size={"2.5em"} />}
              />
            </Tab>
            <Tab>
              <StatsCard
                title={"Waiting Confirm Payment"}
                stat={data2?.length}
                icon={<MdOutlinePayments size={"2.5em"} />}
              />
            </Tab>
            <Tab>
              <StatsCard
                title={"On Process"}
                stat={data3?.length}
                icon={<GoPackage size={"2.5em"} />}
              />
            </Tab>
            <Tab>
              <StatsCard
                title={"Delivery"}
                stat={data4?.length}
                icon={<TbTruckDelivery size={"2.5em"} />}
              />
            </Tab>
            <Tab>
              <StatsCard
                title={"Done"}
                stat={data5?.length}
                icon={<MdDoneOutline size={"2.5em"} />}
              />
            </Tab>
          </TabList>
          <TabPanels ml="62px" mt={"2px"}>
            <TabPanel>
              <TableContainer mt="30px" w="83vw" bgColor={"white"}>
                <Table variant="simple" colorScheme="#285430">
                  <Thead alignContent={"center"}>
                    <Tr>
                      <Th textAlign={"center"} color={"#285430"}>
                        Invoice
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Detail Order
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Total Price
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Transfer Proof
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
                            Detail Product
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.totalOrder + item.totalCharge)}
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
            <TabPanel>
              <TableContainer mt="30px" w="83vw" bgColor={"white"}>
                <Table variant="simple" colorScheme="#285430">
                  <Thead alignContent={"center"}>
                    <Tr>
                      <Th textAlign={"center"} color={"#285430"}>
                        Invoice
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Detail Order
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Total Price
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
                            Detail Product
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.totalOrder + item.totalCharge)}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <TableContainer mt="30px" w="83vw" bgColor={"white"}>
                <Table variant="simple" colorScheme="#285430">
                  <Thead alignContent={"center"}>
                    <Tr>
                      <Th textAlign={"center"} color={"#285430"}>
                        Invoice
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Detail Order
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Total Price
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Transfer Proof
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Action
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
                            Detail Product
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.totalOrder + item.totalCharge)}
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
                            <Button onClick={() => {}}>
                              <BsFillCheckSquareFill
                                color={"green"}
                                size="22"
                              />
                            </Button>
                            <Button onClick={() => {}}>
                              <FaWindowClose color={"red"} size="25" />
                            </Button>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <TableContainer mt="30px" w="83vw" bgColor={"white"}>
                <Table variant="simple" colorScheme="#285430">
                  <Thead alignContent={"center"}>
                    <Tr>
                      <Th textAlign={"center"} color={"#285430"}>
                        Invoice
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Detail Order
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Total Price
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Transfer Proof
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Action
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
                            Detail Product
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.totalOrder + item.totalCharge)}
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
                            <Button onClick={() => {}}>
                              <BsFillCheckSquareFill
                                color={"green"}
                                size="22"
                              />
                            </Button>
                            <Button onClick={() => {}}>
                              <FaWindowClose color={"red"} size="25" />
                            </Button>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <TableContainer mt="30px" w="83vw" bgColor={"white"}>
                <Table variant="simple" colorScheme="#285430">
                  <Thead alignContent={"center"}>
                    <Tr>
                      <Th textAlign={"center"} color={"#285430"}>
                        Invoice
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Detail Order
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Total Price
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Transfer Proof
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
                            Detail Product
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.totalOrder + item.totalCharge)}
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
            <TabPanel>
              <TableContainer mt="30px" w="83vw" bgColor={"white"}>
                <Table variant="simple" colorScheme="#285430">
                  <Thead alignContent={"center"}>
                    <Tr>
                      <Th textAlign={"center"} color={"#285430"}>
                        Invoice
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Detail Order
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Total Price
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Transfer Proof
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
                            Detail Product
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.totalOrder + item.totalCharge)}
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
        px={{ base: 2, md: 1 }}
        h="88px"
        shadow={"xl"}
        border={"2px"}
        borderColor={useColorModeValue("#285430")}
        bgColor="#E5D9B6"
        rounded={"lg"}
      >
        <Flex justifyContent={"space-around"}>
          <Box w={"110px"} ml="6px">
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
