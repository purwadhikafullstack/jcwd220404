import React, { useEffect, useRef, useState } from "react";
import { logoutAdmin } from "../../redux/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  Select,
  Stack,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import Axios from "axios";
import { DeleteIcon, EditIcon, RepeatIcon } from "@chakra-ui/icons";
import { UpdateProductComp } from "./UpdateProductComp";
import { UpdateCategoryComp } from "./UpdateCategoryComp";

export const BranchComp = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [edit, setEdit] = useState({});
  const [edit2, setEdit2] = useState({});
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState("upload");
  const [image2, setImage2] = useState("");
  const [profile2, setProfile2] = useState("upload");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const { username } = useSelector((state) => state.adminSlice.value);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const dispatch = useDispatch();
  const inputProductName = useRef("");
  const inputDescription = useRef("");
  const inputDistributor = useRef("");
  const inputCategoryName = useRef("");
  const handleToggle = () => setShow(!show);
  const navigate = useNavigate();
  const params = useParams()

  const onCreate = async () => {
    try {
      const addProduct = {
        productName: inputProductName.current.value,
        description: inputDescription.current.value,
        distributor: inputDistributor.current.value,
      };
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/product/create`,
        addProduct
      );
      Swal.fire({
        icon: "success",
        text: "Success",
      });
      setTimeout(() => window.location.replace("/adminPage"), 2000);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const onCreateCategory = async () => {
    try {
      const addProduct = {
        categoryName: inputCategoryName.current.value,
      };
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/product/createCategory`,
        addProduct
      );
      Swal.fire({
        icon: "success",
        text: "Success",
      });

      setTimeout(() => window.location.replace("/adminPage"), 2000);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const onLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem("tokenBranch");
    navigate("/loginAdmin");
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

  const handleChoose = (e) => {
    console.log("e.target.files", e.target.files);
    setImage(e.target.files[0]);
  };

  const handleChoose1 = (e) => {
    console.log("e.target.files", e.target.files);
    setImage2(e.target.files[0]);
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
  };

  const onRefresh = () => {
    setTimeout(() => window.location.replace("/adminPage"), 2000);
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
        h={"844px"}
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

        <Accordion mb={"30px"} allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Add Product
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel pb={4}>
              <Stack spacing={"10px"}>
                <FormControl>
                  <FormLabel>Nama Produk</FormLabel>
                  <Input ref={inputProductName} placeholder="Produk"></Input>
                </FormControl>
                <FormLabel>Distributor</FormLabel>
                <Input ref={inputDistributor} placeholder="Distributor"></Input>
                <FormControl>
                  <FormLabel>Category 1</FormLabel>
                  <Select>
                    {data2?.map((item) => {
                      return (
                        <>
                          <option>{item.categoryName}</option>
                        </>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Category 2</FormLabel>
                  <Select>
                    {data2?.map((item) => {
                      return (
                        <>
                          <option>{item.categoryName}</option>
                        </>
                      );
                    })}
                  </Select>
                </FormControl>
                {/* <FormControl>
                        <FormLabel>Category 2</FormLabel>
                        <Select>
                          <option>{item.categoryName}</option>
                        </Select>
                      </FormControl> */}
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea ref={inputDescription}></Textarea>
                </FormControl>
                <Button onClick={onCreate}>Add Product</Button>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Add Category
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack spacing={"10px"}>
                <FormControl>
                  <FormLabel>Nama Category</FormLabel>
                  <Input ref={inputCategoryName} placeholder="Kategori"></Input>
                </FormControl>
                <Button onClick={onCreateCategory}>Add Category</Button>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Flex as={"button"} onClick={onRefresh} justifyContent={"right"}>
          <RepeatIcon />
        </Flex>

        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Product List</Tab>
            <Tab>Category List</Tab>
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
                                <Button onClick={() => onDelete(item.id)}>
                                  <DeleteIcon color={"#285430"} />
                                </Button>
                                <Button onClick={() => setEdit(item)}>
                                  <EditIcon color={"#285430"} />
                                </Button>
                              </Box>
                            </Td>

                            <Td>
                              <Image
                                boxSize={"50px"}
                                src={"http://localhost:8000/" + item.picture}
                              />
                              <ButtonGroup size="sm">
                                <form encType="multipart/form-data">
                                  <input
                                    type={"file"}
                                    accept="image/*"
                                    name="file"
                                    size={"100px"}
                                    onChange={(e) => handleChoose(e)}
                                  ></input>
                                </form>
                                <Button
                                  colorScheme="blue"
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
              <Button size="sm" onClick={handleToggle} mt="1rem">
                Show {show ? "Less" : "More"}
              </Button>
            </TabPanel>
            <TabPanel>
              <Collapse startingHeight={100} in={show}>
                <TableContainer>
                  <Table variant="simple" colorScheme="teal">
                    <Thead>
                      <Tr>
                        <Th>Category</Th>
                        <Th>Actions</Th>
                        <Th>Picture</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data2?.map((item) => {
                        return (
                          <Tr>
                            <Td color={"#285430"}>{item.categoryName}</Td>
                            <Td>
                              <Button onClick={() => onDeleteCategory(item.id)}>
                                <DeleteIcon color={"#285430"} />
                              </Button>
                              <Button onClick={() => setEdit2(item)}>
                                <EditIcon color={"#285430"} />
                              </Button>
                            </Td>
                            <Td>
                              <Image
                                boxSize={"50px"}
                                src={
                                  "http://localhost:8000/" +
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
                                  colorScheme="blue"
                                  onClick={handleUpload1}
                                  size="sm"
                                >
                                  Upload
                                </Button>
                              </ButtonGroup>
                            </Td>
                            {/* <Popover
                                returnFocusOnClose={false}
                                isOpen={isOpen}
                                onClose={onClose}
                                placement="right"
                                closeOnBlur={false}
                              >
                                <PopoverContent>
                                  <PopoverHeader fontWeight="semibold">
                                    Edit Category
                                  </PopoverHeader>
                                  <PopoverArrow />
                                  <PopoverCloseButton />
                                  <PopoverBody></PopoverBody>
                                </PopoverContent>
                              </Popover> */}
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Collapse>
              <Button size="sm" onClick={handleToggle} mt="1rem">
                Show {show ? "Less" : "More"}
              </Button>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Edit Product</Tab>
            <Tab>Edit Category</Tab>
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
      </Box>
    </div>
  );
};
