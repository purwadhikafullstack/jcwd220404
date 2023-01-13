import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  useDisclosure,
  useColorMode,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Avatar,
  Popover,
  PopoverArrow,
  ButtonGroup,
  PopoverFooter,
  PopoverBody,
  PopoverContent,
  Flex,
} from "@chakra-ui/react";
import Axios from "axios";
import { logoutAdmin } from "../../redux/adminSlice";
import { RegisterAdmin } from "../../components/admin/RegisterAdmin";
import { ListAdmin } from "../../components/admin/ListAdmin";

export const SuperComp = () => {
  const [edit, setEdit] = useState({});
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const { username } = useSelector((state) => state.adminSlice.value);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem("tokenSuper");
    navigate("/login-admin");
  };

  const getBranch = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/branch/findAll`
      );
      console.log(res.data);
      setData2(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBranch();
  }, []);

  return (
    <>
      <Box>
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
              Branch Admin Management
            </Text>
          </Box>
        </Box>
        <Box
          mt={"100px"}
          className="body"
          bgColor="white"
          h={"1750px"}
          w={"390px"}
        >
          <Box>
            <Flex display={"flex"} justifyContent="end">
              <Avatar name={username}></Avatar>
            </Flex>
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab as="button" color="#285430">
                  Add Admin
                </Tab>
                <Tab as="button" color="#285430">
                  List of Admin
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel textColor="#285430">
                  <RegisterAdmin />
                </TabPanel>
                <TabPanel>
                  <ListAdmin />
                </TabPanel>
              </TabPanels>
            </Tabs>

            <Button
              display={"flex"}
              bgColor={"#FF0000"}
              textColor="gray.800"
              width={"100px"}
              m="auto"
              justifyContent={"center"}
              borderColor="#gray.800"
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
              <PopoverContent
                ml="8"
                mt="275"
                borderColor="#285430"
                border="2px"
                bgColor={"#E5D9B6"}
              >
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
          </Box>
        </Box>
      </Box>
    </>
  );
};
