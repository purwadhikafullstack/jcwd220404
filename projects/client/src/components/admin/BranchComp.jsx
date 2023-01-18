import React, { useState } from "react";
import { logoutAdmin } from "../../redux/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Center,
  Grid,
  GridItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { UpdateProductComp } from "./UpdateProductComp";
import { UpdateCategoryComp } from "./UpdateCategoryComp";
import { AddProductComp } from "./AddProductComp";
import { AddCategoryComp } from "./AddCategoryComp";
import { ListProductComp } from "./ListProductComp";
import { ListCategoryComp } from "./ListCategoryComp";

export const BranchComp = () => {
  const { username } = useSelector((state) => state.adminSlice.value);
  const { isOpen, onClose, onToggle } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit, setEdit] = useState({});
  const [edit2, setEdit2] = useState({});

  const onLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem("tokenBranch");
    navigate("/loginAdmin");
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
            BRANCH ADMIN
          </Text>
        </Box>
      </Box>
      <Box
        mt={"70px"}
        className="body"
        bgColor="white"
        color="#285430"
        h={"100%"}
        w={"390px"}
      >
        <Center>
          <Text mt="5" as="b" color="#285430">
            Product Management
          </Text>
        </Center>
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
              ml="8"
              mt="3"
              mb="3"
              name={username}
            ></Avatar>
          </GridItem>
          <GridItem colSpan={1}>
            <Badge
              mt="8"
              textColor={"#285430"}
              fontSize="md"
              ml={"10px"}
              as="b"
            >
              {username}
            </Badge>
          </GridItem>
        </Grid>
        <Accordion mb={"30px"} allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box color="#285430" as="span" flex="1" textAlign="left">
                  Add Product
                </Box>
                <AccordionIcon color="gray.800" />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <AddProductComp />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box color="#285430" as="span" flex="1" textAlign="left">
                  Add Category
                </Box>
                <AccordionIcon color="gray.800" />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <AddCategoryComp />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab color="#285430" as="b">
              Product List
            </Tab>
            <Tab color="#285430" as="b">
              Category List
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ListProductComp />
            </TabPanel>
            <TabPanel>
              <ListCategoryComp />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab color="#285430" as="b">
              Edit Product
            </Tab>
            <Tab color="#285430" as="b">
              Edit Category
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UpdateProductComp data={edit} />
            </TabPanel>
            <TabPanel>
              <UpdateCategoryComp data={edit2} />
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
      </Box>
    </div>
  );
};
