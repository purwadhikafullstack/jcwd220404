import { Box, Center, Heading } from "@chakra-ui/react";
import { Button, FormControl, Flex, Stack, HStack } from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { Navigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";


export const VerificationPage = () => {
  const params = useParams();
  const [move, setMove] = useState(false);
  const otp1 = useRef("");
  const otp2 = useRef("");
  const otp3 = useRef("");
  const otp4 = useRef("");
  const otp5 = useRef("");
  const otp6 = useRef("");

  const onVerification = async () => {
    try {
      const otp = `${otp1.current.value}${otp2.current.value}${otp3.current.value}${otp4.current.value}${otp5.current.value}${otp6.current.value}`;

      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/verification`,
        { code_otp: otp },
        {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success...",
        text: `${res.data.message}`,
      });
      setMove(true);
    } catch (err) {
      // alert(err.response.data);
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
    <Center>
      <Box className="body" bgColor="white" h={"1750px"} w={"390px"}>
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"white"}>
          <Stack
            spacing={4}
            w={"full"}
            maxW={"sm"}
            bg={"white"}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={10}
          >
            <Center>
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                Verify your Email
              </Heading>
            </Center>
            <Center fontSize={{ base: "sm", sm: "md" }}>
              We have sent code to your email
            </Center>
            <FormControl>
              <Center>
                <HStack>
                  <PinInput>
                    <PinInputField type={"password"} ref={otp1} />
                    <PinInputField type={"password"} ref={otp2} />
                    <PinInputField type={"password"} ref={otp3} />
                    <PinInputField type={"password"} ref={otp4} />
                    <PinInputField type={"password"} ref={otp5} />
                    <PinInputField type={"password"} ref={otp6} />
                  </PinInput>
                </HStack>
              </Center>
            </FormControl>
            <Stack spacing={6}>
              <Button
                onClick={onVerification}
                bg={"teal.400"}
                color={"white"}
                _hover={{
                  bg: "teal.500",
                }}
              >
                Verify
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Box>
    </Center>
  );
};
