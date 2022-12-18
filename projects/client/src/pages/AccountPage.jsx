import { Box, Center} from "@chakra-ui/react";
import { NavbarComp } from "../HomeComponent/NavbarComp";

export const AccountPage = () => {
 
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
            <Box margin={"auto"} alignItems={"center"} textColor="black">
              ACCOUNT
            </Box>
          </Box>
          <Box className="body" bgColor="white" h={"1750px"} w={"390px"} />
          <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}>
            <NavbarComp />
          </Box>
        </Box>
      </Center>
    </div>
  );
};
