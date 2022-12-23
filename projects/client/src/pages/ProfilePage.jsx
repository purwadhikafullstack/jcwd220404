import { EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputRightElement,
  Stack,
  Text,
  Select,
} from "@chakra-ui/react";
import { useRef } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../redux/userSlice";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
// import Select from "react-select";
import Swal from "sweetalert2";

export const ProfilePage = (user) => {
  const [data, setData] = useState([]);
  const [gender, setGender] = useState("");
  const { id } = useSelector((state) => state.userSlice.value);
  const inputGender = useRef("");
  const inputBirthDate = useRef("");
  const inputProfilePic = useRef("");
  const inputName = useRef("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const updateData = async () => {
    try {
      const user = {
        name: inputName.current.value,
        gender: inputGender.current.value,
        birthDate: inputBirthDate.current.value,
        // profilePic: inputProfilePic.current.value,
      };
      const result = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/user/update/6`,
        user
      );
      console.log(result);
      Swal.fire({
        icon: "success",
        text: "Success edit data",
        // text: `${result.data}`,
      });
      navigate("/account");
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const result = await Axios.get(`http://localhost:8000/user/getById/6`);
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const toEmail = () => {
    navigate("/account/email");
  };

  const toPass = () => {
    navigate("/account/password");
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
          >
            <Avatar size={"sm"} bg="teal.500" alignContent={"center"} />
            <Heading size={"md"}>Personal Data</Heading>
            <Stack spacing={"20px"} mt={"20px"}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Flex>
                  <Input
                    ref={inputName}
                    placeholder="Name"
                    defaultValue={data.name}
                  ></Input>
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel>Birthdate</FormLabel>
                <Input
                  placeholder="Birth Date"
                  type={"text"}
                  defaultValue={data.Profile?.birthDate}
                ></Input>
                {/* <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"
                  defaultValue={data.Profile?.birthDate}
                /> */}
              </FormControl>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Input
                  placeholder="Gender"
                  ref={inputGender}
                  defaultValue={data.Profile?.gender}
                ></Input>
                {/* <Select placeholder="Select gender" ref={inputGender}>
                  <option value={"male"}>Male</option>
                  <option value={"female"}>Female</option>
                </Select> */}
              </FormControl>
              <Button onClick={() => updateData(data.id)}>Save</Button>
            </Stack>
            <Heading mt={"20px"} mb={"20px"} size={"md"}>
              Account Information
            </Heading>
            <Stack spacing={"20px"}>
              <Box display={"flex"} justifyContent="space-between">
                <Text>Phone Number</Text>
              </Box>
              <Text as={"u"}>{data.phoneNumber}</Text>
              <Box display={"flex"} justifyContent="space-between">
                <Text>Email</Text>
                <Box as="button" onClick={toEmail}>
                  <EditIcon />
                </Box>
              </Box>
              <Text as={"u"}>{data.email}</Text>
              <Box display={"flex"} justifyContent="space-between">
                <Text>Password</Text>
                <Box as="button" onClick={toPass}>
                  <EditIcon />
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Center>
    </div>
  );
};
