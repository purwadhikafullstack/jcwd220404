import { Center, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { cartSync } from "../redux/cartSlice";

export const PopoutCheckoutComp = ({ props }) => {
  console.log(props);
  const [data, setData] = useState([]);
  const [totalCheckout, setTotalCheckout] = useState(0);
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
      console.log(res.data);
      setTotalCheckout(selectedItem);
      setData(res.data);
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
          as={"b"}
          textColor="#285430"
          border={"2px"}
          borderRadius="md"
          borderColor={"#285430"}
          justifyContent="space-evenly"
          align="center"
          w={[300, 350, 370]}
        >
          <Flex justify={"space-between"}>
            <Text>Rp.{totalCheckout}</Text>
          </Flex>
        </Flex>
      </Center>
    </div>
  );
};
