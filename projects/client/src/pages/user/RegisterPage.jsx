import Axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Field, ErrorMessage, Formik, Form } from "formik";
import Swal from "sweetalert2";
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
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

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
      .min(10, "Phone Number minimum 10 numbers")
      .max(12, "Phone Number must max 12 numbers"),
    // .test("Phone Number", "Phone Number already exist", function (value) {
    //   return new Promise((resolve, reject) => {
    //     Axios.get(`http://localhost:8000/user/${value}/availableNumber`)
    //       .then((res) => {
    //         resolve(!res.data);
    //       })
    //       .catch((err) => {
    //         if (
    //           err.response.data.content === `The phone number already used`
    //         ) {
    //           resolve(false);
    //         }
    //       });
    //   });
    // }),
    email: Yup.string().email().required("Email is a required field"),
    // .test("Email", "Email already exist", function (value) {
    //   return new Promise((resolve, reject) => {
    //     Axios.get(`http://localhost:8000/user/${value}/available`)
    //       .then((res) => {
    //         resolve(!res.data);
    //       })
    //       .catch((err) => {
    //         if (err.response.data.content === `The email already used`) {
    //           resolve(false);
    //         }
    //       });
    //   });
    // }),

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
          text: "make sure password and confirm password match",
          timer: 2000,
          customClass: {
            container: "my-swal",
          },
        });
      }
      const result = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/register`,
        data
      );
      Swal.fire({
        icon: "success",
        title: "Good Job",
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
        text: `${err.response.data}`,
        customClass: {
          container: "my-swal",
        },
        width: "370px",
      });
    }
  };

  return (
    <>
      <Box>
        <Center py={6}>
          <Box
            px={3}
            py={3}
            className="body"
            bgColor="#E5D9B6"
            h={"100%"}
            w={"390px"}
          >
            <Flex align={"center"} justify={"center"}>
              <Stack mx={"auto"} maxW={"auto"} py={10} px={6}>
                <Stack align={"center"}>
                  <Image
                    src={`${process.env.REACT_APP_API_BASE_URL}/upload/PIMG-167324294561798293.png`}
                    height="100px"
                  />
                  <Heading mt="-6" textColor={"#285430"} fontSize={"2xl"}>
                    Create your account
                  </Heading>
                  <Text fontSize={"lg"} color={"#285430"}>
                    to start your freshness{" "}
                  </Text>
                </Stack>
                <Box rounded={"2xl"} boxShadow={"lg"} p={8}>
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
                        <>
                          <Form>
                            <VStack spacing={"8px"} align="center">
                              <FormControl isRequired>
                                <FormLabel textColor={"#285430"} htmlFor="name">
                                  Name
                                </FormLabel>
                                <Field
                                  as={Input}
                                  type="text"
                                  name="name"
                                  variant="filled"
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
                                <FormLabel textColor={"#285430"} htmlFor="name">
                                  Phone Number
                                </FormLabel>
                                <Field
                                  as={Input}
                                  type="text"
                                  name="phoneNumber"
                                  variant="filled"
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
                                  name="phoneNumber"
                                />
                              </FormControl>
                              <FormControl isRequired>
                                <FormLabel
                                  textColor={"#285430"}
                                  htmlFor="email"
                                >
                                  Email
                                </FormLabel>
                                <Field
                                  as={Input}
                                  type="email"
                                  name="email"
                                  variant="filled"
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
                                  name="email"
                                />
                              </FormControl>
                              <FormControl isRequired>
                                <FormLabel
                                  textColor={"#285430"}
                                  htmlFor="password"
                                >
                                  Password
                                </FormLabel>
                                <InputGroup>
                                  <Field
                                    as={Input}
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    variant="filled"
                                    placeholder="Your Name"
                                    _placeholder={{ color: "#5F8D4E" }}
                                    bgColor={"white"}
                                    textColor="#285430"
                                    borderColor={"#285430"}
                                    border={"2px"}
                                    w={"340px"}
                                  />

                                  <InputRightElement h={"full"}>
                                    <Button
                                      variant={"ghost"}
                                      onClick={() =>
                                        setShowPassword(
                                          (showPassword) => !showPassword
                                        )
                                      }
                                    >
                                      {showPassword ? (
                                        <ViewIcon />
                                      ) : (
                                        <ViewOffIcon />
                                      )}
                                    </Button>
                                  </InputRightElement>
                                </InputGroup>
                                <ErrorMessage
                                  component="div"
                                  name="password"
                                  style={{ color: "red" }}
                                />
                              </FormControl>
                              <FormControl isRequired>
                                <FormLabel
                                  textColor={"#285430"}
                                  htmlFor="password_confirmation"
                                >
                                  Confirm Password
                                </FormLabel>
                                <InputGroup>
                                  <Field
                                    as={Input}
                                    type={
                                      showConfirmPassword ? "text" : "password"
                                    }
                                    name="password_confirmation"
                                    variant="filled"
                                    placeholder="Your Name"
                                    _placeholder={{ color: "#5F8D4E" }}
                                    bgColor={"white"}
                                    textColor="#285430"
                                    borderColor={"#285430"}
                                    border={"2px"}
                                    w={"340px"}
                                  />
                                  <InputRightElement h={"full"}>
                                    <Button
                                      variant={"ghost"}
                                      onClick={() =>
                                        setShowComfirmPassword(
                                          (showConfirmPassword) =>
                                            !showConfirmPassword
                                        )
                                      }
                                    >
                                      {showConfirmPassword ? (
                                        <ViewIcon />
                                      ) : (
                                        <ViewOffIcon />
                                      )}
                                    </Button>
                                  </InputRightElement>
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
                                w={"230px"}
                              >
                                Sign up
                              </Button>
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
                            </VStack>
                          </Form>
                        </>
                      );
                    }}
                  </Formik>
                </Box>
              </Stack>
              {/* </Box> */}
            </Flex>
          </Box>
        </Center>
      </Box>
    </>
  );
};
