import { Box, Button, Center, StackDivider, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { AccountComp } from "../components/AccountComp";
import { EnterComp } from "../components/EnterComp";
import { NavbarComp } from "../components/NavbarComp";

export const AccountPage = () => {
  const tokenLocalStorage = localStorage.getItem("tokenUser");

  return (
    <div>
      <Center>
        <Box w={"390px"} h={"844px"} bgColor="white">
          {tokenLocalStorage ? <AccountComp /> : <EnterComp />}
          {/* <EnterComp />
          <AccountComp /> */}

          <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}>
            <NavbarComp />
          </Box>
        </Box>
      </Center>
    </div>
  );
};
