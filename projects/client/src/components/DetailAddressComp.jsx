import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import React from "react";

export const DetailAddressComp = () => {
  return (
    <div>
      <Stack mt={"20px"}>
        <FormControl>
          <FormControl>
            <FormLabel>Nama Penerima</FormLabel>
            <Flex>
              <Input placeholder="Name"></Input>
            </Flex>
          </FormControl>
          <FormControl>
            <FormLabel>No. Telepon Penerima</FormLabel>
            <Input placeholder="08xxx" type={"text"}></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Email Penerima</FormLabel>
            <Input placeholder="yourname@example.com"></Input>
          </FormControl>
        </FormControl>
        <Button>Save</Button>
      </Stack>
    </div>
  );
};
