import {
    Box,
    Button,
    Card,
    Center,
    Checkbox,
    Flex,
    Grid,
    GridItem,
    HStack,
    Progress,
    Stack,
    Text,
  } from "@chakra-ui/react";
  import Axios from "axios";
  import { useState } from "react";
  import { useEffect } from "react";
  import { useSelector } from "react-redux";
  import {
    CiCreditCard1,
    CiBag1,
    CiDeliveryTruck,
    CiInboxIn,
  } from "react-icons/ci";
  import { Link } from "react-router-dom";
  
  export const TransactionComp = () => {
    const [data, setData] = useState();
    const { id } = useSelector((state) => state.userSlice.value);
  
    let dateNow = new Date(
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
          `${process.env.REACT_APP_API_BASE_URL}/transaction/findById/${id}`
        );
        setData(result.data);
        console.log(result.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      getData();
    }, [id]);
  
    return (
      <div>
        {data?.map((item) => {
          return (
            <Center>
              <Box
                w={"350px"}
                boxShadow={"md"}
                borderRadius="10px"
                as={Link}
                to={`/transaction/${item.id}`}
              >
                <Stack ml={"10px"} spacing={5} mb={2}>
                  <Box>
                    <Text align={"left"} mt={"10px"}>
                      Order No. {item.id_order}
                    </Text>
                    <Text align={"left"}>Delivered Date: {dateNow}</Text>
                  </Box>
                  <Flex>
                    <HStack>
                      <CiCreditCard1 color="grey"></CiCreditCard1>
                      <CiBag1 color="grey" />
                      <CiDeliveryTruck color="grey" />
                      <CiInboxIn color="grey" />
                    </HStack>
                  </Flex>
                  <Box>
                    <Text align={"left"}>Bill Total: Rp{item.totalOrder}</Text>
                    <Text mb={"10px"}>{item.status}</Text>
                  </Box>
                </Stack>
              </Box>
            </Center>
          );
        })}
      </div>
    );
  };