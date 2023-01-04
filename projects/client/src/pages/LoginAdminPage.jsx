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
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { loginAdmin } from "../redux/adminSlice";
import OnlyFreshLogo from "../OnlyFreshLogo.png";
import Swal from "sweetalert2";

const url = "http://localhost:8000/admin/login";

export const LoginAdminPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const inputUsernameEmail = useRef("");
  const inputPass = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async () => {
    try {
      const admin = {
        password: inputPass.current.value,
        usernameEmail: inputUsernameEmail.current.value,
      };

      const result = await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/admin/login`, admin);

      dispatch(
        loginAdmin({
          id: result.data.isUserExist.id,
          username: result.data.isUserExist.username,
          email: result.data.isUserExist.email,
          isSuper: result.data.isUserExist.isSuper,
        })
      );
      if (result.data.isUserExist.isSuper === 2) {
        localStorage.setItem("tokenSuper", result.data.token);
      } else if (result.data.isUserExist.isSuper === 1) {
        localStorage.setItem("tokenBranch", result.data.token);
      } else if (!result.data.isUserExist.isSuper) {
        localStorage.setItem("tokenUser", result.data.token);
      }
      navigate("/adminPage");
    } catch (err) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: `${err.response.data}`,
      //   timer: 1000,
      //   customClass: {
      //     container: "my-swal",
      //   },
      // });
      navigate("/forbidden")
    }
  };

  return (
    <div>
      <Center>
        <Box ml="8" py={10} px={6} bgColor="#E5D9B6" w={"390px"} h={"850px"}>
          <Image src={OnlyFreshLogo} height="150px" w={"auto"} ml={"70px"} />

          <Heading mt={"10px"} size={"lg"} textColor="#285430">
            Sign in to Admin
          </Heading>
          <Stack mt={"20px"} spacing={"8px"}>
            <Text textColor={"#285430"} justifyContent="space-between">
              Username or Email
            </Text>
            <Input
              placeholder="Username or Your Email"
              _placeholder={{ color: "#5F8D4E" }}
              bgColor={"white"}
              textColor="black"
              borderColor={"#285430"}
              border={"2px"}
              w={"230px"}
              ref={inputUsernameEmail}
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
          </Stack>
        </Box>
      </Center>
    </div>
  );
};
