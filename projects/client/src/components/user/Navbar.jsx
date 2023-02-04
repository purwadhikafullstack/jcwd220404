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
import { Badge, Center, color, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import "../NavbarComp.css";

export const NavbarComp = () => {
  const data = useSelector((state) => state.cartSlice.value);
  const data2 = useSelector((state) => state.transactionSlice.value);
  const location = useLocation();
  const navigate = useNavigate();

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
    <div>
        <Center>

      <Badge zIndex={2} borderRadius="2xl" mb={"10px"} 
      ml="100px"   bg="#FE0013"
      color={"gray.800"}
      >
          {data?.length}
        </Badge>
        <Badge zIndex={2} borderRadius="2xl" mb={"10px"} 
        ml="50px"   bg="#FE0013"
        color={"gray.800"}
        >
          {data2?.length}
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
    </div>
  );
};
