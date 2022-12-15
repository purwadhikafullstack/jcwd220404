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
import { useState } from "react";
import { Center, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import "./NavbarComp.css";

export const NavbarComp = () => {
  const [select, setSelect] = useState(0);

  const menuBar = [
    {
      icon1: IoHomeOutline,
      icon2: IoHome,
      name: "Home",
    },
    {
      icon1: IoGridOutline,
      icon2: IoGrid,
      name: "Category",
    },
    {
      icon1: IoCartOutline,
      icon2: IoCart,
      name: "Cart",
    },
    {
      icon1: IoNewspaperOutline,
      icon2: IoNewspaper,
      name: "Order",
    },
    {
      icon1: IoPersonOutline,
      icon2: IoPerson,
      name: "Account",
    },
  ];

  return (
    <div>
      <Center>
        <Flex
          w={[300, 350, 390]}
          h="7vh"
          bgColor="#E5D9B6"
          justifyContent=""
          color="gray"
          dropShadow="2xl"
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
                  pt="2"
                  h="7vh"
                  justifyContent="center"
                  _hover={{ cursor: "pointer" }}
                  borderTop={index === select ? "4px" : ""}
                  onClick={() => setSelect(index)}
                  key={index}
                  className={index === select ? "active" : ""}
                >
                  <Icon
                    className="icon"
                    w={7}
                    h={7}
                    as={index === select ? item.icon2 : item.icon1}
                  />
                  {index === select ? (
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
