import { useEffect, useState } from "react";
import Axios from "axios";
import {
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
  Text,
  Textarea,
  useNumberInput,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cartSync } from "../../redux/cartSlice";
import { delCart } from "../../redux/userSlice";
import {PopoutCheckoutComp} from "../../components/PopoutChectoutComp"
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

  const onCreate = async () => {
    try {
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/create`,
        {
          totalOrder: data5,
          totalWeight: data6,
          totalCharge: data8,
          UserId: data3[0]?.UserId,
          AdminId: data3[0]?.Product?.Inventories[1]?.AdminId,
        }
      );
      console.log(res.data);
      navigate("/checkout");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box>
        <FormControl>
          <FormLabel>Products</FormLabel>
          <Card margin={"10px"}>
            {data?.map((item) => {
              return (
                <Flex
                  borderBottom={"1px"}
                  borderColor="grey"
                  borderRadius={"10px"}
                  mt={"10px"}
                  justify={"space-between"}
                >
                  <Checkbox
                    defaultChecked={item.status ? true : false}
                    onChange={() => onCheckout(item.id, item.status)}
                  >
                    <Grid
                      templateAreas={`"nav main""nav footer"`}
                      gridTemplateRows={" 1fr 30px"}
                      gridTemplateColumns={"120px 1fr"}
                      h="50px"
                      // gap="1"
                      color="blackAlpha.700"
                      fontWeight="bold"
                    >
                      <GridItem pl="1" area={"nav"}>
                        <Image
                          boxSize={"50px"}
                          src={
                            `${process.env.REACT_APP_API_BASE_URL}/` +
                            item.Product?.picture
                          }
                        ></Image>
                      </GridItem>
                      <GridItem fontSize={"small"} ml="-12" area={"main"}>
                        {item.Product?.productName}
                      </GridItem>
                      <GridItem fontSize={"small"} ml="-12" area={"footer"}>
                        Rp{item.Product?.Price?.productPrice}
                      </GridItem>
                    </Grid>
                  </Checkbox>
                  <Box>
                    <Button
                      pl={"50px"}
                      variant={"unstyled"}
                      onClick={() => onDelete(item.id)}
                      fontSize="sm"
                    >
                      Hapus
                    </Button>
                    <HStack maxW="200px">
                      <Button
                        variant={"unstyled"}
                        onClick={() => {
                          onQty(item.id, item.qty - 1);
                        }}
                      >
                        -
                      </Button>
                      <Text w={"10px"}>{item.qty}</Text>
                      <Button
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
          <FormLabel>Total</FormLabel>
          <PopoutCheckoutComp props={checkout} />
        </FormControl>
        <FormControl>
          <FormLabel>Shipping Method</FormLabel>
          <Select
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
          <FormLabel>Buyer Information</FormLabel>
          <Text>{data2?.["User.name"]}</Text>
          <Text>{data2?.["User.phoneNumber"]}</Text>
        </FormControl>
        <FormControl>
          <FormLabel>Delivery Address</FormLabel>
          <Box border={"2px"}>
            <Text as={"b"}>{data2?.receiverName}</Text>
            <Text>
              {data2?.receiverPhone}
              {data2?.addressLine},{data2?.district},{data2?.city},
              {data2?.province}
            </Text>
            <Text>{data2?.detail}</Text>
          </Box>
        </FormControl>
        <FormControl>
          <FormLabel>Order Note</FormLabel>
          <Textarea></Textarea>
        </FormControl>
        <Button onClick={() => onCreate()} w={"100%"}>
          Select Payment Method
        </Button>
      </Box>
    </>
  );
};