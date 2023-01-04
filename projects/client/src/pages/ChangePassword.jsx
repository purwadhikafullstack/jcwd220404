import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useRef } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate} from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import { ArrowBackIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

export const ChangePassword = (data) => {
  const [CurrentPassword, setCurrentPassword] = useState(false);
  const [NewPassword, setNewPassword] = useState(false);
  const inputPass = useRef("");
  const navigate = useNavigate();
  const {id} = useSelector((state) => state.userSlice.value)

  const updatePass = async () => {
    try {
      const user = {
        password: inputPass.current.value,
      };
      const res = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/user/updatePassword/${id}`,
        user
        // {
        //   password: document.getElementById("password").value,
        // },

        // { headers: { Authorization: `Bearer ${params.token}` } }
      );

      console.log(res);
      Swal.fire({
        icon: "success",
        width: "370",
        text: "Password has changed",
      });
      navigate("/account/profile");
    } catch (err) {}
  };
  return (
    <div>
      <Center>
        <Box w={"390px"} h={"844px"} bgColor="#E5D9B6">
          <Box as={Link} to={"/account/profile"}>
            <ArrowBackIcon
              mt={"20px"}
              ml={"20px"}
              pos={"fixed"}
              color="#285430"
              fontSize={"25px"}
            />
          </Box>
          <Box
            mt={"100px"}
            className="body"
            bgColor="#E5D9B6"
            w={"390px"}
            pos="fixed"
          >
            <Heading textAlign={"center"} color="#285430">
              Edit your Password
            </Heading>
            <Stack spacing={"20px"} mt={"20px"}>
              <FormControl isRequired>
                <FormLabel color={"#285430"} ml="8">
                  Input Password Existing
                </FormLabel>
                <Flex>
                  <Input
                    type={
                        CurrentPassword
                          ? "text"
                          : "password"
                      }
                    isRequired
                    placeholder="Current Password"
                    _placeholder={{ color: "#5F8D4E" }}
                    textColor={"#285430"}
                    borderColor={"#285430"}
                    border={"2px"}
                    width="200px"
                    ml={"8"}
                    position="absolute"
                  />
                  <Button
                    color={"black"}
                    onClick={() =>
                      setCurrentPassword((CurrentPassword) => !CurrentPassword)
                    }
                    pos="relative"
                    ml={"181px"}
                    zIndex="1"
                  >
                    {CurrentPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </Flex>
              </FormControl>
              <FormControl isRequired>
                <FormLabel color={"#285430"} ml="8">
                  Create New Password
                </FormLabel>
                <Flex>
                  <Input
                    type={
                        NewPassword
                          ? "text"
                          : "password"
                      }
                    ref={inputPass}
                    isRequired
                    placeholder="New Password"
                    _placeholder={{ color: "#5F8D4E" }}
                    textColor={"#285430"}
                    borderColor={"#285430"}
                    border={"2px"}
                    width="200px"
                    ml={"8"}
                    position="absolute"
                  />
                  <Button
                    color={"black"}
                    onClick={() =>
                      setNewPassword((NewPassword) => !NewPassword)
                    }
                    pos="relative"
                    ml={"181px"}
                    zIndex="1"
                  >
                    {NewPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </Flex>
              </FormControl>
              <Center>
                <Button
                  onClick={() => updatePass(data.id)}
                  bgColor={"#A4BE7B"}
                  borderColor="#285430"
                  border="2px"
                  fontSize="18px"
                  color="gray.800"
                  width={"100px"}
                  justifyContent="center"
                >
                  Save
                </Button>
              </Center>
            </Stack>
          </Box>
        </Box>
      </Center>
    </div>
  );
};
