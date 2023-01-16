import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../../redux/addressSlice";

export const Checkout = () => {
  const [value, setValue] = useState("0");
  const [product, setProduct] = useState();
  const { data } = useSelector((state) => state.addressSlice.value);
  const { id } = useSelector((state) => state.userSlice.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/list`
      );
      console.log(res.data);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/addressById/${id}`
      );
      console.log(result.data);
      dispatch(syncData(result.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const toPayment = () => {
    navigate("/checkout/payment");
  };

  const toListAddress = () => {
    navigate("/checkout/address");
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
              <FormLabel>Delivery Address</FormLabel>
              {data?.map((item) => {
                return (
                  <Box
                    ml="8px"
                    mr="8px"
                    mt="8px"
                    p="4"
                    border={"2px"}
                    borderColor={"#285430"}
                    borderRadius="xl"
                  >
                    <Flex justify={"space-between"}>
                      <Box>
                        <Text color={"#285430"}>{item.addressLine}</Text>
                        <Text color={"#285430"}>{item.receiverName}</Text>
                        <Text color={"#285430"}>{item.receiverPhone}</Text>
                      </Box>
                      <Button
                        variant={"unstyled"}
                        as={"button"}
                        onClick={toListAddress}
                      >
                        Edit Address
                      </Button>
                    </Flex>
                    <Flex>
                      <Text color={"#285430"}>{item.district},</Text>
                      <Text color={"#285430"}>{item.city},</Text>
                      <Text color={"#285430"}>{item.province}</Text>
                    </Flex>
                    <Text color={"#285430"}>{item.detail}</Text>
                  </Box>
                );
              })}{" "}
            </FormControl>
            <FormControl>
              <FormLabel>Shipping Method</FormLabel>
              <RadioGroup onChange={setValue} value={value}>
                <Stack direction="column">
                  <Box border={"2px"}>
                    <Radio value="1">
                      <Text>JNE Reguler</Text>
                      <Text>ETA</Text>
                      <Text>Cost</Text>
                    </Radio>
                  </Box>
                  <Box border={"2px"}>
                    <Radio value="2">
                      <Text>JNE Yes</Text>
                      <Text>ETA</Text>
                      <Text>Cost</Text>
                    </Radio>
                  </Box>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Order Detail</FormLabel>
              {product?.map((item) => {
                return (
                  <Flex justify={"space-between"}>
                    <Grid>
                      <Image
                        boxSize={"50px"}
                        alt="picture"
                        src={
                          `${process.env.REACT_APP_API_BASE_URL}/` +
                          item.picture
                        }
                      ></Image>
                      <Text>{item.productName}</Text>
                      <Text>price</Text>
                    </Grid>
                    <Text>qty</Text>
                  </Flex>
                );
              })}
            </FormControl>
            <FormControl>
              <FormLabel>Order Note</FormLabel>
              <Textarea></Textarea>
            </FormControl>
            <FormControl>
              <FormLabel>Voucher</FormLabel>
              <Button w={"100%"}>Apply Voucher</Button>
              <FormControl>
                <FormLabel>Payment Detail</FormLabel>
                <Flex justify={"space-between"}>
                  <Box>
                    <Text>Subtotal Produk</Text>
                    <Text>Voucher</Text>
                  </Box>
                  <Box>
                    <Text>xx.xxx</Text>
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
                Proceed Payment
              </Button>
            </FormControl>
          </Box>
        </Center>
      </Box>
    </div>
  );
};
