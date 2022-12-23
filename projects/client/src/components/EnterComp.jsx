import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Stack,
  Text,
  Flex,
  Image,
  InputGroup,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import { loginUser } from "../redux/userSlice";
import { ForgotPasswordPage } from "../pages/ForgotPassPage";
import OnlyFreshLogo from "../OnlyFreshLogo.png";

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

      const result = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/login`,
        user
      );

      dispatch(
        loginUser({
          phoneNumber: result.data.isAccountExist.phoneNumber,
          name: result.data.isAccountExist.name,
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
        <Box py={10} px={6} bgColor="#E5D9B6" w={"390px"} h={"850px"}>
          
            <Image src={OnlyFreshLogo} height="150px" w={"auto"}   ml={"70px"}/>
    

          <Heading mt={"10px"} size={"lg"} textColor="#285430">
            Sign in to your Account
          </Heading>
          <Stack mt={"20px"} spacing={"8px"}>
            <Text textColor={"#285430"} justifyContent="space-between">
              Phone Number or Email
            </Text>
            <Input
              placeholder="08xxx or yourname@example.com"
              _placeholder={{ color: "#5F8D4E" }}
              bgColor={"white"}
              textColor="black"
              borderColor={"#285430"}
              border={"2px"}
              w={"230px"}
              ref={inputPhoneEmail}
            ></Input>
            <Text textColor={"#285430"}>Password</Text>
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
                  w={"230px"}
                  position="absolute"
                ></Input>
                <Button
                  color={"black"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                  pos="relative"
                  ml={"181px"}
                  zIndex="1"
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </Flex>
            </InputGroup>
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
              Sign In
            </Button>
            <Box display={"flex"} justifyContent="center">
              <Text mr={"8px"} textColor="gray.800">
                Forgot Password
              </Text>
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
    </div>
  );
};
