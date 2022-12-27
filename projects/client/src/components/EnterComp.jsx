import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { loginUser } from "../redux/userSlice";
import { ForgotPasswordPage } from "../pages/ForgotPassPage";
import Swal from "sweetalert2";

export const EnterComp = () => {
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
        })
      );
      localStorage.setItem("tokenUser", result.data.token);
      navigate("/");
      localStorage.setItem("tokenAdmin", result.data.token)
      navigate("/adminPage")
    } catch (err) {
      Swal.fire({
        icon: "error",
        // title: "Oops...",
        text: "User Not Found or Password Incorrect",
        // text: `${err.response.data}`,
        customClass: {
          container: "my-swal",
        },
      });
      console.log(err);
    }
  };

  return (
    <div>
      {/* <Flex
        w={"full"}
        h={"100vh"}
        backgroundImage={
          "url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/healthiest-vegetables-1645751214.jpg)"
        }
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
        pos="sticky"
      > */}
      <Box className="body" h={"1750px"} w={"390px"} pos="fixed" mt="100px">
        <Heading size={"lg"} textAlign={"center"}>
          Sign in to your Account
        </Heading>
        <Stack mt={"20px"} spacing={"10px"}>
          <Text>Phone Number or Email</Text>
          <Input
            isRequired
            placeholder="08xxx or yourname@example.com"
            ref={inputPhoneEmail}
            variant="solid"
          ></Input>
          <Text>Password</Text>
          <Input
            isRequired
            type={"password"}
            placeholder="Your Password"
            ref={inputPass}
            variant="solid"
          ></Input>
          <Button onClick={onLogin}>Sign In</Button>
          <Box display={"flex"} justifyContent="center">
            <Text mr={"5px"}> Forgot Password? </Text>
            <ForgotPasswordPage />
          </Box>

          <Text textAlign={"center"}>Don't have an account?</Text>
          <Link href="/register" textAlign={"center"} color={"blue"}>
            Register here
          </Link>
        </Stack>
      </Box>
      {/* </Flex> */}
    </div>
  );
};
