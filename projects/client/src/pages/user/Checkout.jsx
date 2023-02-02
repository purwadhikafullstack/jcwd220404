import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export const Checkout = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const [data5, setData5] = useState();
  const [data6, setData6] = useState();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/list/${data6}`
      );
      setData(result.data);
      console.log(result.data);
      setData6(result.data.id);
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
  }, [data6]);

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
                  <Text>Rp{data?.totalOrder}</Text>
                  <Text>xx.xxx</Text>
                </Box>
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel>Payment Subtotal</FormLabel>

              <Flex justify={"space-between"}>
                <Text>Delivery Charge</Text>
                <Text>Rp{data?.totalCharge}</Text>
              </Flex>
            </FormControl>
            <Flex justify={"space-between"}>
              <Text as={"b"}>Total</Text>
              <Text as={"b"}>Rp{data2}</Text>
            </Flex>
            <Button onClick={toPayment} w={"100%"}>
              Proceed Payment
            </Button>
          </Box>
        </Center>
      </Box>
    </div>
  );
};
