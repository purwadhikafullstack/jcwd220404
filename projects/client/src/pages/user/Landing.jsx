import { Box, Center, VStack } from "@chakra-ui/react";
import { LogoComp } from "../../components/user/Logo";
import { NotificationComp } from "../../components/user/Notification";
import { SearchComp } from "../../components/user/Search";
import { NavbarComp } from "../../components/user/Navbar";
import { CarouselComp } from "../../components/user/Carousel";
import { MenuComp } from "../../components/user/Menu";
import { DefaultAddress } from "../../components/user/DefaultAddress";
import { BlankAddress } from "../../components/user/BlankAddress";

export const LandingPage = () => {
  const tokenLocalStorage = localStorage.getItem("tokenUser");

  return (
    <>
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
            <NotificationComp />
          </Box>
          {tokenLocalStorage ? <DefaultAddress /> : <BlankAddress />}
          <Box className="body" bgColor="white" h={"2000px"} w={"390px"}>
            <VStack>
              <CarouselComp />
              {/* <SearchComp /> */}
              <MenuComp />
            </VStack>
          </Box>
          <Box
            className="footer"
            w={"390px"}
            pos="fixed"
            bottom={"35px"}
            zIndex="2"
          >
            <NavbarComp />
          </Box>
        </Box>
      </Center>
    </>
  );
};
