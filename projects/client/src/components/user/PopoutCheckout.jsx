import { Box, Button, Center, Flex, Grid, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { cartSync } from "../../redux/cartSlice";

export const PopoutCheckout = ({ props }) => {
  console.log(props);
  const [data, setData] = useState([]);
  const [totalCheckout, setTotalCheckout] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  // const data = useSelector((state) => state.cartSlice.value)
  const navigate = useNavigate();
  const { id } = useSelector((state) => state.userSlice.value);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/cart/findCheckout/${id}`
      );
      const selectedItem = res.data
        .filter((item) => item.status === true)
        .map((item) => item.totalCheckout)
        .reduce((a, b) => a + b);
      console.log(selectedItem);
      const selectedWeight = res.data
        .filter((item) => item.status === true)
        .map((item) => item.totalWeight)
        .reduce((a, b) => a + b);
      console.log(selectedWeight);
      setTotalCheckout(selectedItem);
      setTotalWeight(selectedWeight);
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id, props]);

  return (
    <div>
      <Center>
        <Flex
          w={[300, 350, 390]}
          h="70px"
          // bgColor="teal"
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
              <Text>Rp{totalCheckout}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Center>
    </div>
  );
};
