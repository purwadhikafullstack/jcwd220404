import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../../redux/addressSlice";
import { DefaultAddress } from "../../components/user/DefaultAddress";
import { CartComp } from "../../components/user/Cart";

export const Checkout = () => {
  const [value, setValue] = useState("0");
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const [totalCheckout, setTotalCheckout] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  // const { data } = useSelector((state) => state.addressSlice.value);
  const { id } = useSelector((state) => state.userSlice.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/cart/findCheckout/${id}`
      );
      const selectedItem = res.data
        .filter((item) => item.status === true)
        .map((item) => item.totalCheckout)
        .reduce((a, b) => a + b);
      console.log(selectedItem);
      console.log(res.data);
      const selectedWeight = res.data
        .filter((item) => item.status === true)
        .map((item) => item.totalWeight)
        .reduce((a, b) => a + b);
      console.log(selectedWeight);
      setTotalCheckout(selectedItem);
      setTotalWeight(selectedWeight);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const toPayment = () => {
    navigate("/checkout/payment/success");
  };

  return (
    <div>
      <Box>
        <Center>
          <Box
            className="header"
            w={"390px"}
            h={"80px"}
            bgColor="#E5D9B6"
            display={"flex"}
            justifyContent="space-between"
            pt={"10px"}
            pl={"1px"}
            pos="fixed"
            top={"0"}
            zIndex={"2"}
          >
            <Box as={Link} to={"/cart"}>
              <ArrowBackIcon
                mt={"20px"}
                ml={"20px"}
                pos={"fixed"}
                color="#285430"
                fontSize={"25px"}
              />
            </Box>
            <Box margin={"auto"} alignItems={"center"} textColor="#285430">
              <Text m="100px" as={"b"} fontSize="xl">
                CHECKOUT
              </Text>
            </Box>
          </Box>
          <Box
            mt={"100px"}
            className="body"
            bgColor="white"
            h={"100%"}
            w={"390px"}
          >
           
            <FormControl>
              <FormLabel>Order Detail</FormLabel>
              {data?.map((item) => {
                return (
                  <Card margin={"10px"}>
                    <Flex mb={"50px"} justify={"space-between"}>
                      <Grid
                        templateAreas={`"nav main""nav footer"`}
                        gridTemplateRows={"50px 1fr 30px"}
                        gridTemplateColumns={"120px 1fr"}
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
                          Rp{item.totalCheckout}
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
              <FormLabel>Voucher</FormLabel>
              <Button w={"100%"}>Apply Voucher</Button>
            </FormControl>
            <FormControl>
              <FormLabel>Payment Detail</FormLabel>
              <Flex justify={"space-between"}>
                <Box>
                  <Text>Subtotal Produk</Text>
                  <Text>Voucher</Text>
                </Box>
                <Box>
                  <Text>Rp{totalCheckout}</Text>
                  <Text>xx.xxx</Text>
                </Box>
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel>Payment Subtotal</FormLabel>

              <Flex justify={"space-between"}>
                <Text>Delivery Charge</Text>
                <Text>xx.xxx</Text>
              </Flex>
            </FormControl>
            <Flex justify={"space-between"}>
              <Text as={"b"}>Total</Text>
              <Text as={"b"}>xx.xxx</Text>
            </Flex>
            <Button onClick={toPayment} w={"100%"}>
              Checkout
            </Button>
          </Box>
        </Center>
      </Box>
    </div>
  );
};
