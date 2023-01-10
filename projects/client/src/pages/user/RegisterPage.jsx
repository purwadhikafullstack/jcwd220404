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

} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import OnlyFreshLogo from "../../OnlyFreshLogo.png";
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
        <Box px={3} py={3} bgColor="#E5D9B6" h={"100%"} w={"390px"} justifyContent="center"  border="2px" >
        <Image src={OnlyFreshLogo} height="160px" w={"auto"} ml={"75px"} />  
        <Stack align={"center"}>
        <Heading mt={"10px"} size={"lg"} textColor="#285430">
          Create your account
        </Heading>
          <Text fontSize={"lg"} color={"#285430"} spacing={"2"}>
          <b>Start Your Freshness</b>
          </Text>
          </Stack>
          <Stack mt={"20px"} spacing={"8px"} align={"center"}>    
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
                          <Stack  spacing={"8px"} align={"center"}>
                              <FormControl isRequired>
                                <FormLabel htmlFor="name" textColor={"#285430"}>
                                  <b>Name</b>
                                </FormLabel>
                                <Field
                                  as={Input}
                                  type="text"
                                  name="name"
                                  placeholder="Your Name"
                                  _placeholder={{ color: "#5F8D4E" }}
                                  bgColor={"white"}
                                  textColor="#285430"
                                  borderColor={"#285430"}
                                  border={"2px"}
                                  w={"340px"}
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
                                  <b>Phone Number</b>
                                </FormLabel>
                                <Field
                                  as={Input}
                                  type="text"
                                  name="phoneNumber"
                                  placeholder="08xx until 12 Character "
                                  _placeholder={{ color: "#5F8D4E" }}
                                  bgColor={"white"}
                                  textColor="#285430"
                                  borderColor={"#285430"}
                                  border={"2px"}
                                  w={"340px"}
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
                                  <b>Email</b>
                                </FormLabel>
                                <Input
                                  as={Field}
                                  type="email"
                                  name="email"
                                  placeholder="your_email@mail.com"
                                  _placeholder={{ color: "#5F8D4E" }}
                                  bgColor={"white"}
                                  textColor="#285430"
                                  borderColor={"#285430"}
                                  border={"2px"}
                                  w={"340px"}
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
                                <b>Password</b>
                                </FormLabel>
                                <InputGroup>
                                  <Flex justifyContent={"end"}>
                                    <Field
                                      as={Input}
                                      type={showPassword ? "text" : "password"}
                                      name="password"
                                      placeholder="your password"
                                      _placeholder={{ color: "#5F8D4E" }}
                                      bgColor={"white"}
                                      textColor="#285430"
                                      borderColor={"#285430"}
                                      border={"2px"}
                                      w={"340px"}  
                                      zIndex="1"
                                    />
                                    <Button
                                      color={"black"}
                                      onClick={() =>
                                        setShowPassword(
                                          (showPassword) => !showPassword
                                        )
                                      }
                                      pos="absolute"
                                      ml={"181px"}
                                      zIndex="2"
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
                                  <b>Confirm Password</b>
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
                                      placeholder="your confirmation password"
                                      _placeholder={{ color: "#5F8D4E" }}
                                      bgColor={"white"}
                                      textColor="#285430"
                                      borderColor={"#285430"}
                                      border={"2px"}
                                      w={"340px"}
                                      zIndex="1"
                                    />
                                    <Button
                                      color={"black"}
                                      onClick={() =>
                                        setShowComfirmPassword(
                                          (showConfirmPassword) =>
                                            !showConfirmPassword
                                        )
                                      }
                                      pos="absolute"
                                      ml={"181px"}
                                      zIndex="2"
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
                              <Center>
                              <Button
                              type = "submit"
                              mt={"3"}
                              mb={"3"}
                              _hover={{
                              bg: "#E5D9B6",
                              }}
                              bgColor={"#A4BE7B"}
                              borderColor="#285430"
                              border="2px"
                              fontSize="18px"
                              color="gray.800"
                              w={"90px"}
                              alignItems="center"
                              >
                             <b> Sign up</b>
                            </Button>
                          </Center>
                          </Stack>
                          </Form>
                          <Box display={"flex"} justifyContent="center" spacing={"4"} >
                          <Text
                            fontSize={"md"}
                            textColor="gray.800"
                          >
                            <b>Already have an account ?</b>
                          </Text>
                          </Box>
                          <Center>
                          <Text
                            as={Link}
                            to="/loginUser"
                            color="#5F8D4E"
                            fontSize={"md"}
                          >
                            <b>Login Here</b>
                          </Text>
                          
                          </Center>
                        </div>
                      );
                    }}
                  </Formik>
            </Stack>  
            <Box  justifyContent="center" >
            <React.StrictMode>
            <img src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif" width="100%" height="200px"></img>
            </React.StrictMode>
            </Box>
        </Box>
      </Center>
    </div>
  );
};