import {
  Box,
  Button,
  Collapse,
  StackDivider,
  useDisclosure,
  Avatar,
  Badge,
  Grid,
  Stack,
  GridItem,
  HStack,
  Tag,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/userSlice";

export const AccountComp = () => {
  const { name, phoneNumber } = useSelector((state) => state.userSlice.value);
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
      >
        <Box margin={"auto"} alignItems={"center"} textColor="black">
          Account
        </Box>
      </Box>

      <Box className="body" h={"800px"} w={"390px"}>
        <Grid
          h="120px"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={"10px"}
        >
          <GridItem rowSpan={2} colSpan={1}>
            <Avatar
              name={name}
              src="https://bit.ly/tioluwani-kolawole"
              size={"xl"}
            ></Avatar>
          </GridItem>
          <GridItem colSpan={2}>
            <Badge ml={"10px"}>{name}</Badge>
          </GridItem>
          <GridItem rowSpan={7} colSpan={4}>
            <Tag as={"button"} ml={"10px"} onClick={onProfile}>
              Edit Profile
            </Tag>
          </GridItem>
        </Grid>
        <HStack divider={<StackDivider borderColor="teal" />} align="stretch">
          <Badge alignContent={"center"}>Voucher</Badge>
          <Badge alignContent={"center"}>jumlah</Badge>
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
            Privacy and Policy
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
            onClick={onToggle}
            variant={"unstyled"}
            ml={"10px"}
            textColor={"black"}
            h="40px"
          >
            Account Settings
          </Button>
          <Collapse in={isOpen} animateOpacity>
            <Box
              p="5px"
              color="black"
              mt="10px"
              bgColor={"salmon"}
              rounded="md"
              shadow="md"
              textAlign={"center"}
              as="button"
              onClick={onLogout}
              alignItems="stretch"
            >
              Logout
            </Box>
          </Collapse>
          <Box margin={"auto"} alignItems={"center"} bgColor={"ButtonShadow"}>
            Versi Aplikasi - 2.5.0
          </Box>
        </Stack>
      </Box>
    </div>
  );
};
