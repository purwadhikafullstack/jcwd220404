import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Center } from "@chakra-ui/react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { AddAddressComp } from "../../components/AddAddressComp";

export const AddressPage = () => {
  const params = useParams()

  return (
    <div>
      <Center>
        <Box w={"390px"} h={"844px"} bgColor="white">
          <Box as={Link} to={`/account/address`}>
            <ArrowBackIcon mt={"20px"} pos={"fixed"} />
          </Box>
          <Box
            mt={"100px"}
            className="body"
            bgColor="black"
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