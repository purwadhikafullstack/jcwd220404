import { Box, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PopoutCheckout } from "../../components/user/PopoutCheckout";
import { CartComp } from "../../components/user/Cart";
import { NavbarComp } from "../../components/user/Navbar";
import { OrderNowComp } from "../../components/user/OrderNow";
import { AccountPage } from "./AccountUser";

export const CartPage = () => {
  const navigate = useNavigate();
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
            <Box margin={"auto"} alignItems={"center"} textColor="black">
              CART
            </Box>
          </Box>
          <Box
            mt={"100px"}
            mb={"100px"}
            className="body"
            bgColor="white"
            h={"1750px"}
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
