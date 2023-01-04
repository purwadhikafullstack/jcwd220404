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
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const ChangeEmail = (data) => {
  const inputEmail = useRef("");
  const navigate = useNavigate();
  const {id} = useSelector((state) => state.userSlice.value)

  const updateEmail = async () => {
    try {
      const user = {
        email: inputEmail.current.value,
      };
      const result = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/user/updateEmail/19`,
        user
      );
      console.log(result);
      Swal.fire({
        icon: "success",
        width: "370",
        text: "Email has changed",
      });
      navigate("/account/profile");
    } catch (err) {}
  };

  return (
    <div>
      <Center>
        <Box w={"390px"} h={"844px"} bgColor="#E5D9B6">
          <Box as={Link} to={"/account/profile"}>
            <ArrowBackIcon
              mt={"20px"}
              ml={"20px"}
              pos={"fixed"}
              color="#285430"
              fontSize={"25px"}
            />
          </Box>
          <Box
            mt={"100px"}
            className="body"
            bgColor="#E5D9B6"
            w={"390px"}
            pos="fixed"
          >
            <Heading textAlign={"center"} color="#285430">
              Edit your Email
            </Heading>
            <Stack spacing={"20px"} mt={"20px"}>
              <FormControl isRequired>
                <FormLabel color={"#285430"} ml="8">
                  Input Email Existing
                </FormLabel>
                <Input
                  isRequired
                  placeholder="Current Email"
                  _placeholder={{ color: "#5F8D4E" }}
                  textColor={"#285430"}
                  borderColor={"#285430"}
                  border={"2px"}
                  width="200px"
                  ml={"8"}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color={"#285430"} ml="8">
                  Create New Email
                </FormLabel>
                <Input
                  ref={inputEmail}
                  isRequired
                  placeholder="New Email"
                  _placeholder={{ color: "#5F8D4E" }}
                  borderColor={"#285430"}
                  textColor={"#285430"}
                  border={"2px"}
                  width="200px"
                  ml={"8"}
                />
              </FormControl>
              <Center>
                <Button
                  onClick={() => updateEmail(data.id)}
                  bgColor={"#A4BE7B"}
                  borderColor="#285430"
                  border="2px"
                  fontSize="18px"
                  color="gray.800"
                  width={"100px"}
                  justifyContent="center"
                >
                  Save
                </Button>
              </Center>
            </Stack>
          </Box>
        </Box>
      </Center>
    </div>
  );
};
