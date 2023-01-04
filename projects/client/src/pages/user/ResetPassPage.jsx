import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Navigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export const ResetPassPage = () => {
  const params = useParams();
  const [move, setMove] = useState(false);

  const onReset = async () => {
    try {
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/updatePass`,
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
        text: `${res.data}`,
      });
      setMove(true);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
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
      >
        <Heading
          textColor={"black"}
          lineHeight={1.1}
          fontSize={{ base: "2xl", md: "3xl" }}
        >
          Enter new password
        </Heading>
        <FormControl id="password" isRequired>
          <FormLabel textColor={"black"}>Password</FormLabel>
          <Input
            type="password"
            w={"230px"}
            textColor="black"
            borderColor={"#285430"}
          />
        </FormControl>
        <FormControl id="password_confirmation" isRequired>
          <FormLabel textColor={"black"}>Password Confirmation</FormLabel>
          <Input
            type="password"
            w={"230px"}
            textColor="black"
            borderColor={"#285430"}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            onClick={onReset}
            bg={"teal"}
            color={"white"}
            _hover={{
              bg: "teal.500",
            }}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};
