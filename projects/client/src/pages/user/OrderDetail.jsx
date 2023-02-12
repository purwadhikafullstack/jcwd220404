import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { CompleteButton } from "../../components/user/CompleteButton";
import { CancelButton } from "../../components/user/CancelButton";
import Swal from "sweetalert2";

export const OrderDetail = () => {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const [data4, setData4] = useState();
  const [data5, setData5] = useState();
  const [data6, setData6] = useState();
  const [data7, setData7] = useState();
  const { id } = useSelector((state) => state.userSlice.value);
  const params = useParams();
  const [profile, setProfile] = useState("upload");
  const [image, setImage] = useState("");

  let dateNow = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  ).toLocaleString("en-EN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let dateDeliv = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 2
  ).toLocaleString("en-EN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let dateDeliv2 = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 1
  ).toLocaleString("en-EN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let dateTimeout = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    new Date().getHours(),
    new Date().getMinutes() + 30
  ).toLocaleString("en-EN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/list/${params.id}`
      );
      setData(result.data);
      console.log(result.data);
      setData6(result.data.id);
      setData7(result.data.createdAt);
      const selectedItem = result.data.totalOrder;
      const selectedCharge = result.data.totalCharge;

      let totalOrder = selectedItem + selectedCharge;
      setData2(totalOrder);

      const statusDone = result.data.status;
      setData5(statusDone);
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
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listProduct/${data6}`
      );
      setData3(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCheckout();
  }, [data6]);

  const getDefault = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/findDefault/${id}`
      );
      setData4(result.data.defaultAdd);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDefault();
  }, [id]);

  const handleChoose = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async (TransactionId) => {
    const data = new FormData();
    data.append("file", image);

    const resultImage = await Axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/transaction/single-uploaded/${TransactionId}`,
      data,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    setProfile(resultImage.data.picture);
    setImage({ images: "" });
    Swal.fire({
      icon: "success",
      text: "Success",
      width: "370px",
    });
    window.location.replace("/transaction");
  };

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
            h={"90vh"}
            w={"390px"}
            mt="80px"
          >
            <Stack>
              <Flex justify={"center"}></Flex>
              <Center>
                <Box
                  w={"370px"}
                  border={"1px"}
                  borderColor="#285430"
                  borderRadius={"md"}
                >
                  <Text pl={"10px"} color="#285430">
                    Please proceed Payment before
                  </Text>
                  <Text>
                    {
                      <Text>
                        {new Date(
                          new Date(data?.createdAt).getTime() + 30 * 60000
                        ).toLocaleString("en", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}{" "}
                      </Text>
                    }
                  </Text>
                </Box>
              </Center>
              <Box>
                <FormControl>
                  <FormLabel mt={"1px"} pl={"10px"} color="#285430">
                    Order Information
                  </FormLabel>
                  <Box
                    w={"370px"}
                    border={"1px"}
                    borderColor="#285430"
                    borderRadius={"md"}
                  >
                    <Flex justify={"space-between"}>
                      <Text>Order-ID</Text>
                      <Text>{data?.id_order} </Text>
                    </Flex>
                    <Flex justify={"space-between"}>
                      <Text>Transaction Date</Text>
                      <Text>
                        {new Date(data?.createdAt).toLocaleString("en", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}{" "}
                      </Text>
                    </Flex>
                    <Flex justify={"space-between"}>
                      <Text pl={"10px"} color="#285430">
                        Total
                      </Text>
                      <Text pr={"10px"} color="#285430">
                        {new Intl.NumberFormat("IND", {
                          style: "currency",
                          currency: "IDR",
                        }).format(data2)}{" "}
                      </Text>
                    </Flex>
                  </Box>
                </FormControl>
                <FormControl>
                  <FormLabel>Order Detail</FormLabel>
                  {data3?.map((item) => {
                    return (
                      <Card
                        margin={"10px"}
                        w="370px"
                        bgColor={"white"}
                        border={"1px"}
                        borderColor="#285430"
                        borderRadius={"md"}
                        mt={"5px"}
                      >
                        <Flex mb={"8px"} justify={"space-between"}>
                          <Grid
                            templateAreas={`"nav main""nav footer"`}
                            gridTemplateRows={"20px 1fr 30px"}
                            gridTemplateColumns={"70px 1fr"}
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
                              {new Intl.NumberFormat("IND", {
                                style: "currency",
                                currency: "IDR",
                              }).format(item.totalCheckout)}{" "}
                            </GridItem>
                            {/* <GridItem fontSize={"small"} pl="1" area={"footer"}>
                              Rp{item.totalCharge}
                            </GridItem> */}
                          </Grid>
                          <Text>{item.totalWeight} g</Text>
                          <Text>{item.qty}x</Text>
                        </Flex>
                      </Card>
                    );
                  })}
                </FormControl>
                <FormControl>
                  <FormLabel>Delivery Address</FormLabel>
                  <Box
                    border={"1px"}
                    borderColor="#285430"
                    borderRadius={"md"}
                    w="370px"
                    pl={"10px"}
                  >
                    <Text as={"b"}>{data2?.receiverName}</Text>
                    <Text>{data4?.receiverPhone}</Text>
                    <Text>{data4?.addressLine}</Text>
                    <Text>
                      {data4?.district} {data4?.city}, {data4?.province}
                    </Text>
                  </Box>
                </FormControl>
                <FormControl pl="10px" color={"#285430"}>
                  <FormLabel pt={"10px"}>Delivery Date</FormLabel>
                  <Box>
                    {data3?.totalCharge % 10000 === 0 ? (
                      <Text align={"left"}>
                        {" "}
                        {new Date(
                          new Date(data?.createdAt).getTime() + 3600 * 60000 
                        ).toLocaleString("en", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}{" "}
                      </Text>
                    ) : (
                      <Text align={"left"}>
                        {" "}
                        {new Date(
                          new Date(data?.createdAt).getTime() + 2400 * 60000 
                        ).toLocaleString("en", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}{" "}
                      </Text>
                    )}
                  </Box>
                </FormControl>
              </Box>
              <FormControl>
                <FormLabel>Upload Payment Proof</FormLabel>
                <Box>
                  <ButtonGroup fontSize={"10px"} size="10px">
                    <form encType="multipart/form-data">
                      <input
                        type={"file"}
                        accept="image/*"
                        name="file"
                        onChange={(e) => handleChoose(e)}
                      ></input>
                    </form>
                    <Button
                      bgColor={"#A4BE7B"}
                      borderColor="#285430"
                      border="1px"
                      color="gray.800"
                      onClick={() => handleUpload(data6)}
                      w="50px"
                      fontSize={"10px"}
                    >
                      Upload
                    </Button>
                  </ButtonGroup>
                </Box>
              </FormControl>
              <Box>{data5 === "Waiting Payment" ? <CancelButton /> : ""}</Box>
              <Box>{data5 === "On Delivery" ? <CompleteButton /> : ""}</Box>
              <Box>{data5 === "Done" || "Order Cancelled" ? "" : ""}</Box>
            </Stack>
          </Box>
        </Box>
      </Center>
    </div>
  );
};
