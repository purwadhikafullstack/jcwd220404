import { ArrowBackIcon, ArrowUpIcon, EditIcon } from "@chakra-ui/icons";
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
  Stack,
  Text,
  Select,
  Tag,
  useDisclosure,
  Popover,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup,
} from "@chakra-ui/react";
import { useRef } from "react";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import React from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

export const ProfilePage = (user) => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState("upload");
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { id } = useSelector((state) => state.userSlice.value);
  const inputGender = useRef("");
  const inputBirthDate = useRef("");
  const inputName = useRef("");
  const inputProfilePic = useRef("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const updateData = async () => {
    try {
      console.log(inputBirthDate);
      const user = {
        name: inputName.current.value,
        gender: inputGender.current.value,
        birthDate: inputBirthDate.current.value,
        profilePic: inputProfilePic.current.value,
      };
      const result = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/user/update/${id}`,
        user
      );
      console.log(result);
      Swal.fire({
        icon: "success",
        width: "370",
        text: "Data Updated",
      });
      setTimeout(() => window.location.replace("/account"), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/byId/${params.id}`
      );
      setData(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChoose = (e) => {
    console.log("e.target.files", e.target.files);
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const data = new FormData();
    console.log(data);
    data.append("file", image);
    console.log(data.get("file"));

    const resultImage = await Axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/user/single-uploaded/${id}`,
      data,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    console.log(resultImage.data);
    setProfile(resultImage.data.profilePic);
    setImage({ images: "" });
    window.location.replace("/account");
  };
  console.log(image);
  console.log(profile);

  const toEmail = () => {
    navigate("/account/profile/email");
  };

  const toPass = () => {
    navigate("/account/profile/password");
  };

  return (
    <div>
      <Center>
        <Box
          className="header"
          w={"390px"}
          h={"80px"}
          bgColor="#E5D9B6"
          display={"flex"}
          justifyContent="space-between"
          pt={"10px"}
          pl={"1px"}
          pos="fixed"
          top={"0"}
          zIndex={"2"}
        >
          <Box as={Link} to={"/account"}>
            <ArrowBackIcon
              mt={"20px"}
              ml={"20px"}
              pos={"fixed"}
              color="#285430"
              fontSize={"25px"}
            />
          </Box>
          <Box margin={"auto"} alignItems={"center"} textColor="#285430">
            <Text as={"b"} fontSize="xl">
              PROFILE
            </Text>
          </Box>
        </Box>

        <Box
          mt={"80px"}
          className="body"
          bgColor="white"
          h={"740px"}
          w={"390px"}
          overflow="-moz-hidden-unscrollable"
        >
          <Avatar
            size={"lg"}
            bg="gray.500"
            ml={"8"}
            mt="5"
            src={`${process.env.REACT_APP_API_BASE_URL}/${data.Profile?.profilePic}`}
          />
          <Tag
            mt={"30px"}
            as={"button"}
            ml={"10px"}
            size="8"
            onClick={onToggle}
          >
            <ArrowUpIcon mr={"8px"} fontSize="20" textColor={"#285430"} />{" "}
            <Text color={"#285430"}>Upload Picture</Text>
          </Tag>

          <Popover
            returnFocusOnClose={false}
            isOpen={isOpen}
            onClose={onClose}
            closeOnBlur={false}
            >
            <PopoverContent w={"380px"} ml="530px" mt="170px">
              <PopoverBody>
                <PopoverArrow />
                <PopoverCloseButton />
                  <ButtonGroup size="sm">
              <Box>
                    <form encType="multipart/form-data">
                      <input
                        color="#285430"
                        type={"file"}
                        accept="image/*"
                        name="file"
                        size={"100px"}
                        onChange={(e) => handleChoose(e)}
                        ></input>
                    </form><Center>

                    <Button
                    mt="3"
                    ml="30px"
                      bgColor={"#A4BE7B"}
                      borderColor="#285430"
                      border="2px"
                      fontSize="14px"
                      color="gray.800"
                      width={"30%"}
                      onClick={handleUpload}
                      size="sm"
                      >
                      Upload
                    </Button>
                        </Center>
                      </Box>
                  </ButtonGroup>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Heading mt={"20px"} ml="8" size={"md"} color="#285430">
            Personal Data
          </Heading>
          <Stack spacing={"20px"} mt={"20px"}>
            <FormControl>
              <FormLabel color={"#285430"} ml="8">
                Name
              </FormLabel>
              <Flex>
                <Input
                  w={"max"}
                  ml={"8"}
                  borderColor="#285430"
                  border="2px"
                  ref={inputName}
                  placeholder="Name"
                  _placeholder={{ color: "#285430" }}
                  defaultValue={data.name}
                  textColor="black"
                ></Input>
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel color={"#285430"} ml={"8"}>
                Birthdate
              </FormLabel>
              <Input
                color={"#285430"}
                borderColor="#285430"
                border="2px"
                width="max"
                ml="8"
                placeholder="Select Date and Time"
                _placeholder={{ color: "#285430" }}
                size="md"
                type="date"
                defaultValue={data.Profile?.birthDate}
                onChange={(event) => setDate(event.target.value)}
                ref={inputBirthDate}
              />
            </FormControl>
            <FormControl>
              <FormLabel color={"#285430"} ml="8">
                Gender
              </FormLabel>
              <Select
                color={"#285430"}
                borderColor="#285430"
                border="2px"
                width="max"
                ml="8"
                ref={inputGender}
              >
                <option selected={data.Profile?.gender === ""} value="">
                  Select Gender
                </option>
                <option selected={data.Profile?.gender === "male"} value="male">
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
            <Center>
              <Button
                onClick={() => updateData(data.id)}
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
          <Heading ml="8" mt={"20px"} mb={"20px"} size={"md"} color="#285430">
            Account Information
          </Heading>
          <Stack spacing={"20px"}>
            <Box display={"flex"} justifyContent="space-between">
              <Text ml="8" color={"#285430"}>
                Phone Number
              </Text>
            </Box>
            <Text pl="8" color={"#285430"} as={"u"}>
              {data.phoneNumber}
            </Text>
            <Box display={"flex"} justifyContent="space-between">
              <Text ml="8" color={"#285430"}>
                Email
              </Text>
              <Box
                color={"#285430"}
                width="200px"
                as="button"
                onClick={toEmail}
              >
                <EditIcon />
              </Box>
            </Box>
            <Text pl="8" color={"#285430"} as={"u"}>
              {data.email}
            </Text>
            <Box display={"flex"} justifyContent="space-between">
              <Text ml="8" color={"#285430"}>
                Password
              </Text>
              <Box color={"#285430"} width="200px" as="button" onClick={toPass}>
                <EditIcon />
              </Box>
            </Box>
          </Stack>
        </Box>
      </Center>
    </div>
  );
};
