import { StarIcon } from "@chakra-ui/icons";
import { Box, Button, Input } from "@chakra-ui/react";

export const DefaultAddress = () => {
  return (
    <div>
      <Box pr={"20px"} mt="100px">
        <Button
          _placeholder={{ color: "#5F8D4E" }}
          bgColor="#E5D9B6"
          w={"105%"}
          textColor="black"
          borderColor={"#285430"}
        >
          <StarIcon />
          Address
        </Button>
      </Box>
    </div>
  );
};
