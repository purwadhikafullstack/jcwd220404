import { Box, Center } from "@chakra-ui/react";
import { AccountComp } from "../../components/user/AccountComp";
import { WindowComp } from "../../components/user/WindowComp";

export const AccountPage = () => {
  const tokenLocalStorage = localStorage.getItem("tokenUser");

  return (
    <div>
      <Center>
        <Box classsName="header" w={"390px"} h={"844px"} bgColor="white">
          {tokenLocalStorage ? <AccountComp /> : <WindowComp />}
          <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}></Box>
        </Box>
      </Center>
    </div>
  );
};
