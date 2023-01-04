import { EditIcon } from "@chakra-ui/icons";
import {
  Stack,
  Button,
  Text,
  Box,
  StackDivider,
  Avatar,
  Badge,
  Grid,
  GridItem,
  Tag,
  HStack,
  useDisclosure,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userSlice";
import { NavbarComp } from "./NavbarComp";

export const AccountComp = () => {
  const { name } = useSelector((state) => state.userSlice.value);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("tokenUser");
    navigate("/");
  };

  const toProfile = () => {
    navigate("/account/profile");
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
        <Box margin={"auto"} alignItems={"center"} textColor="#285430">
          <Text as={"b"} fontSize="xl">
            ACCOUNT
          </Text>
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
              bgColor={"gray.500"}
              display={"flex"}
              size={"lg"}
              src={`http://localhost:8000/upload/PIMG-167280588303621324.jpeg`}             
               ml="8"
            ></Avatar>
          </GridItem>
          <GridItem colSpan={1}>
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
          <Badge alignContent={"center"} mr="10px" textColor={"#285430"}>
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
          >
            My Address
          </Button>
          <Button
            display={"flex"}
            bgColor={"#FF0000"}
            textColor="gray.800"
            width={"100px"}
            m="auto"
            justifyContent={"center"}
            borderColor="#285430"
            border="2px"
            onClick={onToggle}
          >
            LogOut
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
        </Stack>
      </Box>
      <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}>
        <NavbarComp />
      </Box>
    </div>
  );
};
