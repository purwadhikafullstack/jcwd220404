import { Box, Center, VStack } from "@chakra-ui/react"

export const NotificationPage = () => {
    return (
        <div>
            <Center>
        <Box w={"390px"} h={"844px"} bgColor="white">
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
              NOTIFICATIONS
            </Box>
          </Box>
          <Box className="body" bgColor={"white"} h={"1750px"} w={"390px"}>
            <VStack></VStack>
          </Box>
          <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}>
            <NavbarComp />
          </Box>
        </Box>
      </Center>
    </div>
  );
};
