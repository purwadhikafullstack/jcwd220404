import { Box, Center } from "@chakra-ui/react";
import { AccountComp } from "../../components/user/AccountComp";
import { NavbarComp } from "../../components/user/NavbarComp";
import { WindowComp } from "../../components/user/WindowComp";

export const AccountPage = () => {
  const tokenLocalStorage = localStorage.getItem("tokenUser");

  return (
    <>
      <Center>
        <Box pos={"fixed"} w={"390px"} h={"10px"} bgColor="white">
          {tokenLocalStorage ? <AccountComp /> : <WindowComp />}

          <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}>
            <NavbarComp />
          </Box>
        </Box>
      </Center>
    </>
  );
};
