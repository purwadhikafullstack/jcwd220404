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
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";

export const Checkout = () => {
  const [data, setData] = useState([]);
  const [totalCheckout, setTotalCheckout] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const { id } = useSelector((state) => state.userSlice.value);
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
      const selectedWeight = res.data
        .filter((item) => item.status === true)
        .map((item) => item.totalWeight)
        .reduce((a, b) => a + b);
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
            mt={"80px"}
            className="body"
            bgColor="white"
            h={"100%"}
            pb={"75px"}
            w={"390px"}
          >
            <FormControl mt={"10px"} ml={"10px"} textColor="#285430">
              <FormLabel>Payment Option</FormLabel>
              <Box variant={"unstyled"}>
                <Checkbox value="1">
                  <Text>Bank Transfer via Only Fresh Account</Text>
                </Checkbox>
              </Box>
            </FormControl>
            <FormControl>
              <FormLabel mt={"10px"} ml={"10px"} textColor="#285430">
                Order Detail
              </FormLabel>
              {data?.map((item) => {
                return (
                  <Card
                    margin={"10px"}
                    w="370px"
                    border={"1px"}
                    borderColor="#285430"
                    borderRadius={"md"}
                    bgColor="white"
                    textColor={"#285430"}
                  >
                    <Flex mb={"50px"} justify={"space-between"}>
                      <Grid
                        templateAreas={`"nav main""nav footer"`}
                        gridTemplateRows={"50px 1fr 30px"}
                        gridTemplateColumns={"120px 1fr"}
                        h="30px"
                        fontWeight="bold"
                      >
                        <GridItem pl="10px" pt="10px" area={"nav"}>
                          <Image
                            boxSize={"60px"}
                            src={
                              `${process.env.REACT_APP_API_BASE_URL}/` +
                              item.Product.picture
                            }
                          ></Image>
                        </GridItem>
                        <GridItem
                          textColor={"#285430"}
                          fontSize={"small"}
                          pt="10px"
                          area={"main"}
                        >
                          {item.Product?.productName}
                        </GridItem>
                        <GridItem
                          textColor={"#285430"}
                          fontSize={"small"}
                          area={"footer"}
                        >
                          <Text mt={"10px"} ml={"10px"} textColor="#285430">
                            {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.totalCheckout)}
                          </Text>
                        </GridItem>
                      </Grid>
                      <Text fontSize={"small"} pt="10px" pr={"40px"} as="b">
                        {item.totalWeight} g
                      </Text>
                      <Text fontSize={"small"} pt="10px" pr={"40px"} as="b">
                        {item.qty}x
                      </Text>
                    </Flex>
                  </Card>
                );
              })}
            </FormControl>
            <FormControl>
              <FormLabel mt={"10px"} ml={"10px"} textColor="#285430">
                Voucher
              </FormLabel>
              <Button
                ml={"10px"}
                w={"370px"}
                bgColor={"#A4BE7B"}
                borderColor="#285430"
                border="2px"
                fontSize="16px"
                color="gray.800"
                justifyContent="center"
              >
                Apply Voucher
              </Button>
            </FormControl>
            <FormControl>
              <FormLabel mt={"10px"} ml={"10px"} textColor="#285430">
                Payment Detail
              </FormLabel>
              <Flex justify={"space-between"}>
                <Box>
                  <Text mt={"10px"} ml={"10px"} textColor="#285430">
                    Subtotal Produk
                  </Text>
                  <Text mt={"10px"} ml={"10px"} textColor="#285430">
                    Voucher
                  </Text>
                </Box>
                <Box>
                  <Text mt={"10px"} ml={"10px"} mr="10px" textColor="#285430">
                    {new Intl.NumberFormat("IND", {
                      style: "currency",
                      currency: "IDR",
                    }).format(totalCheckout)}
                  </Text>
                  <Text mt={"10px"} ml={"10px"} mr="10px" textColor="#285430">
                    xx.xxx
                  </Text>
                </Box>
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel mt={"10px"} ml={"10px"} textColor="#285430">
                Payment Subtotal
              </FormLabel>

              <Flex justify={"space-between"}>
                <Text mt={"10px"} ml={"10px"} textColor="#285430">
                  Delivery Charge
                </Text>
                <Text mt={"10px"} ml={"10px"} mr="10px" textColor="#285430">
                  xx.xxx
                </Text>
              </Flex>
            </FormControl>
            <Flex justify={"space-between"}>
              <Text as={"b"} mt={"10px"} ml={"10px"} color="#285430">
                Total
              </Text>
              <Text as={"b"} mt={"10px"} ml={"10px"} mr="10px" color="#285430">
                xx.xxx
              </Text>
            </Flex>
            <Button
              ml={"10px"}
              onClick={toPayment}
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
          </Box>
        </Center>
      </Box>
    </div>
  );
};
