import { Box, Button, Center, Flex, Grid, Text } from "@chakra-ui/react";

export const PopoutCheckout = () => {
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
              <Button>Checkout</Button>
            </Flex>
          </Flex>
        </Flex>
      </Center>
    </div>
  );
};
