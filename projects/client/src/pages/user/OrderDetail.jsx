import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import { Box, Center, Flex, HStack, Text } from "@chakra-ui/react";
import {
  CiBag1,
  CiCreditCard1,
  CiDeliveryTruck,
  CiInboxIn,
} from "react-icons/ci";
import { ArrowBackIcon } from "@chakra-ui/icons";

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
            display={"flex"}
            justifyContent="space-between"
            pt={"10px"}
            pl={"1px"}
            pos="fixed"
            top={"0"}
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
            h={"100vh"}
            w={"390px"}
            mt="80px"
            pt="10px"
          >
            <Flex ml={"10px"}>
              <HStack>
                <CiCreditCard1 color="#285430"></CiCreditCard1>
                <CiBag1 color="#285430" />
                <CiDeliveryTruck color="#285430" />
                <CiInboxIn color="#285430" />
              </HStack>
            </Flex>
            <Text ml={"10px"} color={"#285430"} placeholder={dateNow}>
              Please proceed Payment before{" "}
            </Text>
          </Box>
        </Box>
      </Center>
    </div>
  );
};