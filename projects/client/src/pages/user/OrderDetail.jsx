import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import { Box, Card, Center, Flex, FormControl, FormLabel, Grid, GridItem, HStack, Image, Stack, Text } from "@chakra-ui/react";
import {
  CiBag1,
  CiCreditCard1,
  CiDeliveryTruck,
  CiInboxIn,
} from "react-icons/ci";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { CompleteOrder } from "../../components/user/CompleteOrderComp";
import { CancelOrder } from "../../components/user/CancelOrderComp";

export const OrderDetail = () => {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const [data4, setData4] = useState();
  const [data5, setData5] = useState();
  const [data6, setData6] = useState();
  const [totalCheckout, setTotalCheckout] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const { id } = useSelector((state) => state.userSlice.value);
  const params = useParams();

  let dateNow = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  ).toLocaleString("en-EN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let dateDeliv = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 2
  ).toLocaleString("en-EN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/list/${params.id}`
      );
      setData(result.data);
      console.log(result.data);
      setData6(result.data.id)
      console.log(result.data.id);
      const selectedItem = result.data.totalOrder;
      const selectedCharge = result.data.totalCharge;

      let totalOrder = selectedItem + selectedCharge;
      setData2(totalOrder);
      console.log(totalOrder);

      const statusDone = result.data.status;
      setData5(statusDone);
      console.log(statusDone);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getCheckout = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listProduct/${data6}`
      );

      setData3(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCheckout();
  }, [data6]);

  const getDefault = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/findDefault/${id}`
      );
      console.log(result.data.defaultAdd);
      setData4(result.data.defaultAdd);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDefault();
  }, [id]);

  

  return (
    <div>
      <Center>
        <Box>
          <Box
            className="header"
            w={"390px"}
            h={"80px"}
            bgColor="#E5D9B6"
            display="flex"
            justifyContent="space-between"
            pt={"10px"}
            pl={"1px"}
            position="fixed"
            zIndex="2"
          >
            <Box as={Link} to={`/transaction`}>
              <ArrowBackIcon
                mt={"20px"}
                ml={"20px"}
                pos={"fixed"}
                color="#285430"
                fontSize={"25px"}
              />
            </Box>
            <Box margin={"auto"} alignItems={"center"} textColor="#285430">
              <Text as={"b"} fontSize="xl">
                ORDER DETAIL
              </Text>
            </Box>
          </Box>
          <Box
            className="body"
            bgColor="white"
            h={"1750px"}
            w={"390px"}
            mt="100px"
          >
            <Stack>
              <Flex justify={"center"}>
                <HStack>
                  <CiCreditCard1 color="grey"></CiCreditCard1>
                  <CiBag1 color="grey" />
                  <CiDeliveryTruck color="grey" />
                  <CiInboxIn color="grey" />
                </HStack>
              </Flex>
              <Text>Please proceed Payment before</Text>
              <Text>{dateNow}</Text>
              <Box>
                <FormControl>
                  <FormLabel>Order Information</FormLabel>
                  <Flex justify={"space-between"}>
                    <Text>Order-ID</Text>
                    <Text>{data?.id_order} </Text>
                  </Flex>
                  <Flex justify={"space-between"}>
                    <Text>Transaction Date</Text>
                    <Text>{dateNow} </Text>
                  </Flex>
                  <Flex justify={"space-between"}>
                    <Text>Total</Text>
                    <Text>{new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(data2)} </Text>
                  </Flex>
                </FormControl>
                <FormControl>
                  <FormLabel>Order Detail</FormLabel>
                  {data3?.map((item) => {
                    return (
                      <Card margin={"10px"}>
                        <Flex mb={"50px"} justify={"space-between"}>
                          <Grid
                            templateAreas={`"nav main""nav footer"`}
                            gridTemplateRows={"50px 1fr 30px"}
                            gridTemplateColumns={"70px 1fr"}
                            h="50px"
                            gap="1"
                            color="blackAlpha.700"
                            fontWeight="bold"
                          >
                            <GridItem pl="1" area={"nav"}>
                              <Image
                                boxSize={"50px"}
                                src={
                                  `${process.env.REACT_APP_API_BASE_URL}/` +
                                  item.Product.picture
                                }
                              ></Image>
                            </GridItem>
                            <GridItem fontSize={"small"} pl="1" area={"main"}>
                              {item.Product?.productName}
                            </GridItem>
                            <GridItem fontSize={"small"} pl="1" area={"footer"}>
                            <Text>{new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.totalCheckout)}</Text>
                            </GridItem>
                            <GridItem fontSize={"small"} pl="1" area={"footer"}>
                            <Text>{new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.totalCheckout)}</Text>
                            </GridItem>
                          </Grid>
                          <Text>{item.totalWeight} g</Text>
                          <Text>{item.qty}x</Text>
                        </Flex>
                      </Card>
                    );
                  })}
                </FormControl>
                <FormControl>
                  <FormLabel>Delivery Address</FormLabel>
                  <Box>
                    <Text as={"b"}>{data2?.receiverName}</Text>
                    <Text>{data4?.receiverPhone}</Text>
                    <Text>{data4?.addressLine}</Text>
                    <Text>
                      {data4?.district} {data4?.city}, {data4?.province}
                    </Text>
                  </Box>
                </FormControl>
                <FormControl>
                  <FormLabel>Delivery Date</FormLabel>
                  <Text align={"left"}> {dateDeliv}</Text>
                </FormControl>
              </Box>

              <Box>{data5 === true ? <CancelOrder /> : ""}</Box>
              <Box>{data5 === 4 ? <CompleteOrder /> : ""}</Box>
              <Box>{data5 === 5 || false ? "" : ""}</Box>
            </Stack>
          </Box>
        </Box>
      </Center>
    </div>
  );
};