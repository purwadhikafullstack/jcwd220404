import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
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
  Flex,
} from "@chakra-ui/react";
import Axios from "axios";
import { RegisterAdmin } from "../../components/admin/RegisterAdmin";
import { ListAdmin } from "../../components/admin/ListAdmin";
import { LogoutSuper } from "../../components/admin/LogoutSuper";

export const SuperComp = () => {
  const [data2, setData2] = useState([]);
  const { username } = useSelector((state) => state.adminSlice.value);

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
            <LogoutSuper />
          </Box>
        </Box>
      </Box>
    </>
  );
};
