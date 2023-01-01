import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  useDisclosure,
  useColorMode,
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import Axios from "axios";
import {
  DeleteIcon,
  EditIcon,
  MoonIcon,
  SunIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import Swal from "sweetalert2";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { syncData } from "../redux/nameSlice";
import { logoutAdmin } from "../redux/adminSlice";

export const SuperComp = () => {
  const [edit, setEdit] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowComfirmPassword] = useState(false);
  const { username } = useSelector((state) => state.adminSlice.value);
  const { data } = useSelector((state) => state.nameSlice.value);
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
        `${process.env.REACT_APP_API_BASE_URL}/admin/admins`
      );
      console.log(res.data);
      dispatch(syncData(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Box>
        <Box display={"flex"} justifyContent="space-between">
          <Text>Super Page</Text>
          <Text>{username}</Text>
          <Button onClick={onLogout}>Logout</Button>
        </Box>
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
                      <FormLabel htmlFor="password_confirmation">
                        Confirm Password
                      </FormLabel>
                      <InputGroup>
                        <Field
                          as={Input}
                          type={showConfirmPassword ? "text" : "password"}
                          name="password_confirmation"
                          variant="filled"
                        />
                        <InputRightElement h={"full"}>
                          <Button
                            variant={"ghost"}
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
      </Box>
      <Box>
        <TableContainer>
          <Table variant="simple" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Username</Th>
                <Th>Email</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((item) => {
                return (
                  <Tr>
                    <Td>{item.username}</Td>
                    <Td>{item.email}</Td>
                    <Td>{item.isSuper}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};
