import { Box, Center, VStack, StackDivider, Button } from "@chakra-ui/react";
import { NavbarComp } from "../components/NavbarComp";
import { AccountComp } from "../components/HomeComponent/AccountComp";
import { EnterComp } from "../components/HomeComponent/EnterComp";

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
            <Box margin={"auto"} alignItems={"center"} textColor="black">
              ACCOUNT
            </Box>
          </Box>
          <Box className="body" bgColor="white" h={"1750px"} w={"390px"} />
          <VStack
            mt={"250px"}
            divider={<StackDivider borderColor="gray.200" />}
            spacing={"10px"}
            align="stretch"
          >
            <Button textColor={"black"} h="40px">
              My Address
            </Button>
            <Button ml={"10px"} textColor={"black"} h="40px" as="button">
              Privacy and Policy
            </Button>
            <Button ml={"10px"} textColor={"black"} h="40px" as="button">
              Help
            </Button>
            <Button ml={"10px"} textColor={"black"} h="40px" as="button">
              Account Settings
            </Button>
            <Box margin={"auto"} alignItems={"center"} bgColor={"ButtonShadow"}>
              Versi Aplikasi - 2.5.0
            </Box>
          </VStack>
          <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}>
            <NavbarComp />
          </Box>
        </Box>
      </Center>
    </div>
  );
};
