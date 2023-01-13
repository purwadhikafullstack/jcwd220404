import { useEffect, useState } from "react";
import { logoutAdmin } from "../../redux/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
} from "@chakra-ui/react";
import { UpdateProductComp } from "../../components/admin/UpdateProductComp";
import { UpdateCategoryComp } from "../../components/admin/UpdateCategoryComp";
import { AddProduct } from "../../components/admin/AddProduct";
import { AddCategory } from "../../components/admin/AddCategory";
import { ListProduct } from "../../components/admin/ListProduct";
import { ListCategory } from "../../components/admin/ListCategory";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

export const BranchComp = () => {
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState("upload");
  const [edit, setEdit] = useState({});
  const [edit2, setEdit2] = useState({});
  const [data2, setData2] = useState([]);
  const [image2, setImage2] = useState("");
  const [profile2, setProfile2] = useState("upload");
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
    navigate("/login-admin");
  };

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/list`
      );
      console.log(res.data);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [edit]);

  const onDelete = async (id) => {
    try {
      const res = await Axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/product/remove/${id}`
      );
      console.log(res);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChoose = (e) => {
    console.log("e.target.files", e.target.files);
    setImage(e.target.files[0]);
  };

  const handleUpload = async (id) => {
    const data = new FormData();
    console.log(data);
    data.append("file", image);
    console.log(data.get("file"));

    const resultImage = await Axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/product/single-uploaded/${id}`,
      data,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    console.log(resultImage.data);
    setProfile(resultImage.data.picture);
    setImage({ images: "" });
    console.log(image);
    console.log(profile);
    window.location.replace("/admin");
  };

  const getCategory = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/listCategory`
      );
      console.log(res.data);
      setData2(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, [edit2]);

  const onDeleteCategory = async (id) => {
    try {
      const res = await Axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/product/removeCategory/${id}`
      );
      console.log(res);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChoose1 = (e) => {
    console.log("e.target.files", e.target.files);
    setImage2(e.target.files[0]);
  };

  const handleUpload1 = async (id) => {
    const data = new FormData();
    console.log(data);
    data.append("file", image2);
    console.log(data.get("file"));

    const resultImage = await Axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/product/single-uploaded-category/${id}`,
      data,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    console.log(resultImage.data);
    setProfile2(resultImage.data.categoryPicture);
    setImage2({ images: "" });
    console.log(image2);
    console.log(profile2);
    window.location.replace("/admin");
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

    window.location.replace("/admin");
  };

  const onRefresh = () => {
    window.location.replace("/admin");
  };

  return (
    <>
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
                <TableContainer>
                  <Table variant="simple" colorScheme="teal">
                    <Thead alignContent={"center"}>
                      <Tr>
                        <Th color={"#285430"}>Product</Th>
                        <Th color={"#285430"}>Actions</Th>
                        <Th color={"#285430"}>Picture</Th>
                        <Th color={"#285430"}>Distributor</Th>
                        <Th color={"#285430"}>Description</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.map((item) => {
                        return (
                          <Tr>
                            <Td color={"#285430"}>{item.productName}</Td>
                            <Td color={"#285430"}>
                              <Box
                                mr="28px"
                                display={"flex"}
                                justifyContent="space-evenly"
                              >
                                <Button onClick={() => setEdit(item)}>
                                  <EditIcon color={"#285430"} />
                                </Button>
                                <Button onClick={() => onDelete(item.id)}>
                                  <DeleteIcon color={"#285430"} />
                                </Button>
                              </Box>
                            </Td>

                            <Td>
                              <Image
                                boxSize={"50px"}
                                src={
                                  `${process.env.REACT_APP_API_BASE_URL}/` +
                                  item.picture
                                }
                              />
                              <ButtonGroup size="sm">
                                <form encType="multipart/form-data">
                                  <input
                                    color="#285430"
                                    type={"file"}
                                    accept="image/*"
                                    name="file"
                                    size={"100px"}
                                    onChange={(e) => handleChoose(e)}
                                  ></input>
                                </form>
                                <Button
                                  bgColor={"#A4BE7B"}
                                  borderColor="#285430"
                                  border="2px"
                                  fontSize="14px"
                                  color="gray.800"
                                  width={"100%"}
                                  justifyContent="center"
                                  onClick={handleUpload}
                                  size="sm"
                                >
                                  Upload
                                </Button>
                              </ButtonGroup>
                            </Td>
                            <Td color={"#285430"}>{item.description}</Td>
                            <Td>{item.distributor}</Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
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
              <TableContainer>
                <Table variant="simple" colorScheme="teal">
                  <Thead>
                    <Tr>
                      <Th color={"#285430"}>Category</Th>
                      <Th color={"#285430"}>Actions</Th>
                      <Th color={"#285430"}>Picture</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data2?.map((item) => {
                      return (
                        <Tr>
                          <Td color={"#285430"} textColor="black">
                            {item.categoryName}
                          </Td>
                          <Td>
                            <Button onClick={() => setEdit2(item)}>
                              <EditIcon color={"#285430"} />
                            </Button>
                            <Button onClick={() => onDeleteCategory(item.id)}>
                              <DeleteIcon color={"#285430"} />
                            </Button>
                          </Td>
                          <Td>
                            <Image
                              boxSize={"50px"}
                              src={
                                `${process.env.REACT_APP_API_BASE_URL}/` +
                                item.categoryPicture
                              }
                            />
                            <ButtonGroup size="sm">
                              <form encType="multipart/form-data">
                                <input
                                  type={"file"}
                                  accept="image/*"
                                  name="file"
                                  size={"100px"}
                                  onChange={(e) => handleChoose1(e)}
                                ></input>
                              </form>
                              <Button
                                bgColor={"#A4BE7B"}
                                borderColor="#285430"
                                border="2px"
                                fontSize="14px"
                                color="gray.800"
                                width={"100%"}
                                justifyContent="center"
                                onClick={handleUpload1}
                                size="sm"
                              >
                                Upload
                              </Button>
                            </ButtonGroup>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
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
    </>
  );
};
