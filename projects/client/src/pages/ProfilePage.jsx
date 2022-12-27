import {
  ArrowBackIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  EditIcon,
} from "@chakra-ui/icons";
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
  Tag,
} from "@chakra-ui/react";
import { useRef } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser, syncData, updateUser } from "../redux/userSlice";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import React from "react";
// import Select from "react-select";
import Swal from "sweetalert2";

export const ProfilePage = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState("/Public");

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
      };

      const result = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/user/update/6`,
        user
      );
      console.log(result);
      Swal.fire({
        icon: "success",
        text: "Data Updated",
      });

      setTimeout(() => window.location.replace("/account"), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const result = await Axios.get(`http://localhost:8000/user/ById/6`);
      setData(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // const handleChoose = (e) => {
  //   console.log("e.target.files", e.target.files);
  //   setImage(e.target.files[0]);
  // };

  // const handleUpload = async () => {
  //   const data = new FormData();
  //   console.log(data);
  //   data.append("file", image);
  //   console.log(data.get("file"));

  //   const resultImage = await Axios.post(
  //     `http://localhost:2000/book/uploaded/${id}`,
  //     data,
  //     {
  //       headers: {
  //         "Content-type": "multipart/form-data",
  //       },
  //     }
  //   );
  //   console.log(resultImage.data);
  //   setProfile(resultImage.data.Images);
  //   setImage({ images: "" });
  // };
  // console.log(image);
  // console.log(profile);

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
          <Box as={Link} to={"/account"}>
            <ArrowBackIcon mt={"20px"} pos={"fixed"} />
          </Box>
          <Box
            mt={"60px"}
            className="body"
            bgColor="white"
            h={"1750px"}
            w={"390px"}
            zIndex={2}
          >
            <Center>
              <Box>
                <Avatar size={"lg"} bg="teal.500" />
                <Tag mt={"20px"} as={"button"} ml={"10px"}>
                  <ArrowUpIcon mr={"5px"} /> Upload Picture
                </Tag>
              </Box>
            </Center>
            <Heading mt={"20px"} size={"md"}>
              Personal Data
            </Heading>

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
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"
                  defaultValue={data.Profile?.birthDate}
                  onChange={(event) => setDate(event.target.value)}
                  ref={inputBirthDate}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Gender</FormLabel>

                <Select ref={inputGender}>
                  <option selected={data.Profile?.gender === ""} value="">
                    Select Gender
                  </option>
                  <option
                    selected={data.Profile?.gender === "male"}
                    value="male"
                  >
                    Male
                  </option>
                  <option
                    selected={data.Profile?.gender === "female"}
                    value="female"
                  >
                    Female
                  </option>
                </Select>
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
