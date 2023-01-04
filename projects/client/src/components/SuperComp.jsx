import React, { useState } from "react";
import { logoutAdmin } from "../redux/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Text,
  useDisclosure,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  ButtonGroup,
  useColorMode,
  Menu,
  MenuButton,
  Avatar,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Axios from "axios";
import { ChevronDownIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ListAdminComp } from "./ListAdminComp";

export const SuperComp = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit, setEdit] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowComfirmPassword] = useState(false);
  const { username } = useSelector((state) => state.adminSlice.value);
  const { colorMode, toggleColorMode } = useColorMode();

  const registerSchema = Yup.object().shape({
    username: Yup.string()
      .required("Name is a required field")
      .min(5, "Name min. 5 characters"),
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
          text: "make sure password and confirm password match",
          timer: 2000,
          width: "370",
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
        title: "Good Job",
        text: `${result.data.massage}`,
        timer: 2000,
        width: "370",
        customClass: {
          container: "my-swal",
        },
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        width: "370",
        text: `${err.response.data}`,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  const onLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem("tokenSuper");
    navigate("/loginAdmin");
  };

  return (
    <div>
      <Box
        className="header"
        w={"390px"}
        h={"80px"}
        bgColor="#E5D9B6"
        display={"flex"}
        justifyContent="space-between"
        pt={"10px"}
        pl={"1px"}
        // pos="fixed"
        top={"0"}
        // zIndex={"2"}
      >
        <Box margin={"auto"} alignItems={"center"} textColor="#285430">
          <Text as={"b"} fontSize="xl">
            SUPER ADMIN
          </Text>
        </Box>
        <Box
          mt={"100px"}
          className="body"
          bgColor="white"
          h={"844px"}
          w={"390px"}
          // pos="fixed"
        >
          <Button
            display={"flex"}
            bgColor={"#FF0000"}
            textColor="gray.800"
            width={"100px"}
            m="auto"
            justifyContent={"center"}
            borderColor="#gray.800"
            border="2px"
            onClick={onToggle}
          >
            LogOut
          </Button>
          <Popover
            returnFocusOnClose={false}
            isOpen={isOpen}
            placement="auto-end"
            closeOnBlur={false}
          >
            <PopoverContent ml="8" mt="275" bgColor={"#E5D9B6"}>
              <PopoverArrow />
              <PopoverBody textColor={"#285430"}>
                Are you sure you want to logout?
              </PopoverBody>
              <PopoverFooter display="flex" justifyContent="flex-end">
                <ButtonGroup size="sm">
                  <Button
                    onClick={onClose}
                    bgColor={"#A4BE7B"}
                    borderColor="#285430"
                    border="2px"
                    fontSize="14px"
                    color="gray.800"
                  >
                    No
                  </Button>
                  <Button
                    onClick={onLogout}
                    bgColor="#A4BE7B"
                    borderColor="#285430"
                    border="2px"
                    fontSize="14px"
                    color="gray.800"
                  >
                    Yes
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
          <Text>Branch Admin Management</Text>
          <Menu>
            <MenuButton as={"button"} rightIcon={<ChevronDownIcon />}>
              <Avatar name={username}></Avatar>
            </MenuButton>
          </Menu>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Add Admin</Tab>
              <Tab>List of Admin</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
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
                      <>
                        <Form>
                          <VStack spacing={4} align="flex-start">
                            <FormControl isRequired>
                              <FormLabel htmlFor="username">Username</FormLabel>
                              <Field
                                as={Input}
                                type="text"
                                name="username"
                                variant="filled"
                              />
                              <ErrorMessage
                                style={{ color: "red" }}
                                component="div"
                                name="username"
                              />
                            </FormControl>

                            <FormControl isRequired>
                              <FormLabel htmlFor="email">Email</FormLabel>
                              <Field
                                as={Input}
                                type="email"
                                name="email"
                                variant="filled"
                              />
                              <ErrorMessage
                                style={{ color: "red" }}
                                component="div"
                                name="email"
                              />
                            </FormControl>
                            {/* <FormControl>
                      <FormLabel>Branch</FormLabel>
                      <Select placeholder="Select Branch">
                        <option value={"1"}>Bekasi</option>
                        <option value={"2"}>Depok</option>
                        <option value={"3"}>Tangerang Selatan</option>
                        <option value={"4"}>Jakarta Timur</option>
                      </Select>
                    </FormControl> */}
                            <FormControl isRequired>
                              <FormLabel htmlFor="password">Password</FormLabel>
                              <InputGroup>
                                <Field
                                  as={Input}
                                  type={showPassword ? "text" : "password"}
                                  name="password"
                                  variant="filled"
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
                              <FormLabel htmlFor="password_confirmation">
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
                              width="100%"
                              bg={"green.400"}
                              color={"white"}
                              _hover={{
                                bg: "green.500",
                              }}
                            >
                              Sign up
                            </Button>
                          </VStack>
                        </Form>
                      </>
                    );
                  }}
                </Formik>
              </TabPanel>
              <TabPanel>
                <ListAdminComp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </div>
  );
};
