import { Link, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
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
import { ArrowBackIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { logoutUser } from "../../redux/userSlice";

export const ChangePassword = (data) => {
  const [move, setMove] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const { id } = useSelector((state) => state.userSlice.value);
  const inputPass = useRef("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

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
        text: "Password has changed, please Login again",
        // text: `${result.data}`,
      });
      dispatch(logoutUser());
      localStorage.removeItem("tokenUser");
      navigate("/login-user");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Center>
        <Box w={"390px"} h={"844px"} bgColor="#E5D9B6">
          <Box as={Link} to={`/account/profile/${id}`}>
            <ArrowBackIcon
              mt={"20px"}
              pos={"fixed"}
              ml={"20px"}
              color="#285430"
              fontSize={"25px"}
            />
          </Box>
          <Box
            mt={"100px"}
            className="body"
            bgColor="white"
            h={"1750px"}
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
                    type={"password"}
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
                      setCurrentPassword((currentPassword) => !currentPassword)
                    }
                    pos="relative"
                    ml={"181px"}
                    zIndex="1"
                    variant={"unstyled"}
                  >
                    {currentPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </Flex>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Create New Password</FormLabel>
                <Input
                  type={"password"}
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
                  onClick={() => setNewPassword((newPassword) => !newPassword)}
                  pos="relative"
                  ml={"181px"}
                  zIndex="1"
                  variant={"unstyled"}
                >
                  {newPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </FormControl>
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
            </Stack>
          </Box>
        </Box>
      </Center>
    </>
  );
};