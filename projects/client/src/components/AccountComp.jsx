import { EditIcon } from "@chakra-ui/icons";
import {
  Stack,
  Button,
  Text,
  Box,
  StackDivider,
  useDisclosure,
  Avatar,
  Badge,
  Grid,
  GridItem,
  Tag,
  HStack,
  ButtonGroup,
  PopoverFooter,
  PopoverBody,
  PopoverArrow,
  PopoverContent,
  Popover,
} from "@chakra-ui/react";
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { logoutUser } from "../redux/userSlice";
import { LogoComp } from "./LogoComp";

export const AccountComp = () => {
  const { name, id } = useSelector((state) => state.userSlice.value);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { isOpen, onToggle, onClose } = useDisclosure();

  const onLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("tokenUser");
    navigate("/");
  };

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/byId/${id}`
      );
      setData(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const toProfile = () => {
    navigate(`/account/profile/${id}`);
  };
  const toAddress = () => {
    navigate(`/account/address/`);
    // navigate(`/account/address/${id}`);
  };

  return (
    <div>
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
        <Box margin={"auto"} alignItems={"center"} textColor="#285430">
          Account
        </Box>
      </Box>

      <Box
        mt={"100px"}
        className="body"
        bgColor="white"
        h={"844px"}
        w={"390px"}
        pos="fixed"
      >
        <Grid
          h="100px"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={"10px"}
        >
          <GridItem m={"auto"} rowSpan={2} colSpan={1}>
            <Avatar
              display={"flex"}
              size={"lg"}
              src={`http://localhost:8000/${data.Profile?.profilePic}`}
              bg="teal.500"
            ></Avatar>
          </GridItem>
          <GridItem colSpan={2}>
            <Badge textColor={"#285430"} fontSize="md" ml={"10px"} as="b">
              {name}
            </Badge>
          </GridItem>
          <GridItem rowSpan={7} colSpan={4}>
            <Tag
              textColor={"#285430"}
              as={"button"}
              ml={"10px"}
              onClick={toProfile}
            >
              <EditIcon textColor={"#285430"} mr={"5px"} /> Edit Profile
            </Tag>
          </GridItem>
        </Grid>
        <HStack
          borderColor={"#285430"}
          display="flex"
          justifyContent={"center"}
          divider={<StackDivider borderColor="#E5D9B6" />}
          align="center"
        >
          <Badge alignContent={"center"} mr="10px">
            Potongan Belanja
            <Text textAlign={"center"} textColor={"#285430"}>
              0
            </Text>
          </Badge>
          <Badge alignContent={"center"} ml="10px" textColor={"#285430"}>
            Gratis Ongkir
            <Text textAlign={"center"} textColor={"#285430"}>
              0
            </Text>
          </Badge>
        </HStack>

        <Stack
          mt={"30px"}
          divider={<StackDivider borderColor="transparent" />}
          spacing={"10px"}
          align="stretch"
        >
          <Button
            textAlign={"left"}
            variant={"unstyled"}
            ml={"30px"}
            textColor={"#285430"}
            onClick={toAddress}
            fontSize="sm"
          >
            My Address
          </Button>

          {/* <Button
            textAlign={"left"}
            variant={"unstyled"}
            ml={"10px"}
            textColor={"black"}
            h="40px"
          >
            Help
          </Button> */}
          <Button
            display={"flex"}
            bgColor={"#A4BE7B"}
            textColor="gray.800"
            width={"100px"}
            m="auto"
            justifyContent={"center"}
            borderColor="#285430"
            border="2px"
            onClick={onToggle}
          >
            <b>Logout</b> 
          </Button>
          <Popover
            returnFocusOnClose={false}
            isOpen={isOpen}
            placement="auto-end"
            closeOnBlur={false}
          >
            <PopoverContent ml="8" mt="275" bgColor={"#E5D9B6"}>
              <PopoverArrow />
              <PopoverBody textColor={"#285430"}>
                Are you sure you want to logout?
              </PopoverBody>
              <PopoverFooter display="flex" justifyContent="flex-end">
                <ButtonGroup size="sm">
                  <Button
                    onClick={onClose}
                    bgColor={"#A4BE7B"}
                    borderColor="#285430"
                    border="2px"
                    fontSize="14px"
                    color="gray.800"
                  >
                    No
                  </Button>
                  <Button
                    onClick={onLogout}
                    bgColor="#A4BE7B"
                    borderColor="#285430"
                    border="2px"
                    fontSize="14px"
                    color="gray.800"
                  >
                    Yes
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
          {/* <Box opacity={"initial"} margin={"auto"} w="50px">
            <LogoComp />
          </Box> */}
        </Stack>
      </Box>
    </div>
  );
};