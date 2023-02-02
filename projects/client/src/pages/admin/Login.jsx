import {
  Heading,
  Box,
  Center,
  Image,
  Flex,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import Axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../redux/adminSlice";
import Swal from "sweetalert2";

export const LoginAdminPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const inputUsernameEmail = useRef("");
  const inputPass = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async () => {
    try {
      const admin = {
        usernameEmail: inputUsernameEmail.current.value,
        password: inputPass.current.value,
      };

      const result = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/admin/login`,
        admin
      );
      dispatch(
        loginAdmin({
          id: result.data.isUserExist.id,
          username: result.data.isUserExist.username,
          email: result.data.isUserExist.email,
          isSuper: result.data.isUserExist.isSuper,
          BranchId: result.data.isUserExist.BranchId,
        })
      );

      if (result.data.isUserExist.isSuper === 2) {
        localStorage.setItem("tokenSuper", result.data.token);
      } else if (result.data.isUserExist.isSuper === 1) {
        localStorage.setItem("tokenBranch", result.data.token);
      } else if (!result.data.isUserExist.isSuper) {
        localStorage.setItem("tokenUser", result.data.token);
      }
      navigate("/admin");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.response.data}`,
        timer: 1000,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  return (
    <>
      <Center>
        <Box py={3} px={3} bgColor="#E5D9B6" w={"390px"} h={"100%"}>
          <Image
            src={`${process.env.REACT_APP_API_BASE_URL}/upload/PIMG-167324294561798293.png`}
            height="160px"
            w={"auto"}
            ml={"75px"}
          />
          <Stack align={"center"}>
            <Heading mt={"10px"} size={"lg"} textColor="#285430">
              Sign in to Admin
            </Heading>
          </Stack>
          <Center>
            <Stack mt={"20px"} spacing={"2px"} align={"center"}>
              <FormControl isRequired>
                <FormLabel htmlFor="username" textColor={"#285430"}>
                  <b> Username or Email </b>
                </FormLabel>
                <Input
                  placeholder="Username or Your Email"
                  _placeholder={{ color: "#5F8D4E" }}
                  bgColor={"white"}
                  textColor="black"
                  borderColor={"#285430"}
                  border={"2px"}
                  w={"340px"}
                  ref={inputUsernameEmail}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="password" textColor={"#285430"}>
                  <b> Password</b>
                </FormLabel>
                <InputGroup>
                  <Flex justifyContent={"end"}>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Your Password"
                      ref={inputPass}
                      _placeholder={{ color: "#5F8D4E" }}
                      bgColor={"white"}
                      textColor="black"
                      borderColor={"#285430"}
                      border={"2px"}
                      w={"340px"}
                      zIndex="1"
                    />
                    <Button
                      variant={"unstyled"}
                      color={"black"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                      pos="absolute"
                      zIndex="2"
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </Flex>
                </InputGroup>
              </FormControl>
              <Box py={6} px={6}>
                <Button
                  onClick={onLogin}
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
                  <b>Sign In</b>
                </Button>
              </Box>
            </Stack>
          </Center>
          <Box justifyContent="center">
            <Image
              src={`${process.env.REACT_APP_API_BASE_URL}/upload/PIMG-167358160512169392.gif`}
              width="100%"
              height="250px"
            ></Image>
          </Box>
        </Box>
      </Center>
    </>
  );
};
