import { Box, Button, Center, Flex, Grid, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";

export const PopoutCheckout = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useSelector((state) => state.userSlice.value);

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/cart/findCheckout/${id}`
      );
      console.log(res.data.carts);
      setData(res.data.carts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const toCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div>
      <Center>
        <Flex
          w={[300, 350, 390]}
          h="70px"
          bgColor="teal"
          color="gray.800"
          dropShadow="2xl"
          position="fixed"
          mb={"800px"}
          // zIndex="2"
          // pos="fixed"
        >
          <Flex
            justifyContent="space-evenly"
            align="center"
            w={[300, 350, 390]}
          >
            <Flex justify={"space-between"}>
              <Text>Total:</Text>
              {data?.map((item) => {
                return <Text>Rp{item.Product?.Price?.productPrice}</Text>;
              })}
              <Button onClick={toCheckout}>Checkout</Button>
            </Flex>
          </Flex>
        </Flex>
      </Center>
    </div>
  );
};
