import { useEffect, useRef, useState } from "react";
import { logoutAdmin } from "../../redux/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";
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
  Collapse,
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
  useColorMode,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { UpdateProductComp } from "./UpdateProductComp";
import { UpdateCategoryComp } from "./UpdateCategoryComp";
import { AddProduct } from "./AddProduct";
import { AddCategory } from "./AddCategory";
import { ListProduct } from "./ListProduct";
import { ListCategory } from "./ListCategory";

export const BranchComp = () => {
  const [edit, setEdit] = useState({});
  const [edit2, setEdit2] = useState({});
  const [profile3, setProfile3] = useState("upload");
  const [image3, setImage3] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const { username } = useSelector((state) => state.adminSlice.value);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const dispatch = useDispatch();
  const handleToggle = () => setShow(!show);
  const navigate = useNavigate();
  const params = useParams();

  const onLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem("tokenBranch");
    navigate("/loginAdmin");
  };

  const handleChoose2 = (e) => {
    console.log("e.target.files", e.target.files);
    setImage3(e.target.files[0]);
  };

  const handleUpload2 = async () => {
    const data = new FormData();
    console.log(data);
    data.append("file", image3);
    console.log(data.get("file"));

    const resultImage = await Axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/picture/single-uploaded-picture`,
      data,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    console.log(resultImage.data);
    setProfile3(resultImage.data.pictureName);
    setImage3({ images: "" });
    console.log(image3);
    console.log(profile3);
    Swal.fire({
      icon: "success",
      text: "Success",
      width: "370px",
    });

    window.location.replace("/admin-page");
  };

  const onRefresh = () => {
    window.location.replace("/admin-page");
  };

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
              Product Management
            </Text>
          </Box>
        </Box>
        <Box
          mt={"70px"}
          className="body"
          bgColor="white"
          color="gray.800"
          h={"1580px"}
          w={"390px"}
          // pos="fixed"
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
                    Add Picture
                  </Box>
                  <AccordionIcon color="gray.800" />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <ButtonGroup size="sm">
                  <form encType="multipart/form-data">
                    <input
                      type={"file"}
                      accept="image/*"
                      name="file"
                      size={"100px"}
                      onChange={(e) => handleChoose2(e)}
                    ></input>
                  </form>
                  <Button
                    mr="120px"
                    bgColor={"#A4BE7B"}
                    borderColor="#285430"
                    border="2px"
                    color="gray.800"
                    onClick={handleUpload2}
                    size="sm"
                  >
                    Upload
                  </Button>
                </ButtonGroup>
              </AccordionPanel>
            </AccordionItem>
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
                <AddProduct />
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
                <AddCategory />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          {/* <Flex as={"button"} onClick={onRefresh} justifyContent="space-between">
          <RepeatIcon color="#285430" />
        </Flex> */}

          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab color="#285430" as="button">
                Product List
              </Tab>
              <Tab color="#285430" as="button">
                Category List
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Collapse startingHeight={120} in={show}>
                  <ListProduct />
                </Collapse>
                <Button
                  bgColor={"#A4BE7B"}
                  borderColor="#285430"
                  border="2px"
                  fontSize="14px"
                  color="gray.800"
                  width={"100px"}
                  justifyContent="center"
                  size="sm"
                  onClick={handleToggle}
                  mt="1rem"
                >
                  Show {show ? "Less" : "More"}
                </Button>
              </TabPanel>
              <TabPanel>
                <Collapse startingHeight={100} in={show}></Collapse>
                <ListCategory />
                <Button
                  bgColor={"#A4BE7B"}
                  borderColor="#285430"
                  border="2px"
                  fontSize="14px"
                  color="gray.800"
                  width={"100px"}
                  justifyContent="center"
                  size="sm"
                  onClick={handleToggle}
                  mt="1rem"
                >
                  Show {show ? "Less" : "More"}
                </Button>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab color="#285430" as="button">
                Edit Product
              </Tab>
              <Tab color="#285430" as="button">
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
      </Box>
    </>
  );
};
