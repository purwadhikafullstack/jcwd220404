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
  const { id } = useSelector((state) => state.userSlice.value);

  const updateEmail = async () => {
    try {
      const user = {
        email: inputEmail.current.value,
      };
      const result = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/user/updateEmail/${id}`,
        user
      );
      // setTimeout(() => navigate(`/verification/${result.data.token} `), 2000);
      console.log(result);
      navigate("/account/profile");
      Swal.fire({
        icon: "success",
        text: "Email has changed",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Center>
        <Box w={"390px"} h={"844px"} bgColor="#E5D9B6">
          <Box as={Link} to={"/account/profile"}>
            <ArrowBackIcon mt={"20px"} pos={"fixed"} />
          </Box>
          <Box
            mt={"100px"}
            className="body"
            bgColor="#E5D9B6"
            h={"1750px"}
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
                <FormLabel>Create New Email</FormLabel>
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
              <Button
                bgColor={"#A4BE7B"}
                borderColor="#285430"
                border="2px"
                fontSize="18px"
                color="gray.800"
                width={"100px"}
                justifyContent="center"
                onClick={() => updateEmail(data.id)}
              >
                Save
              </Button>
            </Stack>
          </Box>
        </Box>
      </Center>
    </div>
  );
};
