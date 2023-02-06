import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  HStack,
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
import Swal from "sweetalert2";

export const TransactionComp = () => {
  const [profile, setProfile] = useState("upload");
  const [image, setImage] = useState("");
  const [data, setData] = useState();
  const [data2, setData2] = useState();
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
      console.log(result.data);
      setData(result.data);
      setData2(result.data[1]?.id);
      console.log(result.data[0]?.id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const handleChoose = (e) => {
    console.log("e.target.files", e.target.files);
    setImage(e.target.files[0]);
  };

  const handleUpload = async (TransactionId) => {
    const data = new FormData();
    console.log(data);
    data.append("file", image);
    console.log(data.get("file"));

    const resultImage = await Axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/transaction/single-uploaded/${TransactionId}`,
      data,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    console.log(resultImage.data);
    setProfile(resultImage.data.picture);
    setImage({ images: "" });
    console.log(image);
    console.log(profile);
    Swal.fire({
      icon: "success",
      text: "Success",
      width: "370px",
    });
    window.location.replace("/transaction");
  };

  return (
    <div>
      {data?.map((item) => {
        return (
          <Center>
            <Box
              w={"370px"}
              mb="10px"
              boxShadow={"md"}
              border="1px"
              borderRadius="10px"
              borderColor={"#285430"}
            >
              <Stack textColor={"#285430"} ml={"10px"} spacing={5} mb={2}>
                <Box as={Link} to={`/transaction/${item.id}`}>
                  <Text align={"left"} mt={"10px"}>
                    Order No. {item.id_order}
                  </Text>
                  <Text align={"left"}>Delivered Date: {dateNow}</Text>
                </Box>
                <Flex>
                  <HStack>
                    <CiCreditCard1 color="#285430"></CiCreditCard1>
                    <CiBag1 color="#285430" />
                    <CiDeliveryTruck color="#285430" />
                    <CiInboxIn color="#285430" />
                  </HStack>
                </Flex>
                <Box>
                  <Text align={"left"}>
                    {new Intl.NumberFormat("IND", {
                      style: "currency",
                      currency: "IDR",
                    }).format(item.totalOrder)}
                  </Text>
                  <Flex>
                    {/* <Text mb={"10px"}>{item.status}</Text> */}
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
                        onClick={() => handleUpload(item.id)}
                        w="50px"
                        fontSize={"10px"}
                      >
                        Upload
                      </Button>
                    </ButtonGroup>
                  </Flex>
                </Box>
              </Stack>
            </Box>
          </Center>
        );
      })}
    </div>
  );
};
