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
  const [data7, setData7] = useState();
  const [data8, setData8] = useState();
  const { id } = useSelector((state) => state.adminSlice.value);
  const { isOpen, onClose, onToggle } = useDisclosure();

  const getData7 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listAll/${id}`
      );
      setData7(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData7();
  }, [id]);

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listWaitingPayment/${id}`
      );
      setData(result.data);
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

      getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <TableContainer mt="30px" w="60vw" ml={"120px"} bgColor={"white"}>
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
                Status
              </Th>
              <Th textAlign={"center"} color={"#285430"}>
                Payment Proof
              </Th>
              <Th textAlign={"center"} color={"#285430"}>
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data7?.map((item) => {
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
                    {item.status}
                  </Td>
                  <Td>
                    <Image
                      boxSize={"50px"}
                      src={
                        `${process.env.REACT_APP_API_BASE_URL}/` + item.picture
                      }
                    ></Image>
                  </Td>
                  <Td textAlign={"center"} color={"#285430"}>
                    {item.status === "Waiting Confirm Payment" ? (
                      <>
                        <Button onClick={() => setOrder(item.id)}>
                          <BsFillCheckSquareFill color={"green"} size="22" />
                        </Button>
                        <Button onClick={() => setCancelled(item.id)}>
                          <FaWindowClose color={"red"} size="25" />
                        </Button>
                      </>
                    ) : (
                      ""
                    )}
                    {item.status === "On Process" ? (
                      <>
                        <Button onClick={() => setDelivery(item.id)}>
                          <BsFillCheckSquareFill color={"green"} size="22" />
                        </Button>
                        <Button onClick={() => setCancelled(item.id)}>
                          <FaWindowClose color={"red"} size="25" />
                        </Button>
                      </>
                    ) : (
                      ""
                    )}
                    {item.status === "Waiting Payment" ? (
                      <>
                        {/* <Button onClick={() => setCancelled(item.id)}>
                          <BsFillCheckSquareFill color={"green"} size="22" />
                        </Button> */}
                        <Button onClick={() => setCancelled(item.id)}>
                          <FaWindowClose color={"red"} size="25" />
                        </Button>
                      </>
                    ) : (
                      ""
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
