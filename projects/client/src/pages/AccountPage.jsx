import { Box, Center } from "@chakra-ui/react";
import { AccountComp } from "../components/AccountComp";
import { WindowComp } from "../components/WindowComp";
import { NavbarComp } from "../components/NavbarComp";

export const AccountPage = () => {
  const tokenLocalStorage = localStorage.getItem("tokenUser");

  return (
    <div>
      <Center>
        <Box w={"390px"} h={"844px"} bgColor="white">
          {tokenLocalStorage ? <AccountComp /> : <WindowComp />}
          <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}>
            <NavbarComp />
          </Box>
        </Box>
      </Center>
    </div>
  );
};