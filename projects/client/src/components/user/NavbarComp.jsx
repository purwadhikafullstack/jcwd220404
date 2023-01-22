import { useNavigate, useLocation } from "react-router-dom";
import {
  IoHomeOutline,
  IoHome,
  IoGridOutline,
  IoGrid,
  IoCartOutline,
  IoCart,
  IoNewspaperOutline,
  IoNewspaper,
  IoPersonOutline,
  IoPerson,
} from "react-icons/io5";
import { Badge, Box, Center, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Axios from "axios";
import { cartSync } from "../../redux/cartSlice";
import { useEffect } from "react";

export const NavbarComp = () => {
  // const [data, setData] = useState();
  const data = useSelector((state) => state.cartSlice.value);
  const location = useLocation();
  const navigate = useNavigate();
  const { id, cart } = useSelector((state) => state.userSlice.value);
  const dispatch = useDispatch();
  // console.log(data);

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/cart/findBy/${id}`
      );
      console.log(res.data);
      dispatch(cartSync(res.data));
      // setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const menuBar = [
    {
      icon1: IoHomeOutline,
      icon2: IoHome,
      icon3: "",
      name: "Home",
      url: "/",
    },
    {
      icon1: IoGridOutline,
      icon2: IoGrid,
      icon3: "",
      name: "Category",
      url: "/category",
    },
    {
      icon1: IoCartOutline,
      icon2: IoCart,
      icon3: Badge,
      name: "Cart",
      url: `/cart`,
    },
    {
      icon1: IoNewspaperOutline,
      icon2: IoNewspaper,
      icon3: Badge,
      name: "Order",
      url: "/transaction",
    },
    {
      icon1: IoPersonOutline,
      icon2: IoPerson,
      icon3: "",
      name: "Account",
      url: "/account",
    },
  ];

  const toPage = (url) => {
    navigate(url);
  };

  return (
    <>
      <Center ml={"70px"}>
        <Badge zIndex={2} borderRadius="2xl" mb={"10px"} ml="30px">
          {data?.length}
        </Badge>
        <Badge zIndex={2} borderRadius="2xl" mb={"10px"} ml="50px">
          0
        </Badge>
      </Center>
      <Center>
        <Flex
          w={[300, 350, 390]}
          h="70px"
          bgColor="#E5D9B6"
          color="gray.800"
          dropShadow="2xl"
          position="fixed"
        >
          <Flex
            justifyContent="space-evenly"
            align="center"
            w={[300, 350, 390]}
          >
            {menuBar.map((item, index) => {
              return (
                <VStack
                  w="50px"
                  h="70px"
                  justifyContent="center"
                  _hover={{ cursor: "pointer" }}
                  borderTop={location.pathname === item.url ? "4px" : ""}
                  onClick={() => toPage(item.url, index)}
                  key={index}
                  className={location.pathname === item.url ? "active" : ""}
                >
                  <Icon
                    className="icon"
                    w={7}
                    h={7}
                    as={
                      location.pathname === item.url ? item.icon2 : item.icon1
                    }
                  />

                  {location.pathname === item.url ? (
                    <Text
                      justifyItems="center"
                      className="name"
                      fontSize="small"
                      fontWeight="bold"
                    >
                      {item.name}
                    </Text>
                  ) : null}
                </VStack>
              );
            })}
          </Flex>
        </Flex>
      </Center>
    </>
  );
};
