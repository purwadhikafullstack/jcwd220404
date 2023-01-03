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
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userSlice";
import { LogoComp } from "./LogoComp";

export const AccountComp = () => {
  const { name } = useSelector((state) => state.userSlice.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("tokenUser");
    navigate("/");
  };

  const toProfile = (id) => {
    navigate(`/account/profile`);
  };
  const toAddress = () => {
    navigate("/account/address");
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
        <Box margin={"auto"} alignItems={"center"} textColor="black">
          Account
        </Box>
      </Box>

      <Box
        mt={"100px"}
        className="body"
        bgColor="white"
        h={"1750px"}
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
              src={`http://localhost:8000/upload/PIMG-167222530022518785.jpeg`}
              bg="teal.500"
            ></Avatar>
          </GridItem>
          <GridItem colSpan={2}>
            <Badge ml={"10px"}>{name}</Badge>
          </GridItem>
          <GridItem rowSpan={7} colSpan={4}>
            <Tag as={"button"} ml={"10px"} onClick={toProfile}>
              <EditIcon mr={"5px"} /> Edit Profile
            </Tag>
          </GridItem>
        </Grid>
        <HStack
          borderColor={"black"}
          display="flex"
          justifyContent={"center"}
          divider={<StackDivider borderColor="teal" />}
          align="center"
        >
          <Badge alignContent={"center"} mr="10px">
            Potongan Belanja<Text textAlign={"center"}>0</Text>
          </Badge>
          <Badge alignContent={"center"} ml="10px">
            Gratis Ongkir<Text textAlign={"center"}>0</Text>
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
            ml={"10px"}
            textColor={"black"}
            h="40px"
            onClick={toAddress}
          >
            My Address
          </Button>

          <Button
            textAlign={"left"}
            variant={"unstyled"}
            ml={"10px"}
            textColor={"black"}
            h="40px"
          >
            Help
          </Button>
          <Button
            textAlign={"left"}
            onClick={onLogout}
            variant={"unstyled"}
            ml={"10px"}
            textColor={"black"}
            h="40px"
          >
            Logout Account
          </Button>

          <Box opacity={"initial"} margin={"auto"} w="50px">
            <LogoComp />
          </Box>
        </Stack>
      </Box>
    </div>
  );
};
