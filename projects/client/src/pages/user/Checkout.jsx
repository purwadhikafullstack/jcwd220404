import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AddAddress } from "../../components/user/AddAddress";
import { ListAddress } from "../../components/user/ListAddress";
import { ListCheckoutAddress } from "./ListCheckoutAddress";

export const Checkout = () => {
  const [value, setValue] = useState("0");

  return (
    <div>
      <Box>
        <Center>
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
            zIndex={"2"}
          >
            <Box as={Link} to={"/cart"}>
              <ArrowBackIcon
                mt={"20px"}
                ml={"20px"}
                pos={"fixed"}
                color="#285430"
                fontSize={"25px"}
              />
              <Box margin={"auto"} alignItems={"center"} textColor="#285430">
                <Text m="100px" as={"b"} fontSize="xl">
                  ADD ADDRESS
                </Text>
              </Box>
            </Box>
          </Box>
          <Box
            mt={"100px"}
            className="body"
            bgColor="white"
            h={"100%"}
            w={"390px"}
          >
            <FormControl>
              <FormLabel>Delivery Address</FormLabel>
              <ListAddress />
            </FormControl>
            <FormControl>
              <FormLabel>Shipping Method</FormLabel>
              <RadioGroup onChange={setValue} value={value}>
                <Stack direction="column">
                  <Radio value="1">
                    <Box>
                      <Text>JNE Reguler</Text>
                      <Text>ETA</Text>
                      <Text>Cost</Text>
                    </Box>
                  </Radio>
                  <Radio value="2">
                    <Text>JNE Yes</Text>
                    <Text>ETA</Text>
                    <Text>Cost</Text>
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Order Detail</FormLabel>
            </FormControl>
            <FormControl>
              <FormLabel>Order Note</FormLabel>
              <Textarea></Textarea>
            </FormControl>
            <FormControl>
              <FormLabel>Voucher</FormLabel>
              <Button>Apply Voucher</Button>
            </FormControl>
          </Box>
        </Center>
      </Box>
    </div>
  );
};
