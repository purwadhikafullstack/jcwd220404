import { Box, Button, Center, Flex, Grid, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const PopoutCheckout = () => {
  const navigate = useNavigate();

  const toCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div>
      <Center>
        <Flex
          w={[300, 350, 390]}
          h="70px"
          bgColor="teal"
          color="gray.800"
          dropShadow="2xl"
          position="fixed"
          mb={"200px"}
        >
          <Flex
            justifyContent="space-evenly"
            align="center"
            w={[300, 350, 390]}
          >
            <Flex justify={"space-between"}>
              <Text>Total: </Text>
              <Button onClick={toCheckout}>Checkout</Button>
            </Flex>
          </Flex>
        </Flex>
      </Center>
    </div>
  );
};
