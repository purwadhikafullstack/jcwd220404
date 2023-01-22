import { Box, Button, Center, Flex, Grid, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { cartSync } from "../redux/cartSlice";

export const PopoutCheckout = ({ props }) => {
  console.log(props);
  const [data, setData] = useState([]);
  // const data = useSelector((state) => state.cartSlice.value)
  const navigate = useNavigate();
  const { id } = useSelector((state) => state.userSlice.value);
  const dispatch = useDispatch()

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/cart/findCheckout/${id}`
      );
      console.log(res.data);
      setData(res.data)
      // dispatch(cartSync(res.data))
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div>
      <Center>
        <Flex
          w={[300, 350, 390]}
          h="70px"
          bgColor="teal"
          color="gray.800"
          dropShadow="2xl"
          // pb={"1000px"}
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
              <Text>{props}</Text>
              {data?.map((item) => {
                return (
                  <>
                  {/* <Text>{item.Product?.weight}g</Text> */}
                    <Text>Rp{item.Product?.Price?.productPrice}</Text>
                  </>
                );
              })}
              {/* <Button onClick={toCheckout}>Checkout</Button> */}
            </Flex>
          </Flex>
        </Flex>
      </Center>
    </div>
  );
};
