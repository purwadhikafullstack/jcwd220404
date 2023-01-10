import { Box, Center } from "@chakra-ui/react";
import { AccountComp } from "../../components/user/AccountComp";
import { HeroComp } from "../../components/HeroComp";
import { NavbarComp } from "../../components/user/NavbarComp";

export const AccountPage = () => {
  const tokenLocalStorage = localStorage.getItem("tokenUser");

  return (
    <div>
      <Center>
        <Box classsName="header" w={"390px"} h={"844px"} bgColor="white">
          {tokenLocalStorage ? <AccountComp /> : <HeroComp />}
          <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}></Box>
          {/* <NavbarComp /> */}
        </Box>
      </Center>
    </div>
  );
};