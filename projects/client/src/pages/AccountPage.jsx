import { Box, Center } from "@chakra-ui/react";
import { AccountComp } from "../components/HomeComponent/AccountComp";
import { EnterComp } from "../components/HomeComponent/EnterComp";
import { NavbarComp } from "../components/HomeComponent/NavbarComp";

export const AccountPage = () => {
  return (
    <div>
      <Center>
        <Box w={"390px"} h={"844px"} bgColor="white">
          <EnterComp />
          <AccountComp />

          <Box
            className="footer"
            w={"390px"}
            h={"75px"}
            pos="fixed"
            bottom={"0"}
            mt={"702px"}
            bgColor="#E5D9B6"
            justify={{ base: "center", md: "space-between" }}
            align={{ base: "center", md: "center" }}
          >
            <NavbarComp />
          </Box>
        </Box>
      </Center>
    </div>
  );
};
