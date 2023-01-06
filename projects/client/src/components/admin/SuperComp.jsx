import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  useDisclosure,
  useColorMode,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  InputGroup,
  InputRightElement,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import Axios from "axios";
import {
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import Swal from "sweetalert2";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { logoutAdmin } from "../../redux/adminSlice";

export const SuperComp = () => {
  const [edit, setEdit] = useState({});
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowComfirmPassword] = useState(false);
  const { username } = useSelector((state) => state.adminSlice.value);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem("tokenSuper");
    navigate("/loginAdmin");
  };

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
        customClass: {
          container: "my-swal",
        },
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

  return (
    <div>
      <Box
        mt={"100px"}
        className="body"
        bgColor="white"
        h={"1750px"}
        w={"390px"}
      >
        <Box>
          <Box display={"flex"} justifyContent="space-between">
            <Text>Branch Admin Management</Text>
            <Menu>
              <MenuButton as={"button"} rightIcon={<ChevronDownIcon />}>
                <Avatar name={username}></Avatar>
              </MenuButton>
              <MenuList>
                <MenuItem as={"button"} onClick={onLogout}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
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
                            {data2.map((item) => {
                              return (
                                <FormControl>
                                  <FormLabel>Branch</FormLabel>
                                  <Select placeholder="Select Branch">
                                    <option>{item.branchName}</option>
                                  </Select>
                                </FormControl>
                              );
                            })}
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
                <TableContainer>
                  <Table
                    ml="10px"
                    mr="10px"
                    variant="simple"
                    colorScheme="teal"
                  >
                    <Thead>
                      <Tr>
                        <Th color={"#285430"}>Username</Th>
                        <Th color={"#285430"}>Email</Th>
                        <Th color={"#285430"}>Status</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.map((item) => {
                        return (
                          <Tr>
                            <Td color={"#285430"}>{item.username}</Td>
                            <Td color={"#285430"}>{item.email}</Td>
                            <Td color={"#285430"}>
                              {item.isSuper === 2
                                ? "Super Admin"
                                : "Branch Admin"}
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </div>
  );
};
