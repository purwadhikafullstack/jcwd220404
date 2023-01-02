import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Center } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AddressComp } from "../components/AddAddressComp";

export const AddressPage = () => {
  return (
    <div>
      <Center>
        <Box w={"390px"} h={"844px"} bgColor="white">
          <Box as={Link} to={"/account/address"}>
            <ArrowBackIcon mt={"20px"} pos={"fixed"} />
          </Box>
          <Box
            mt={"100px"}
            className="body"
            bgColor="white"
            h={"1750px"}
            w={"390px"}
          >
            <AddressComp />
          </Box>
        </Box>
      </Center>
    </div>
  );
};
