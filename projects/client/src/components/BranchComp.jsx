import React, { useEffect, useRef, useState } from "react";
import { logoutAdmin } from "../redux/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  Select,
  Stack,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
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
import { ListProductComp } from "./ListProductComp";
import { ListCategoryComp } from "./ListCategoryComp";
import {
  ArrowUpIcon,
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { UpdateComp } from "./UpdateComp";

export const BranchComp = () => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState({});
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState("upload");
  const { username } = useSelector((state) => state.adminSlice.value);
  // const { id } = useSelector((state) => state.productSlice.value);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const dispatch = useDispatch();
  const inputProductName = useRef("");
  const inputDescription = useRef("");
  const inputDistributor = useRef("");
  const inputCategoryName = useRef("");
  const navigate = useNavigate();

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
  };
  console.log(image);
  console.log(profile);

  return (
    <div>
      <Box
        mt={"100px"}
        className="body"
        bgColor="white"
        h={"1750px"}
        w={"390px"}
      >
        <Box
          borderRadius={"5px"}
          bgColor={"teal"}
          mb={"50px"}
          display={"flex"}
          justifyContent="space-between"
        >
          <Text>Product Management</Text>
          <Menu>
            <MenuButton as={"button"} rightIcon={<ChevronDownIcon />}>
              <Avatar name={username}></Avatar>
            </MenuButton>
            <MenuList>
              <MenuItem as={"button"} onClick={onLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

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
                    <option
                      // selected={data.Profile?.gender === ""}
                      value=""
                    >
                      Pilih Kategori
                    </option>
                    <option>Sayuran</option>
                    <option>Buah-buahan</option>
                    <option>Daging</option>
                    <option>Susu dan Olahan</option>
                    <option>Perawatan Tubuh</option>
                  </Select>
                  <FormLabel>Category 2</FormLabel>
                  <Select>
                    <option
                      // selected={data.Profile?.gender === ""}
                      value=""
                    >
                      Pilih Kategori
                    </option>
                    <option>Sayuran</option>
                    <option>Buah-buahan</option>
                    <option>Daging</option>
                    <option>Susu dan Olahan</option>
                    <option>Perawatan Tubuh</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea ref={inputDescription}></Textarea>
                </FormControl>
                <Button onClick={onCreate}>Add Product</Button>
                <Tag mt={"20px"} as={"button"} ml={"10px"} onClick={onToggle}>
                  <ArrowUpIcon mr={"5px"} /> Add Picture
                </Tag>
                <Popover
                  returnFocusOnClose={false}
                  isOpen={isOpen}
                  onClose={onClose}
                  placement="auto-end"
                  closeOnBlur={false}
                >
                  <PopoverContent w={"400px"}>
                    <PopoverBody>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <ButtonGroup size="sm">
                        <form encType="multipart/form-data">
                          <input
                            type={"file"}
                            accept="image/*"
                            name="file"
                            onChange={(e) => handleChoose(e)}
                          ></input>
                        </form>
                        <Button colorScheme="blue" onClick={handleUpload}>
                          Upload
                        </Button>
                      </ButtonGroup>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
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

        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Product List</Tab>
            <Tab>Category List</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TableContainer>
                <Table variant="simple" colorScheme="teal">
                  <Thead>
                    <Tr>
                      <Th>Product</Th>
                      <Th>Distributor</Th>
                      <Th>Description</Th>
                      <Th>Picture</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.map((item) => {
                      return (
                        <Tr>
                          <Td>{item.productName}</Td>
                          <Td>{item.distributor}</Td>
                          <Td>{item.description}</Td>
                          <Td>
                            <Image
                              src={"http://localhost:8000/" + item.picture}
                            />
                          </Td>
                          <Td>
                            <Box display={"flex"} justifyContent="space-evenly">
                              <DeleteIcon />
                              <Button
                                // href={<UpdateComp />}
                                onClick={() => setEdit(item)}
                              >
                                <EditIcon />
                              </Button>
                            </Box>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <ListCategoryComp />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <UpdateComp data={edit} />
      </Box>
    </div>
  );
};
