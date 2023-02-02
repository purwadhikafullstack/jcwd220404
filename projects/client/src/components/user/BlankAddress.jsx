import { Button } from "@chakra-ui/button";
import {  Flex, Stack, Text } from "@chakra-ui/layout";
import React from "react";

export const BlankAddress = () => {
  return (
    <div>
      <Flex ml={"15px"} pr={"20px"} mt="90px">
        <Stack>
          <Button
            _placeholder={{ color: "#5F8D4E" }}
            // bgColor="#E5D9B6"
            w={"360px"}
            textColor="black"
            borderColor={"#285430"}
          >
            <Text color={"#285430"}>
              Deliver to: Please login to get your Delivery
            </Text>
          </Button>
        </Stack>
      </Flex>
    </div>
  );
};
