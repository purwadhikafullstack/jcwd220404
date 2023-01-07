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
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import Axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../redux/adminSlice";
import Swal from "sweetalert2";
import OnlyFreshLogo from "../../OnlyFresh.jpg";

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
      navigate("/restricted");
    }
  };

  return (
    <>
      <Center py={6}>
        <Box ml="8" py={10} px={6} bgColor="#E5D9B6" w={"390px"} h={"850px"}>
          <Box w={"full"} boxShadow={"2xl"} rounded={"md"} overflow={"hidden"}>
            <Image src={OnlyFreshLogo} height="150px" w={"auto"} ml={"70px"} />
            {/* <Flex justify={"center"} mt={-12}>
              <Box h={100} w={100} borderWidth="2px">
                <Image src={OnlyFreshLogo} height="100%" />
              </Box>
            </Flex> */}
            <Stack mt={"20px"} spacing={"8px"}>
              <Text textColor={"#285430"} justifyContent="space-between">
                Username or Email
              </Text>
              <Box rounded={"lg"} boxShadow={"lg"} p={8}>
                <Stack spacing={4}>
                  <FormControl>
                    <FormLabel textColor={"#285430"} htmlFor="username">
                      Username or Email
                    </FormLabel>
                    <Input
                      type="text"
                      name="username"
                      variant="filled"
                      ref={inputUsernameEmail}
                      placeholder="Username or Your Email"
                      _placeholder={{ color: "#5F8D4E" }}
                      bgColor={"white"}
                      textColor="black"
                      borderColor={"#285430"}
                      border={"2px"}
                      w={"340px"}
                    />
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel textColor={"#285430"}>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        ref={inputPass}
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
                  </FormControl>
                  <Stack spacing={10}>
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
                      Sign in
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Center>
    </>
  );
};
