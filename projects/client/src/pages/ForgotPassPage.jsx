import Axios from "axios";
import React from "react";
import {
  Input,
  Button,
  FormLabel,
  FormControl,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import Swal from "sweetalert2";

export const ForgotPasswordPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSendEmail = async () => {
    try {
      const email = document.getElementById("email").value;
      const result = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/forgotPassword`,
        { email: email }
      );

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${result.data}`,
      });
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

  return (
    <>
      <FormLabel onClick={onOpen} as="Button" color="green.400">
        Click here
      </FormLabel>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack
              spacing={4}
              w={"full"}
              maxW={"md"}
              bg={useColorModeValue("white", "gray.700")}
              rounded={"xl"}
              boxShadow={"lg"}
              p={6}
              my={12}
            >
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                Forgot your password?
              </Heading>
              <Text
                fontSize={{ base: "sm", sm: "md" }}
                color={useColorModeValue("gray.800", "gray.400")}
              >
                You&apos;ll get an email with a reset link
              </Text>
              <FormControl id="email">
                <Input
                  placeholder="your-email@example.com"
                  _placeholder={{ color: "gray.500" }}
                  type="email"
                />
              </FormControl>
              <Stack spacing={6}>
                <Button
                  onClick={onSendEmail}
                  bg={"green.400"}
                  color={"white"}
                  _hover={{
                    bg: "green.500",
                  }}
                >
                  Request Reset
                </Button>
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};