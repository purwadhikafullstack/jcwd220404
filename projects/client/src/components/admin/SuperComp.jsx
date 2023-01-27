import React, { useState } from "react";
import { logoutAdmin } from "../../redux/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Tab,
  TabPanels,
  Avatar,
  Button,
  useDisclosure,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Tabs,
} from "@chakra-ui/react";
import { AddBranchAdminComp } from "./AddBranchAdminComp";
import { ListAdminComp } from "./ListAdminComp";

export const SuperComp = () => {
  const { username } = useSelector((state) => state.adminSlice.value);
  const { isOpen, onClose, onToggle } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem("tokenSuper");
    navigate("/loginAdmin");
  };

  return (
    <div>
      <Box
        className="header"
        w={"100%"}
        h={"80px"}
        bgColor="#E5D9B6"
        display={"flex"}
        justifyContent="space-between"
        pt={"10px"}
        pl={"1px"}
        top={"0"}
        zIndex={"2"}
        pos="fixed"
      >
        <Box margin={"auto"} alignItems={"center"} textColor="#285430">
          <Text as={"b"} fontSize="xl">
            SUPER ADMIN
          </Text>
        </Box>
      </Box>
      <Flex
        mt={"80px"}
        className="body"
        bgColor="white"
        color="#285430"
        h={"100%"}
        w="100vw"
      >
        <Flex justify="space-between">
          <Box w="50vw">
            <Flex align="center">
              <Avatar
                bgColor={"gray.500"}
                display={"flex"}
                size={"lg"}
                ml="8"
                mt="3"
                mb="3"
                name={username}
              ></Avatar>
              <Text ml="3" textColor={"#285430"} fontSize="md">
                {username}
              </Text>
              <Button
                display={"flex"}
                bgColor={"#FF0000"}
                textColor="gray.800"
                width={"100px"}
                justifyContent={"center"}
                borderColor="#gray.800"
                border="2px"
                onClick={onToggle}
                ml="44vw"
                position="absolute"
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
                  ml="560"
                  mt="280"
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
            </Flex>
            <Accordion ml="3" mb={"30px"} allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton border="2px" borderRadius="md" w="50vw">
                    <Box color="#285430" as="span" flex="1" textAlign="left">
                      Add Branch
                    </Box>
                    <AccordionIcon color="#285430" />
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <AddBranchAdminComp />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>{" "}
          <Box>
            <Tabs ml="5vw" mt="6vw">
              <Tab as="b" color="#285430">
                List of Admin
              </Tab>
              <TabPanels>
                <ListAdminComp/>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </Flex>
    </div>
  );
};
