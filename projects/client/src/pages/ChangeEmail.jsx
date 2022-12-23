import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import Axios from "axios";
import React from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const ChangeEmail = (data) => {
  const inputEmail = useRef("");
  const navigate = useNavigate();

  const updateEmail = async () => {
    try {
      const user = {
        email: inputEmail.current.value,
      };
      const result = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/user/updateEmail/6`,
        user
      );
      // setTimeout(() => navigate(`/verification/${result.data.token} `), 2000);
      console.log(result);
      // navigate("/account/profile");
      Swal.fire({
        icon: "success",
        text: "Email has changed",
        // text: `${result.data}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Center>
        <Box w={"390px"} h={"844px"} bgColor="white">
          <Box as={Link} to={"/account/profile"}>
            <ArrowBackIcon mt={"20px"} pos={"fixed"} />
          </Box>
          <Box
            mt={"100px"}
            className="body"
            bgColor="white"
            h={"1750px"}
            w={"390px"}
            pos="fixed"
          >
            <Heading textAlign={"center"}>Edit your Email</Heading>
            <Stack spacing={"20px"} mt={"20px"}>
              <FormControl isRequired>
                <FormLabel>Input Email Existing</FormLabel>
                <Input isRequired placeholder="Current Email" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Create New Email</FormLabel>
                <Input ref={inputEmail} isRequired placeholder="New Email" />
              </FormControl>
              <Button onClick={() => updateEmail(data.id)}>Save</Button>
            </Stack>
          </Box>
        </Box>
      </Center>
    </div>
  );
};
