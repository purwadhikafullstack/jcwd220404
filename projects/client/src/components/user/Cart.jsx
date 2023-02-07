import { useEffect, useState } from "react";
import Axios from "axios";
import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Image,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cartSync } from "../../redux/cartSlice";
import { delCart } from "../../redux/userSlice";
import { PopoutCheckout } from "./PopoutCheckout";
import { useRef } from "react";

export const CartComp = () => {
  const [checkout, setCheckout] = useState(false);
  const [totalCheckout, setTotalCheckout] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState();
  const [data6, setData6] = useState();
  const [data7, setData7] = useState(0);
  const [data8, setData8] = useState();
  const [data9, setData9] = useState();
  const [data10, setData10] = useState();
  const data = useSelector((state) => state.cartSlice.value);
  const { id } = useSelector((state) => state.userSlice.value);
  const inputRef = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/cart/findBy/${id}`
      );
      dispatch(cartSync(res.data));
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
        `${process.env.REACT_APP_API_BASE_URL}/cart/findCheckout/${id}`
      );
      const selectedItem = res.data
        .filter((item) => item.status === true)
        .map((item) => item.totalCheckout)
        .reduce((a, b) => a + b);
      console.log(selectedItem);
      const selectedWeight = res.data
        .filter((item) => item.status === true)
        .map((item) => item.totalWeight)
        .reduce((a, b) => a + b);
      console.log(selectedWeight);

      setTotalCheckout(selectedItem);
      setTotalWeight(selectedWeight);
      setData3(res.data);
      console.log(res.data);
      setData9(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCheckout();
  }, [id]);

  const onCheckout = async (id, status) => {
    try {
      const res = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/cart/cartUpdate/${id}`,
        {
          status: status ? false : true,
          id: id,
        }
      );
      getData();
      setCheckout(!checkout);
      getCheckout();
    } catch (err) {
      console.log(err);
    }
  };

  const onQty = async (idCart, qty) => {
    try {
      const res = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/cart/update/${id}`,
        {
          id: idCart,
          qty,
        }
      );
      getData();
      console.log(res.data);
      setCheckout(!checkout);
    } catch (err) {
      console.log(err);
    }
  };

  const getDefault = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/findDefault/${id}`
      );
      console.log(result.data.defaultAdd);
      setData2(result.data.defaultAdd);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDefault();
  }, [id]);

  const onDelete = async (id) => {
    try {
      await Axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/cart/remove/${id}`
      );

      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/cart/findBy/${id}`
      );
      dispatch(cartSync(result.data));
      dispatch(delCart());
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const onCharge = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/cart/findCheckout/${id}`
      );
      const selectedItem = result.data
        .filter((item) => item.status === true)
        .map((item) => item.totalCheckout)
        .reduce((a, b) => a + b);
      console.log(selectedItem);
      setData5(selectedItem);

      const selectedWeight = result.data
        .filter((item) => item.status === true)
        .map((item) => item.totalWeight)
        .reduce((a, b) => a + b);
      console.log(selectedWeight);
      setData6(selectedWeight);

      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/cart/createCost`,
        {
          origin: data2?.["Branch.cityId"],
          weight: selectedWeight,
          courier: "jne",
          destination: data2?.cityId,
        }
      );
      setData4(res.data?.rajaongkir.results[0]?.costs);
      console.log(res.data?.rajaongkir.results[0]?.costs);

      const selectedCharge =
        res.data?.rajaongkir.results[0]?.costs[data7]?.cost[0]?.value;
      console.log(selectedCharge);

      let totalOrder = selectedItem + selectedCharge;
      console.log(totalOrder);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    onCharge();
  }, [data2, data7]);

  const findOngkir = async () => {
    try {
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/cart/createCost`,
        {
          origin: data2?.["Branch.cityId"],
          weight: data6,
          courier: "jne",
          destination: data2?.cityId,
        }
      );

      const selectedCharge =
        res.data?.rajaongkir.results[0]?.costs[data7]?.cost[0]?.value;
      console.log(selectedCharge);
      setData8(selectedCharge);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    findOngkir();
  }, [data7]);

  const onCreate = async (data10) => {
    try {
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/create/${id}`,
        {
          UserId: data3[0]?.UserId,
          totalOrder: data5,
          totalWeight: data6,
          totalCharge: data8,
          ProductId: data3[0]?.ProductId,
          BranchId: data9[0]?.BranchId,
        }
      );
      console.log(res.data);
      console.log(res.data.id);

      navigate(`/checkout/${res.data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box>
        <Stack spacing={"10px"}>
          <FormControl ml={"10px"} mr={"10px"}>
            <FormLabel textColor="#285430">Products</FormLabel>
            <Card w="370px" bgColor={"white"}>
              {data?.map((item) => {
                return (
                  <Flex
                    border={"1px"}
                    borderColor="#285430"
                    borderRadius={"md"}
                    mt={"5px"}
                  >
                    <Checkbox
                      ml={"10px"}
                      defaultChecked={item.status ? true : false}
                      onChange={() => onCheckout(item.id, item.status)}
                    >
                      <Grid
                        templateAreas={`"nav main""nav footer"`}
                        gridTemplateRows={" 1fr 30px"}
                        gridTemplateColumns={"120px 1fr"}
                        h="50px"
                        color="#285430"
                        fontWeight="bold"
                      >
                        <GridItem ml="8px" area={"nav"}>
                          <Image
                            boxSize={"55px"}
                            src={
                              `${process.env.REACT_APP_API_BASE_URL}/` +
                              item.Product?.picture
                            }
                          ></Image>
                        </GridItem>
                        <GridItem fontSize={"small"} ml="-6" area={"main"}>
                          {item.Product?.productName}
                        </GridItem>
                        <GridItem
                          fontSize={"small"}
                          ml="-6"
                          mt={"1"}
                          area={"footer"}
                        >
                          <Box>
                            {!item.Product.Price.discPrice ? (
                              <Text fontSize={"xs"}>
                                {" "}
                                {new Intl.NumberFormat("IND", {
                                  style: "currency",
                                  currency: "IDR",
                                }).format(item.Product.Price.productPrice)}
                              </Text>
                            ) : (
                              <Text fontSize={"xs"} as="s">
                                {" "}
                                {new Intl.NumberFormat("IND", {
                                  style: "currency",
                                  currency: "IDR",
                                }).format(item.Product.Price.productPrice)}
                              </Text>
                            )}
                          </Box>
                          <Box>
                            {!item.Product.Price.discPrice ? (
                              ""
                            ) : (
                              <Text fontSize={"xs"}>
                                {" "}
                                {new Intl.NumberFormat("IND", {
                                  style: "currency",
                                  currency: "IDR",
                                }).format(item.Product.Price.discPrice)}
                              </Text>
                            )}
                          </Box>
                        </GridItem>
                      </Grid>
                    </Checkbox>
                    <Box>
                      <Button
                        pt={"10px"}
                        ml={"50px"}
                        variant={"unstyled"}
                        onClick={() => onDelete(item.id)}
                        fontSize="sm"
                        textColor={"#285430"}
                      >
                        Delete
                      </Button>
                      <HStack
                        ml={"20px"}
                        mr="20px"
                        maxW="200px"
                        textColor={"#285430"}
                      >
                        <Button
                          pb={"4"}
                          variant={"unstyled"}
                          onClick={() => {
                            var qtyMin = item.qty - 1;
                            onQty(item.id, qtyMin);
                            qtyMin = onQty <= 0 ? 1 : onQty;
                            document.getElementById("qtyInput").value =
                              parseInt(qtyMin);
                          }}
                        >
                          -
                        </Button>
                        <Text w={"10px"}>{item.qty}</Text>
                        <Button
                          pb={"4"}
                          variant={"unstyled"}
                          onClick={() => {
                            onQty(item.id, item.qty + 1);
                          }}
                        >
                          +
                        </Button>
                      </HStack>
                    </Box>
                  </Flex>
                );
              })}
            </Card>
          </FormControl>
          <FormControl>
            <FormLabel mt={"10px"} ml={"10px"} textColor="#285430">
              Total
            </FormLabel>
            <PopoutCheckout props={checkout} />
          </FormControl>
          <FormControl>
            <FormLabel mt={"10px"} ml={"10px"} textColor="#285430">
              Shipping Method
            </FormLabel>
            <Select
              w={"370px"}
              ml="10px"
              border={"1px"}
              borderColor="#285430"
              borderRadius={"md"}
              textColor="#285430"
              ref={inputRef}
              onChange={() => setData7(inputRef.current.value)}
            >
              <option>Select Shipping Method</option>
              {data4?.map((item, index) => {
                return <option value={index}>{item.cost[0].etd} days</option>;
              })}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel mt={"10px"} ml={"10px"} textColor="#285430">
              Delivery Address
            </FormLabel>
            <Box
              ml="10px"
              border={"1px"}
              borderColor="#285430"
              borderRadius={"md"}
              w="370px"
            >
              <Text as={"b"}>{data2?.receiverName}</Text>
              <Text>{data2?.receiverPhone}</Text>
              <Text>{data2?.addressLine}</Text>
              <Text>
                {data2?.district} {data2?.city}, {data2?.province}
              </Text>
            </Box>
          </FormControl>
          <FormControl>
            <FormLabel>Order Note</FormLabel>
            <Textarea></Textarea>
          </FormControl>
          <FormControl>
            <FormLabel>Payment Option</FormLabel>
            <Box variant={"unstyled"}>
              {/* <Checkbox value="1"> */}
              <Text>Bank Transfer via Only Fresh Account</Text>
              {/* </Checkbox> */}
            </Box>
          </FormControl>
          <Button
            onClick={() => onCreate()}
            mt={"20px"}
            w={"370px"}
            bgColor={"#A4BE7B"}
            borderColor="#285430"
            border="2px"
            fontSize="16px"
            color="gray.800"
            justifyContent="center"
          >
            Checkout
          </Button>
        </Stack>
      </Box>
    </>
  );
};
