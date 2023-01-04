import React from "react";
import { useState } from "react";
import {
  Heading,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import OnlyFreshLogo from "../OnlyFreshLogo.png";
import Axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Field, ErrorMessage, Formik, Form } from "formik";
import Swal from "sweetalert2";
const url = "http://localhost:8000/user/register";

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowComfirmPassword] = useState(false);
  const navigate = useNavigate();

  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is a required field")
      .min(5, "Name min. 5 characters"),
    phoneNumber: Yup.string()
      .required("Phone Number is a required field")
      .min(10, "Phone Number must min 10 numbers")
      .max(12, "Phone Number must max 12 numbers"),
    email: Yup.string().email().required("Email is a required field"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password min. 8 characters"),
    password_confirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Password not matched"
    ),
  });

  const onRegister = async (data) => {
    try {
      if (data.password !== data.password_confirmation) {
        return Swal.fire({
          icon: "error",
          title: "Oooops ...",
          width: "370px",
          text: "make sure password and confirm password match",
          timer: 2000,
          customClass: {
            container: "my-swal",
          },
        });
      }
      const result = await Axios.post(url, data);
      Swal.fire({
        icon: "success",
        title: "Register Success",
        width: "370px",
        text: `${result.data.massage}`,
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
      });
      setTimeout(() => navigate(`/verification/${result.data.token}`), 8000);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email already used",
        width: "370px",
        customClass: {
          container: "my-swal",
        },
      });
    }
  };
  return (
    <div>
      <Center>
        <Box className="body" bgColor="#E5D9B6" h={"820px"} w={"390px"}>
          <Flex align={"center"} justify={"center"}>
            <Box>
              <Flex justify={"center"}>
                <Box h={120}>
                  <Image src={OnlyFreshLogo} height="100%" />
                </Box>
              </Flex>
              <Stack mx={"auto"} maxW={"auto"} py={3} px={8}>
                <Stack align={"center"}>
                  <Heading textColor={"#285430"} fontSize={"2xl"} mt="-6">
                    Create your account
                  </Heading>
                  <Text fontSize={"lg"} color={"#285430"}>
                    Start Your Freshness{" "}
                  </Text>
                </Stack>
                <Box rounded={"2xl"} p={"8"}>
                  <Formik
                    initialValues={{
                      name: "",
                      phoneNumber: "",
                      email: "",
                      password: "",
                      password_confirmation: "",
                    }}
                    validationSchema={registerSchema}
                    onSubmit={(values, action) => {
                      onRegister(values);
                      action.setFieldValue("name", "");
                      action.setFieldValue("phoneNumber", "");
                      action.setFieldValue("email", "");
                      action.setFieldValue("password", "");
                      action.setFieldValue("password_confirmation", "");
                    }}
                  >
                    {(props) => {
                      return (
                        <div>
                          <Form>
                            <VStack spacing={2} mt="-8" align="flex-start">
                              <FormControl isRequired>
                                <FormLabel htmlFor="name" textColor={"#285430"}>
                                  Name
                                </FormLabel>
                                <Field
                                  as={Input}
                                  type="text"
                                  name="name"
                                  _placeholder={{ color: "#5F8D4E" }}
                                  bgColor={"white"}
                                  textColor="#285430"
                                  borderColor={"#285430"}
                                  border={"2px"}
                                  w={"230px"}
                                />
                                <ErrorMessage
                                  style={{ color: "red" }}
                                  component="div"
                                  name="name"
                                />
                              </FormControl>
                              <FormControl isRequired>
                                <FormLabel
                                  htmlFor="phoneNumber"
                                  textColor={"#285430"}
                                >
                                  Phone Number
                                </FormLabel>
                                <Field
                                  as={Input}
                                  type="text"
                                  name="phoneNumber"
                                  _placeholder={{ color: "#5F8D4E" }}
                                  bgColor={"white"}
                                  textColor="#285430"
                                  borderColor={"#285430"}
                                  border={"2px"}
                                  w={"230px"}
                                />
                                <ErrorMessage
                                  style={{ color: "red" }}
                                  component="div"
                                  name="phoneNumber"
                                />
                              </FormControl>
                              <FormControl isRequired>
                                <FormLabel
                                  htmlFor="email"
                                  textColor={"#285430"}
                                >
                                  Email
                                </FormLabel>
                                <Input
                                  as={Field}
                                  type="email"
                                  name="email"
                                  _placeholder={{ color: "#5F8D4E" }}
                                  bgColor={"white"}
                                  textColor="#285430"
                                  borderColor={"#285430"}
                                  border={"2px"}
                                  w={"230px"}
                                />
                                <ErrorMessage
                                  style={{ color: "red" }}
                                  component="div"
                                  name="email"
                                />
                              </FormControl>
                              <FormControl isRequired>
                                <FormLabel
                                  htmlFor="password"
                                  textColor={"#285430"}
                                >
                                  Password
                                </FormLabel>
                                <InputGroup>
                                  <Flex justifyContent={"end"}>
                                    <Field
                                      as={Input}
                                      type={showPassword ? "text" : "password"}
                                      name="password"
                                      _placeholder={{ color: "#5F8D4E" }}
                                      bgColor={"white"}
                                      textColor="#285430"
                                      borderColor={"#285430"}
                                      border={"2px"}
                                      w={"230px"}
                                      position="absolute"
                                    />
                                    <Button
                                      color={"black"}
                                      onClick={() =>
                                        setShowPassword(
                                          (showPassword) => !showPassword
                                        )
                                      }
                                      pos="relative"
                                      ml={"181px"}
                                      zIndex="1"
                                    >
                                      {showPassword ? (
                                        <ViewIcon />
                                      ) : (
                                        <ViewOffIcon />
                                      )}
                                    </Button>
                                  </Flex>
                                </InputGroup>
                                <ErrorMessage
                                  component="div"
                                  name="password"
                                  style={{ color: "red" }}
                                />
                              </FormControl>
                              <FormControl isRequired>
                                <FormLabel
                                  htmlFor="password_confirmation"
                                  textColor={"#285430"}
                                >
                                  Confirm Password
                                </FormLabel>
                                <InputGroup>
                                  <Flex justifyContent="end">
                                    <Field
                                      as={Input}
                                      type={
                                        showConfirmPassword
                                          ? "text"
                                          : "password"
                                      }
                                      name="password_confirmation"
                                      _placeholder={{ color: "#5F8D4E" }}
                                      bgColor={"white"}
                                      textColor="#285430"
                                      borderColor={"#285430"}
                                      border={"2px"}
                                      w={"230px"}
                                      position="absolute"
                                    />
                                    <Button
                                      color={"black"}
                                      onClick={() =>
                                        setShowComfirmPassword(
                                          (showConfirmPassword) =>
                                            !showConfirmPassword
                                        )
                                      }
                                      pos="relative"
                                      ml={"181px"}
                                      zIndex="1"
                                    >
                                      {showConfirmPassword ? (
                                        <ViewIcon />
                                      ) : (
                                        <ViewOffIcon />
                                      )}
                                    </Button>
                                  </Flex>
                                </InputGroup>
                                <ErrorMessage
                                  component="div"
                                  name="password_confirmation"
                                  style={{ color: "red" }}
                                />
                              </FormControl>
                              <Button
                                type="submit"
                                _hover={{
                                  bg: "#E5D9B6",
                                }}
                                bgColor={"#A4BE7B"}
                                borderColor="#285430"
                                border="2px"
                                fontSize="18px"
                                color="gray.800"
                                w={"90px"}
                              >
                                Sign up
                              </Button>
                            </VStack>
                          </Form>
                          <Flex></Flex>
                          <Text
                            mt={"20px"}
                            fontSize={"md"}
                            textColor="gray.800"
                          >
                            Already have an account?
                          </Text>
                          <Text
                            as={Link}
                            to="/loginUser"
                            color="#5F8D4E"
                            fontSize={"md"}
                          >
                            Login Here
                          </Text>
                        </div>
                      );
                    }}
                  </Formik>
                </Box>
              </Stack>
            </Box>
          </Flex>
        </Box>
      </Center>
    </div>
  );
};
