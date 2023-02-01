import {
  Box,
  Button,
  Flex,
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
} from "@chakra-ui/react";
import { MdOutlinePayment } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { FaWindowClose } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";
import { MdDoneOutline } from "react-icons/md";
import React from "react";

import Axios from "axios";
import { useState, useEffect } from "react";

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
        <Tabs variant='solid-rounded' colorScheme="">
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
                title={"Confirm Payment"}
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
                        Transfer Proof
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Action
                      </Th>
                      <Th textAlign={"center"} color={"#285430"}>
                        Status
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
                            {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.totalOrder)}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.totalCharge)}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {item.totalWeight}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {/* {item.totalWeight} */}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                          <Button
                              onClick={() => {
                              }}
                            >
                            <BsFillCheckSquareFill color={"green"} size="22"/>
                            </Button>
                            <Button onClick={() => {}}>
                              <FaWindowClose color={"red"} size="25"/>
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
                            {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.totalOrder)}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.totalCharge)}
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
                            {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.totalOrder)}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.totalCharge)}
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
                            {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.totalOrder)}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.totalCharge)}
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
                            {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.totalOrder)}
                          </Td>
                          <Td textAlign={"center"} color={"#285430"}>
                            {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.totalCharge)}
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
        px={{ base: 2, md: 5 }}
        py={"5"}
        shadow={"xl"}
        border={"2px solid"}
        borderColor={useColorModeValue("#285430")}
        bgColor="#E5D9B6"
        rounded={"lg"}
      >
        <Flex justifyContent={"space-between"}>
          <Box w={"120px"}>
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