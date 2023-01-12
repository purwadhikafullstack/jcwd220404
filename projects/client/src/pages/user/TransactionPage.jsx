import { Box, Center } from "@chakra-ui/react";
import { NavbarComp } from "../../components/user/NavbarComp";
import { OrderNowComp } from "../../components/user/OrderNowComp";
import { TransactionComp } from "../../components/user/TransactionComp";
import { AccountPage } from "./AccountPage";

export const TransactionPage = () => {
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
              ORDERS
            </Box>
          </Box>
          <Box
            className="body"
            bgColor="white"
            h={"1750px"}
            w={"390px"}
            mt="100px"
          >
            {tokenLocalStorage ? <TransactionComp /> : <OrderNowComp />}
          </Box>
          <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}>
            <NavbarComp />
          </Box>
        </Box>
      </Center>
    </>
  );
};
