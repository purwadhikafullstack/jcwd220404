import { Box, Button, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { loginUser } from "../../redux/userSlice";

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

      const result = await Axios.post("http://localhost:8000/user/login", user);

      dispatch(
        loginUser({
          phoneNumber: result.data.isUserExist.phoneNumber,
          name: result.data.isUserExist.name
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
      <Box className="body" h={"800px"} w={"390px"}>
        <Heading mt={"100px"} size={"lg"} textAlign={"center"}>
          Sign in to your Account
        </Heading>
        <Stack mt={"20px"} spacing={"10px"}>
          <Text>Phone Number or Email</Text>
          <Input
            placeholder="08xxx or yourname@example.com"
            ref={inputPhoneEmail}
          ></Input>
          <Text>Password</Text>
          <Input
            type={"password"}
            placeholder="Your Password"
            ref={inputPass}
          ></Input>
          <Button onClick={onLogin}>Sign In</Button>
        </Stack>
      </Box>
    </div>
  );
};
