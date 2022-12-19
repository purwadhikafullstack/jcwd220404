import { Box, Center, VStack } from "@chakra-ui/react";
import { LogoComp } from "../components/HomeComponent/LogoComp";
import { NotificationComp } from "../components/HomeComponent/NotificationComp";
import { SearchComp } from "../components/HomeComponent/SearchComp";
import { NavbarComp } from "../components/HomeComponent/NavbarComp";
import { CarouselComp } from "../components/HomeComponent/CarouselComp";
import { Menu } from "../components/HomeComponent/MenuComp";

export const LandingPage = () => {
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
          <Box className="body" bgColor="white" h={"1750px"} w={"390px"}>
            <VStack>
              <CarouselComp />
              <Menu />
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
