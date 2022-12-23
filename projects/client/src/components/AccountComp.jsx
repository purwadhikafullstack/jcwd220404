import { AddIcon, ArrowUpIcon, EditIcon } from "@chakra-ui/icons";
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Box,
  Collapse,
  StackDivider,
  useDisclosure,
  Avatar,
  Badge,
  Grid,
  GridItem,
  Tag,
  TagLeftIcon,
  TagLabel,
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
  const { isOpen, onToggle } = useDisclosure();
  const onLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("tokenUser");
    navigate("/");
  };

  const onProfile = () => {
    navigate("/account/profile");
  };
  const onAddress = () => {
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
            <Avatar display={"flex"} size={"lg"}></Avatar>
          </GridItem>
          <GridItem colSpan={2}>
            <Badge ml={"10px"}>{name}</Badge>
          </GridItem>
          <GridItem rowSpan={7} colSpan={4}>
            <Tag as={"button"} ml={"10px"} onClick={onProfile}>
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
            onClick={onAddress}
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

const WithBackgroundImage = () => {
  return (
    <Flex
      w={"full"}
      h={"100vh"}
      backgroundImage={
        "url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)"
      }
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
          <Text
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
          >
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
            eiusmod tempor
          </Text>
          <Stack direction={"row"}>
            <Button
              bg={"blue.400"}
              rounded={"full"}
              color={"white"}
              _hover={{ bg: "blue.500" }}
            >
              Show me more
            </Button>
            <Button
              bg={"whiteAlpha.300"}
              rounded={"full"}
              color={"white"}
              _hover={{ bg: "whiteAlpha.500" }}
            >
              Show me more
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
};
