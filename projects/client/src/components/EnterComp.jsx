import {
  Box,
  Button,
  Center,
  Heading,
  Input,

  Stack,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import { loginUser } from "../redux/userSlice";
import { ForgotPasswordPage } from "../pages/ForgotPassPage";



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
        })
      );
      localStorage.setItem("tokenUser", result.data.token);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Center>

      <Box className="body" h={"1750px"} w={"390px"}>
        <Heading mt={"100px"} size={"lg"} textAlign={"center"}>
          Sign in to your Account
        </Heading>
        <Stack mt={"20px"} spacing={"10px"}>
          <Text >Phone Number or Email</Text>
          <Input
            placeholder="08xxx or yourname@example.com"
            ref={inputPhoneEmail}
          ></Input>
          <Text textColor={"black"}>Password</Text>
          <Input
            type={"password"}
            placeholder="Your Password"
            ref={inputPass}
          ></Input>
          <Button onClick={onLogin} bgColor={"#285430"}>Sign In</Button>
          <Text textAlign={"center"} textColor="black">
            Forgot Password   
          </Text>
          <ForgotPasswordPage/>
          <Text textAlign={"center"}>Don't have an account?</Text>
          <Text as={Link} to="/register" textAlign={"center"} color={"blue"}>
            Register here
          </Text>
        </Stack>
      </Box>
      </Center>
    </div>
  );
};