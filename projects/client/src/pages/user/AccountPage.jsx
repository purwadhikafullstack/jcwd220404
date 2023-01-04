import { Box, Center, Flex } from "@chakra-ui/react";
import { AccountComp } from "../../components/user/AccountComp";
import { EnterComp } from "../../components/user/EnterComp";
import { NavbarComp } from "../../components/user/NavbarComp";

export const AccountPage = () => {
  const tokenLocalStorage = localStorage.getItem("tokenUser");

  return (
    <div>
      <Center>
        <Box w={"390px"} h={"844px"} bgColor="white">
          {tokenLocalStorage ? <AccountComp /> : <EnterComp />}

          <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}>
            <NavbarComp />
          </Box>
        </Box>
      </Center>
    </div>
  );
};
