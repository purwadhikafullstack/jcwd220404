import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Navigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const url = "http://localhost:8000/user/updatePass";

export const ResetPassPage = () => {
  const params = useParams();
  const [move, setMove] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewConfirmPassword, setShowNewComfirmPassword] = useState(false);

  const onReset = async () => {
    try {
      const res = await Axios.post(
        url,
        {
          password: document.getElementById("password").value,
          password_confirmation: document.getElementById(
            "password_confirmation"
          ).value,
        },
        {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Succes...",
        width: "370px",
        text: `${res.data}`,
      });
      setMove(true);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        width: "370px",
        text: `${err.response.data}`,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  return move ? (
    <Navigate to="/" />
  ) : (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={"white"}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
        bgColor={"#E5D9B6"}
      >
        <Heading
          textColor={"gray.800"}
          lineHeight={1.1}
          fontSize={{ base: "2xl", md: "3xl" }}
        >
          Enter new password
        </Heading>
        <FormControl id="password" isRequired>
          <FormLabel textColor={"gray.800"}> New Password</FormLabel>
          <Input
            type={
              showNewPassword
                ? "text"
                : "password"
            }
            name="new_password"
            _placeholder={{ color: "#5F8D4E" }}
            bgColor={"white"}
            textColor="gray.800"
            borderColor={"#285430"}
            border={"2px"}
            w={"230px"}
            position="absolute"
          />
          <Button
              color={"black"}
              onClick={() =>
                setShowNewPassword(
                  (showNewPassword) => !showNewPassword
                )
              }
              pos="relative"
              ml={"181px"}
              zIndex="1"
            >
              {showNewPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
        </FormControl>
        <FormControl id="new_password_confirmation" isRequired>
          <FormLabel textColor={"gray.800"}>Password Confrimation</FormLabel>
          <Flex>
            <Input
              type={
                showNewConfirmPassword
                  ? "text"
                  : "password"
              }
              name="password_confirmation"
              _placeholder={{ color: "#5F8D4E" }}
              bgColor={"white"}
              textColor="gray.800"
              borderColor={"#285430"}
              border={"2px"}
              w={"230px"}
              position="absolute"
            />
            <Button
              color={"black"}
              onClick={() =>
                setShowNewComfirmPassword(
                  (showNewConfirmPassword) => !showNewConfirmPassword
                )
              }
              pos="relative"
              ml={"181px"}
              zIndex="1"
            >
              {showNewConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </Flex>
        </FormControl>
          <Button
            onClick={onReset}
            bgColor={"#A4BE7B"}
            borderColor="#285430"
            border="2px"
            fontSize="18px"
            color="gray.800"
            width={"110px"}
          >
            Reset
          </Button>
      </Stack>
    </Flex>
  );
};
