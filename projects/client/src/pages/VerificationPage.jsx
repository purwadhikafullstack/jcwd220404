import { Box, Center, Heading } from "@chakra-ui/react";
import { Button, FormControl, Flex, Stack, HStack } from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { Navigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";

const url = "http://localhost:8000/user/verification";

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
        url,
        { code_otp: otp },
        {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        width: "370px",
        title: "Success...",
        text: `${res.data.message}`,
      });
      setMove(true);
    } catch (err) {
      alert(err.response.data);
      Swal.fire({
        icon: "error",
        width: "370px",
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
      <Box>
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"#E5D9B6"} h={"844px"} w={"390px"}>
          <Stack
            spacing={4}
            w={"full"}
            maxW={"sm"}
            bg={"#E5D9B6"}   
            p={6}
            my={10}
          >
            <Center>
              <Heading
                color={"#285430"}
                fontSize={{ base: "2xl", md: "3xl" }}
              >
                Verify your Email
              </Heading>
            </Center>
            <Center textColor={"#285430"} fontSize={{ base: "sm", sm: "md" }}>
              We have sent code to your email
            </Center>
            <FormControl>
              <Center>
                <HStack>
                  <PinInput>
                    <PinInputField
                       textColor="gray.800"
                       border="2px"
                      borderColor={"#285430"}
                      ref={otp1}
                    />
                    <PinInputField
                       textColor="gray.800"
                       border="2px"
                      borderColor={"#285430"}
                      ref={otp2}
                    />
                    <PinInputField
                       textColor="gray.800"
                       border="2px"
                      borderColor={"#285430"}
                      ref={otp3}
                    />
                    <PinInputField
                       textColor="gray.800"
                       border="2px"
                      borderColor={"#285430"}
                      ref={otp4}
                    />
                    <PinInputField
                       textColor="gray.800"
                       border="2px"
                      borderColor={"#285430"}
                      ref={otp5}
                    />
                    <PinInputField
                      textColor="gray.800"
                      border="2px"
                      borderColor={"#285430"}
                      ref={otp6}
                    />
                  </PinInput>
                </HStack>
              </Center>
            </FormControl>
            <Stack spacing={6}>
              <Button
                onClick={onVerification}
                bgColor={"#A4BE7B"}
                borderColor="#285430"
                fontSize="18px"
                color="gray.800"
                border="2px"
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
