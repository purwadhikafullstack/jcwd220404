import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Center } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { AddAddressComp } from "../components/AddAddressComp";
import { DetailAddressComp } from "../components/DetailAddressComp";

export const AddressPage = () => {
  return (
    <div>
      <Center>
        <Box w={"390px"} h={"844px"} bgColor="white">
          <Box as={Link} to={"/account"}>
            <ArrowBackIcon mt={"20px"} 
            // pos={"fixed"} 

            />
          </Box>
          <Box
            mt={"100px"}
            className="body"
            bgColor="white"
            h={"844px"}
            w={"390px"}
          >
            <AddAddressComp />
           
          </Box>
        </Box>
      </Center>
    </div>
  );
};