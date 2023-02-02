import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  InputGroup,
  InputRightElement,
  Button,
  Center,
  Stack,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ErrorMessage, Field, Form, Formik } from "formik";

export const ManagementBranchComp = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowComfirmPassword] = useState(false);
  const registerSchema = Yup.object().shape({
    username: Yup.string()
      .required("Name is a required field")
      .min(5, "Name min. 5 characters"),
    email: Yup.string()
      .email("Email must be valid")
      .required("Email is a required field"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password min. 8 characters"),
    password_confirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Password not matched"
    ),
  });

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/admin/findAll`
      );
      console.log(res.data);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getBranch = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/branch/findAll`
      );
      console.log(res.data);
      setData2(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBranch();
  }, []);

  const onRegister = async (data) => {
    try {
      if (data.password !== data.password_confirmation) {
        return Swal.fire({
          icon: "error",
          title: "Oooops ...",
          text: "Make Sure Password And Confirm Password Match",
          timer: 2000,
          customClass: {
            container: "my-swal",
          },
        });
      }
      const result = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/admin/register`,
        data
      );
      Swal.fire({
        icon: "success",
        title: "Success Create Branch",
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
      });
      console.log(result)
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
      }}
      validationSchema={registerSchema}
      onSubmit={(values, action) => {
        onRegister(values);
        action.setFieldValue("username", "");
        action.setFieldValue("email", "");
        action.setFieldValue("password", "");
        action.setFieldValue("password_confirmation", "");
      }}
    >
      {(props) => {
        return (
          <div>
            <Flex>
              <Box>
                <TableContainer ml="78px" mt="215px" w="50vw" bgColor={"white"}>
                  <Table variant="simple" colorScheme="#285430">
                    <Thead alignContent={"center"}>
                      <Tr>
                        <Th color={"#285430"} fontSize="16px">Username</Th>
                        <Th color={"#285430"} fontSize="16px">Email</Th>
                        <Th color={"#285430"} fontSize="16px">Placement</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.map((item) => {
                        return (
                          <Tr>
                            <Td color={"#285430"}>{item.username}</Td>
                            <Td color={"#285430"}>{item.email}</Td>
                            <Td color={"#285430"}></Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
              <Box
                ml="30px"
                mt="80px"
                border="2px"
                borderRadius="2xl"
              >
                <Box
                  w={"300px"}
                  m="20px"
                  mb="25px"
                  borderWidth="2px"
                  boxShadow="xl"
                  borderRadius="8px"
                  borderColor="#285430"
                >
                  <Box
                    pt="10px"
                    h="50px"
                    borderTopRadius="8px"
                    align="center"
                    bg="#E5D9B6"
                    fontSize="18px"
                  >
                    <Text
                      mx="10px"
                      justifyContent="center"
                      fontWeight="bold"
                      color="#285430"
                    >
                      Add Branch
                    </Text>
                  </Box>
                  <Form>
                    <Stack spacing={"10px"}>
                      <FormControl isRequired>
                        <FormLabel
                          mt="10px"
                          ml="8px"
                          fontSize="16px"
                          as={"b"}
                          color="#285430"
                          htmlFor="username"
                        >
                          Username
                        </FormLabel>
                        <Field
                          as={Input}
                          type="text"
                          name="username"
                          variant="filled"
                          _placeholder={{ color: "#5F8D4E" }}
                          bgColor={"white"}
                          textColor="#285430"
                          borderColor={"#285430"}
                          border={"2px"}
                          ml="5px"
                          w="97%"
                        />
                        <ErrorMessage
                          style={{ color: "red" }}
                          component="div"
                          name="username"
                        />
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel
                          mt="10px"
                          ml="8px"
                          fontSize="16px"
                          as={"b"}
                          color="#285430"
                          htmlFor="email"
                        >
                          Email
                        </FormLabel>
                        <Field
                          as={Input}
                          type="email"
                          name="email"
                          variant="filled"
                          _placeholder={{ color: "#5F8D4E" }}
                          bgColor={"white"}
                          textColor="#285430"
                          borderColor={"#285430"}
                          border={"2px"}
                          ml="5px"
                          w="97%"
                        />
                        <ErrorMessage
                          style={{ color: "red" }}
                          component="div"
                          name="email"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          mt="10px"
                          ml="8px"
                          fontSize="16px"
                          as={"b"}
                          color="#285430"
                          htmlFor="branch"
                        >
                          Branch
                        </FormLabel>
                        <Select
                          placeholder="Select Branch"
                          _placeholder={{ color: "#5F8D4E" }}
                          bgColor={"white"}
                          textColor="#285430"
                          borderColor={"#285430"}
                          border={"2px"}
                          ml="5px"
                          w="97%"
                        >
                          {data2.map((item) => {
                            return (
                              <>
                                <option>{item.branchName}</option>
                              </>
                            );
                          })}
                        </Select>
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel
                          mt="10px"
                          ml="8px"
                          fontSize="16px"
                          as={"b"}
                          color="#285430"
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
                            _placeholder={{ color: "#5F8D4E" }}
                            bgColor={"white"}
                            textColor="#285430"
                            borderColor={"#285430"}
                            border={"2px"}
                            ml="5px"
                            w="97%"
                          />
                          <InputRightElement h={"full"}>
                            <Button
                              color="black"
                              pos="relative"
                              mr={"1vw"}
                              zIndex="1"
                              onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                              }
                            >
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
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
                          mt="10px"
                          ml="8px"
                          fontSize="16px"
                          as={"b"}
                          color="#285430"
                          htmlFor="password_confirmation"
                        >
                          Confirm Password
                        </FormLabel>
                        <InputGroup>
                          <Field
                            as={Input}
                            type={showConfirmPassword ? "text" : "password"}
                            name="password_confirmation"
                            variant="filled"
                            _placeholder={{ color: "#5F8D4E" }}
                            bgColor={"white"}
                            textColor="#285430"
                            borderColor={"#285430"}
                            border={"2px"}
                            ml="5px"
                            w="97%"
                          />
                          <InputRightElement h={"full"}>
                            <Button
                              color="black"
                              pos="relative"
                              mr={"1vw"}
                              zIndex="1"
                              onClick={() =>
                                setShowComfirmPassword(
                                  (showConfirmPassword) => !showConfirmPassword
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
                      <Center>
                        <Button
                        mb={"20px"}
                          type="submit"
                          bgColor={"#A4BE7B"}
                          borderColor="#285430"
                          border="2px"
                          fontSize="16px"
                          color="gray.800"
                          width={"60%"}
                          justifyContent="center"
                        >
                          Create Branch
                        </Button>
                      </Center>
                    </Stack>
                  </Form>
                </Box>
              </Box>
            </Flex>
          </div>
        );
      }}
    </Formik>
  );
};
