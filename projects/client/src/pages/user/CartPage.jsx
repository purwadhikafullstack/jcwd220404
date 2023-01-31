import { Box, Center, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CartComp } from "../../components/user/CartComp";
import { NavbarComp } from "../../components/user/NavbarComp";
import { OrderNowComp } from "../../components/user/OrderNowComp";

export const CartPage = () => {
  const tokenLocalStorage = localStorage.getItem("tokenUser");

  return (
    <>
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
              <Box margin={"auto"} alignItems={"center"} textColor="#285430">
          <Text as={"b"} fontSize="xl">
            CART
          </Text>
        </Box>
          </Box>
          <Box
            mt={"80px"}
            pt={"15px"}
            className="body"
            bgColor="white"
            h={"100%"}
            pb={"80px"}
            w={"390px"}
          >
            {tokenLocalStorage ? <CartComp /> : <OrderNowComp />}
          </Box>
            
          <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}>
            <NavbarComp />
          </Box>
        </Box>
      </Center>
    </>
  );
};