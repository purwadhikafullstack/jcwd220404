import { Box, Center, VStack } from "@chakra-ui/react";
import { LogoComp } from "../../components/user/LogoComp";
import { NotificationComp } from "../../components/user/NotificationComp";
import { SearchComp } from "../../components/user/SearchComp";
import { NavbarComp } from "../../components/user/NavbarComp";
import { CarouselComp } from "../../components/user/CarouselComp";
import { MenuComp } from "../../components/user/MenuComp";
import { DefaultAddressComp } from "../../components/DefaultAddressComp";

export const LandingPage = () => {
  const tokenLocalStorage = localStorage.getItem("tokenUser");
  return (
    <div>
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
            <LogoComp />
            <SearchComp />
            <NotificationComp />
          </Box>
          <Box
            className="body"
            bgColor="white"
            h={"200vh"}
            w={"390px"}
            >
            <VStack>
            {tokenLocalStorage ? <DefaultAddressComp /> : ""}
              <CarouselComp />
              <MenuComp />
            </VStack>
          </Box>
          <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}>
            <NavbarComp />
          </Box>
        </Box>
      </Center>
    </div>
  );
};
