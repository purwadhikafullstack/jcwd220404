import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useRef } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

export const ChangePassword = (data) => {
  const inputPass = useRef("");
  const params = useParams();
  const navigate = useNavigate();
  const updatePass = async () => {
    try {
      const user = {
        password: inputPass.current.value,
      };
      const res = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/user/updatePassword/6`,
        user
        // {
        //   password: document.getElementById("password").value,
        // },

        // { headers: { Authorization: `Bearer ${params.token}` } }
      );
      console.log(res);
      Swal.fire({
        icon: "success",
        text: "Success edit data",
        // text: `${result.data}`,
        
      });
      navigate("/account/profile");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Center>
        <Box w={"390px"} h={"844px"} bgColor="white">
          <Box
            mt={"100px"}
            className="body"
            bgColor="white"
            h={"1750px"}
            w={"390px"}
            pos="fixed"
          >
            <Heading textAlign={"center"}>Edit your Password</Heading>
            <Stack spacing={"20px"} mt={"20px"}>
              <FormControl isRequired>
                <FormLabel>Input Password Existing</FormLabel>
                <Input
                  type={"password"}
                  isRequired
                  placeholder="Current Password"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Create New Password</FormLabel>
                <Input
                  type={"password"}
                  ref={inputPass}
                  isRequired
                  placeholder="New Password"
                />
              </FormControl>
              <Button onClick={() => updatePass(data.id)}>Save</Button>
            </Stack>
          </Box>
        </Box>
      </Center>
    </div>
  );
};
