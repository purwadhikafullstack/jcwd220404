import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  InputGroup,
  InputRightElement,
  Center,
} from "@chakra-ui/react";
import Axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export const RegisterAdmin = () => {
  const [data2, setData2] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowComfirmPassword] = useState(false);
  const [branch, setBranch] = useState()
  const [selectedBranch, setSelectedBranch] = useState()
  const inputBranch = useRef(0);

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

  const onRegister = async (result) => {
    try {
      if (result.password !== result.password_confirmation) {
        return Swal.fire({
          icon: "error",
          title: "Oooops ...",
          text: "make sure password and confirm password match",
          timer: 2000,
          customClass: {
            container: "my-swal",
          },
          width: "370px",
        });
      }
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/admin/register`,
        {
          result,
          BranchId: inputBranch.current.value,
        }
      );
      Swal.fire({
        icon: "success",
        title: "Good Job",
        text: `${res.data.message}`,
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
        width: "370px",
      });
      setTimeout(() => {
        window.location.replace("/admin");
      }, 900);
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

  const getBranch = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/branch/findAll`
      );
      console.log(res.data);
      // console.log(res.data?.id)
      setData2(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderBranch = () => {
    return data2.map((val) => {
      return (
        <option value={val.id} key={val.id.toString()}>
          {val.branchName}
        </option>
      );
    });
  };

  const branchHandler = ({ target }) => {
    const { value } = target;
    setSelectedBranch(value);
  };

  useEffect(() => {
    getBranch();
  }, [selectedBranch]);

  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          password_confirmation: "",
          // BranchId: 0,
        }}
        validationSchema={registerSchema}
        onSubmit={(values, action) => {
          onRegister(values);
          action.setFieldValue("username", "");
          action.setFieldValue("email", "");
          action.setFieldValue("password", "");
          action.setFieldValue("password_confirmation", "");
          // action.setFieldValue("BranchId", 0);
        }}
      >
        {(props) => {
          return (
            <>
              <Form>
                <VStack spacing={4} align="flex-start">
                  <FormControl isRequired>
                    <FormLabel ml="3" color="#285430" htmlFor="username">
                      Username
                    </FormLabel>
                    <Field
                      as={Input}
                      type="text"
                      name="username"
                      variant="filled"
                      ml="3"
                      _placeholder={{ color: "#5F8D4E" }}
                      bgColor={"white"}
                      textColor="#285430"
                      borderColor={"#285430"}
                      border={"2px"}
                      w={"330px"}
                    />
                    <ErrorMessage
                      style={{ color: "red" }}
                      component="div"
                      name="username"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel ml="3" color="#285430" htmlFor="email">
                      Email
                    </FormLabel>
                    <Field
                      as={Input}
                      type="email"
                      name="email"
                      variant="filled"
                      ml="3"
                      _placeholder={{ color: "#5F8D4E" }}
                      bgColor={"white"}
                      textColor="#285430"
                      borderColor={"#285430"}
                      border={"2px"}
                      w={"330px"}
                    />
                    <ErrorMessage
                      style={{ color: "red" }}
                      component="div"
                      name="email"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel ml="3" color="#285430" htmlFor="branch">
                      Branch
                    </FormLabel>
                    <Select
                    onChange={branchHandler}
                    // value={req?.body?.BranchId}
                      as={Select}
                      ml="3"
                      placeholder="Select Branch"
                      _placeholder={{ color: "#5F8D4E" }}
                      bgColor={"white"}
                      textColor="#285430"
                      borderColor={"#285430"}
                      border={"2px"}
                      w={"330px"}
                    >
                      {renderBranch()}
                      {/* {data2.map((item) => {
                        return (
                          <>
                            <option>{item.branchName}</option>
                          </>
                        );
                      })} */}
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel ml="3" color="#285430" htmlFor="password">
                      Password
                    </FormLabel>
                    <InputGroup>
                      <Field
                        as={Input}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        variant="filled"
                        ml="3"
                        _placeholder={{ color: "#5F8D4E" }}
                        bgColor={"white"}
                        textColor="#285430"
                        borderColor={"#285430"}
                        border={"2px"}
                        w={"330px"}
                      />
                      <InputRightElement h={"full"}>
                        <Button
                          color="black"
                          pos="relative"
                          mr={"40px"}
                          zIndex="1"
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                          variant="ghost"
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
                      ml="3"
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
                        ml="3"
                        _placeholder={{ color: "#5F8D4E" }}
                        bgColor={"white"}
                        textColor="#285430"
                        borderColor={"#285430"}
                        border={"2px"}
                        w={"330px"}
                      />
                      <InputRightElement h={"full"}>
                        <Button
                          color="black"
                          pos="relative"
                          mr={"40px"}
                          zIndex="1"
                          onClick={() =>
                            setShowComfirmPassword(
                              (showConfirmPassword) => !showConfirmPassword
                            )
                          }
                          variant="ghost"
                        >
                          {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
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
                      ml="3"
                      type="submit"
                      bgColor={"#A4BE7B"}
                      borderColor="#285430"
                      border="2px"
                      fontSize="18px"
                      color="gray.800"
                      width={"330px"}
                      justifyContent="center"
                    >
                      Create Branch Admin
                    </Button>
                  </Center>
                </VStack>
              </Form>
            </>
          );
        }}
      </Formik>
    </div>
  );
};
