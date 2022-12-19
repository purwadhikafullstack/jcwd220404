import { Box, Center } from "@chakra-ui/react";
import { NavbarComp } from "../components/NavbarComp";
import { CategoryComp } from "../components/CategoryComp";

export const CategoryPage = () => {
  return (
    <div>
      <Center>
        <Box>
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
            zIndex="2"
          >
            <Box margin={"auto"} alignItems={"center"} textColor="black">
              CATEGORIES
            </Box>
          </Box>
          <Box className="body" bgColor={"white"} h={"1750px"} w={"390px"}>
            <CategoryComp />
          </Box>
          <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}>
            <NavbarComp />
          </Box>
        </Box>
      </Center>
    </div>
  );
};
