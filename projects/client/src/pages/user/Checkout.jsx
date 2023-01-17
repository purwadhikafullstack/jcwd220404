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
import { DefaultAddress } from "../../components/DefaultAddress";
import { CartComp } from "../../components/user/CartComp";

export const Checkout = () => {
  const [value, setValue] = useState("0");
  const [data, setData] = useState([]);
  // const { data } = useSelector((state) => state.addressSlice.value);
  const { id } = useSelector((state) => state.userSlice.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/findDefault/${id}`
      );
      console.log(result.data);
      setData(result.data.defaultAdd);
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
              <Box border={"2px"}>
                <Text as={"b"}>{data?.receiverName}</Text>
                <Text>{data?.receiverPhone}</Text>
                {data?.addressLine},{data?.district},{data?.city},
                {data?.province}
                <Text>{data?.detail}</Text>
              </Box>
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
              <CartComp />
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
