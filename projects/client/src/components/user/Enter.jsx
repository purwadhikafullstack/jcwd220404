import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
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
import { ForgotPasswordPage } from "../../pages/user/ForgotPassword";

export const EnterComp = () => {
  const { id, isVerified, profilePic, cart } = useSelector(
    (state) => state.userSlice.value
  );

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

      // const res = await Axios.get(
      //   `${process.env.REACT_APP_API_BASE_URL}/cart/findBy/${result.data.isAccountExist.id}`
      // );
      // dispatch(cartSync(res.data));

      dispatch(
        loginUser({
          phoneNumber: result.data.isAccountExist.phoneNumber,
          name: result.data.isAccountExist.name,
          email: result.data.isAccountExist.email,
          id: result.data.isAccountExist.id,
          // isVerified: result.data.isAccountExist.isVerified,
          // cart: res.data.length,
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
        <Box px={3} py={3} bgColor="#E5D9B6" w={"390px"} h={"100%"}>
          <Image
            src={`${process.env.REACT_APP_API_BASE_URL}/upload/PIMG-167324294561798293.png`}
            height="160px"
            w={"auto"}
            ml={"75px"}
          />
          <Stack align={"center"}>
            <Heading mt={"10px"} size={"lg"} textColor="#285430">
              Sign in to your Account
            </Heading>
          </Stack>
          <Center>
            <Stack mt={"20px"} spacing={"2px"}>
              <FormControl>
                <FormLabel htmlFor="email" textColor={"#285430"}>
                  <b> Phone Number or Email </b>
                </FormLabel>
                <Input
                  placeholder="08xx or your_email@mail.com"
                  _placeholder={{ color: "#5F8D4E" }}
                  bgColor={"white"}
                  textColor="#285430"
                  borderColor={"#285430"}
                  border={"1px"}
                  w={"370px"}
                  ref={inputPhoneEmail}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password" textColor={"#285430"}>
                  <b> Password</b>
                </FormLabel>
                <InputGroup>
                  <Flex justifyContent={"end"}>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="your password"
                      ref={inputPass}
                      _placeholder={{ color: "#5F8D4E" }}
                      bgColor={"white"}
                      textColor="#285430"
                      borderColor={"#285430"}
                      border={"1px"}
                      w={"370px"}
                      zIndex="1"
                    />
                    <Button
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
              <Center>
                <Button
                  mt={"15px"}
                  mb={"15px"}
                  onClick={onLogin}
                  _hover={{
                    bg: "#E5D9B6",
                  }}
                  bgColor={"#A4BE7B"}
                  borderColor="#285430"
                  border="2px"
                  fontSize="18px"
                  color="gray.800"
                  w={"370px"}
                  alignItems="center"
                >
                  <b>Sign In</b>
                </Button>
              </Center>
              <Box display={"flex"} justifyContent="center">
                <Text mr={"8px"} textColor="gray.800">
                  <b> Forgot Password</b>
                </Text>
                <ForgotPasswordPage />
              </Box>
              <Text textAlign={"center"} textColor="gray.800">
                <b> Don't have an account ?</b>
              </Text>
              <Text
                as={Link}
                to="/register"
                textAlign={"center"}
                color="#5F8D4E"
              >
                <b> Register Here</b>
              </Text>
            </Stack>
          </Center>
          <Box justifyContent="center">
            <Center>
              <Image
                w={"350px"}
                src={`${process.env.REACT_APP_API_BASE_URL}/upload/PIMG-167358160512169392.gif`}
              ></Image>
            </Center>
          </Box>
        </Box>
      </Center>
    </>
  );
};
