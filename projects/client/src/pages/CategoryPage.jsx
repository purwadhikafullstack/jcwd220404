import { Box, Center } from "@chakra-ui/react";
import { NavbarComp } from "../components/HomeComponent/NavbarComp";
import {CategoryComp} from "../components/HomeComponent/CategoryComp"

export const CategoryPage = () => {
  return (
    <div>
      <Center>
        <Box w={"390px"} h={"844px"} bgColor="white">
          <Box
            className="header"
            w={"390px"}
            h={"80px"}
            bgColor="#E5D9B6"
            display={"flex"}
            justifyContent="space-between"
            pt={"10px"}
            pl={"1px"}
            pos="fixed"
            top={"0"}
          >
            <Box margin={"auto"} alignItems={"center"} textColor="black">
              Categories
            </Box>
          </Box>
          <Box className="body" bgColor={"white"} h={"800px"} w={"390px"}>
            <CategoryComp />
          </Box>
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
