import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { loginUser } from "../../redux/userSlice";
import { ForgotPasswordPage } from "../../pages/user/ForgotPassPage";

export const EnterComp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const inputPhoneEmail = useRef("");
  const inputPass = useRef("");
  const navigate = useNavigate();

  const onLogin = async () => {
    try {
      const user = {
        phoneEmail: inputPhoneEmail.current.value,
        password: inputPass.current.value,
      };

      // if (data.isVerified === 0) {
      //   return Swal.fire({
      //     icon: "error",
      //     // title: "Oooops ...",
      //     text: "You have to verify your Account",
      //     timer: 2000,
      //     customClass: {
      //       container: "my-swal",
      //     },
      //   });
      // }
      // const result1 = await Axios.post(
      //   `${process.env.REACT_APP_API_BASE_URL}/user/login`,
      //   user
      // );
      // setTimeout(() => navigate(`/verification/${result1.data.token}`), 8000);

      const result = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/login`,
        user
      );

      dispatch(
        loginUser({
          phoneNumber: result.data.isAccountExist.phoneNumber,
          name: result.data.isAccountExist.name,
          email: result.data.isAccountExist.email,
          id: result.data.isAccountExist.id,
          // isVerified: result.data.isAccountExist,
        })
      );
      localStorage.setItem("tokenUser", result.data.token);
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "User Not Found or Password Incorrect",
        customClass: {
          container: "my-swal",
        },
      });
      console.log(err);
    }
  };

  return (
    <>
      <Center>
        <Box
          className="body"
          py={"120px"}
          px={6}
          bgColor="#E5D9B6"
          w={"390px"}
          h={"850px"}
        >
          <Image
            src={`${process.env.REACT_APP_API_BASE_URL}/upload/PIMG-167324294561798293.png`}
            height="150px"
            w={"auto"}
            ml={"70px"}
          />

          <Heading mt={"10px"} size={"lg"} textColor="#285430">
            Sign in to your Account
          </Heading>
          <Stack mt={"20px"} spacing={"10px"}>
            <Text>Phone Number or Email</Text>
            <Input
              placeholder="08xx or Your Email"
              _placeholder={{ color: "#5F8D4E" }}
              bgColor={"white"}
              textColor="#285430"
              borderColor={"#285430"}
              border={"2px"}
              w={"340px"}
              ref={inputPhoneEmail}
            ></Input>
            <Text textColor={"#285430"}>Password</Text>
            <InputGroup>
              <Flex justifyContent={"end"}>
                <Input
                  isRequired
                  type={showPassword ? "text" : "password"}
                  placeholder="Your Password"
                  ref={inputPass}
                  variant="solid"
                  _placeholder={{ color: "#5F8D4E" }}
                  bgColor={"white"}
                  textColor="#285430"
                  borderColor={"#285430"}
                  border={"2px"}
                  w={"340px"}
                  zIndex="1"
                ></Input>
                <InputRightElement>
                  <Button
                    color={"black"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                    pos="absolute"
                    zIndex="2"
                    variant="unstyled"
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </Flex>
            </InputGroup>
            <Center>
              <Button
                mt={"3"}
                mb={"3"}
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
                Sign In
              </Button>
            </Center>
            <Box display={"flex"} justifyContent="center">
              <Text mr={"5px"}> Forgot Password? </Text>
              <ForgotPasswordPage />
            </Box>

            <Text textAlign={"center"} textColor="gray.800">
              Don't have an account?
            </Text>
            <Text as={Link} to="/register" textAlign={"center"} color="#5F8D4E">
              Register here
            </Text>
          </Stack>
        </Box>
      </Center>
    </>
  );
};
