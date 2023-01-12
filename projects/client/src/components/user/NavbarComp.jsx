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
import { Center, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import "../../components/user/NavbarComp";
import { useNavigate, useLocation } from "react-router-dom";

export const NavbarComp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuBar = [
    {
      icon1: IoHomeOutline,
      icon2: IoHome,
      name: "Home",
      url: "/",
    },
    {
      icon1: IoGridOutline,
      icon2: IoGrid,
      name: "Category",
      url: "/category",
    },
    {
      icon1: IoCartOutline,
      icon2: IoCart,
      name: "Cart",
      url: "/cart",
    },
    {
      icon1: IoNewspaperOutline,
      icon2: IoNewspaper,
      name: "Order",
      url: "/transaction",
    },
    {
      icon1: IoPersonOutline,
      icon2: IoPerson,
      name: "Account",
      url: "/account",
    },
  ];

  const toPage = (url) => {
    navigate(url);
  };

  return (
    <>
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
