import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import { Box, Center, Flex, HStack, Text } from "@chakra-ui/react";
import {
  CiBag1,
  CiCreditCard1,
  CiDeliveryTruck,
  CiInboxIn,
} from "react-icons/ci";

export const OrderDetail = () => {
  const [data, setData] = useState();
  const params = useParams();
  let dateNow = new Date();
  console.log(dateNow);

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/list/${params.id}`
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
            <Box m={"auto"} alignItems={"center"} textColor="black">
              ORDER DETAIL
            </Box>
          </Box>
          <Box
            className="body"
            bgColor="white"
            h={"1750px"}
            w={"390px"}
            mt="100px"
          >
            <Flex>
              <HStack>
                <CiCreditCard1 color="grey"></CiCreditCard1>
                <CiBag1 color="grey" />
                <CiDeliveryTruck color="grey" />
                <CiInboxIn color="grey" />
              </HStack>
            </Flex>
            <Text placeholder={dateNow}>Please proceed Payment before </Text>
          </Box>
        </Box>
      </Center>
    </div>
  );
};