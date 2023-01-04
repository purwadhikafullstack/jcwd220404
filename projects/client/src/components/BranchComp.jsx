import React, { useRef, useState } from "react";
import { logoutAdmin } from "../redux/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Text,
  useDisclosure,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  ButtonGroup,
  useColorMode,
  Menu,
  Avatar,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Center,
  GridItem,
  Grid,
  Badge,
} from "@chakra-ui/react";
import Axios from "axios";
import Swal from "sweetalert2";
import { ListProductComp } from "./ListProductComp";
import { ListCategoryComp } from "./ListCategoryComp";

export const BranchComp = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit, setEdit] = useState({});
  const { username } = useSelector((state) => state.adminSlice.value);
  const { colorMode, toggleColorMode } = useColorMode();
  const inputProductName = useRef("");
  const inputDescription = useRef("");
  const inputDistributor = useRef("");
  const inputCategoryName = useRef("");

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
        width: "370",
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
        width: "370",
      });

      setTimeout(() => window.location.replace("/adminPage"), 2000);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const onLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem("tokenSuper");
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
        <Box
          mt={"70px"}
          className="body"
          bgColor="white"
          h={"844px"}
          w={"390px"}
          pos="fixed"
        >
          <Center>
            <Text mt="5" as="b" color="#285430">
              Product Management
            </Text>
          </Center>
          <Menu>
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
                    <Box
                      ml="3"
                      as="span"
                      flex="1"
                      textAlign="left"
                      color="#285430"
                    >
                      Add Product
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Stack spacing={"10px"}>
                    <FormControl>
                      <FormLabel ml="3" color="#285430">
                        Nama Produk
                      </FormLabel>
                      <Input
                        ref={inputProductName}
                        placeholder="Produk"
                        ml="3"
                        _placeholder={{ color: "#5F8D4E" }}
                        bgColor={"white"}
                        textColor="#285430"
                        borderColor={"#285430"}
                        border={"2px"}
                        w={"330px"}
                      ></Input>
                    </FormControl>
                    <FormControl>
                      <FormLabel ml="3" color="#285430">
                        Distributor
                      </FormLabel>
                      <Input
                        ref={inputDistributor}
                        placeholder="Distributor"
                        ml="3"
                        _placeholder={{ color: "#5F8D4E" }}
                        bgColor={"white"}
                        textColor="#285430"
                        borderColor={"#285430"}
                        border={"2px"}
                        w={"330px"}
                      ></Input>
                    </FormControl>
                    <FormControl>
                      <FormLabel ml="3" color="#285430">
                        Category 1
                      </FormLabel>
                      <Select
                        ml="3"
                        _placeholder={{ color: "#5F8D4E" }}
                        bgColor={"white"}
                        textColor="#285430"
                        borderColor={"#285430"}
                        border={"2px"}
                        w={"330px"}
                      >
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
                      <FormLabel ml="3" color="#285430">
                        Category 2
                      </FormLabel>
                      <Select
                        ml="3"
                        _placeholder={{ color: "#5F8D4E" }}
                        bgColor={"white"}
                        textColor="#285430"
                        borderColor={"#285430"}
                        border={"2px"}
                        w={"330px"}
                      >
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
                      <FormLabel ml="3" color="#285430">
                        Description
                      </FormLabel>
                      <Textarea
                        ref={inputDescription}
                        ml="3"
                        _placeholder={{ color: "#5F8D4E" }}
                        bgColor={"white"}
                        textColor="#285430"
                        borderColor={"#285430"}
                        border={"2px"}
                        w={"330px"}
                      />
                    </FormControl>
                    <Center>
                      <Button
                        ml="3"
                        type="submit"
                        bgColor={"#A4BE7B"}
                        borderColor="#285430"
                        border="2px"
                        fontSize="18px"
                        color="gray.800"
                        width={"40%"}
                        justifyContent="center"
                        onClick={onCreate}
                      >
                        Add Product
                      </Button>
                    </Center>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      ml="3"
                      color="#285430"
                    >
                      Add Cetegory
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Stack spacing={"10px"}>
                    <FormControl>
                      <FormLabel ml="3" color="#285430">
                        Nama Category
                      </FormLabel>
                      <Input
                        ref={inputCategoryName}
                        placeholder="Kategori"
                        ml="3"
                        _placeholder={{ color: "#5F8D4E" }}
                        bgColor={"white"}
                        textColor="#285430"
                        borderColor={"#285430"}
                        border={"2px"}
                        w={"330px"}
                      ></Input>
                    </FormControl>
                    <Center>
                      <Button
                        ml="3"
                        type="submit"
                        bgColor={"#A4BE7B"}
                        borderColor="#285430"
                        border="2px"
                        fontSize="18px"
                        color="gray.800"
                        width={"40%"}
                        justifyContent="center"
                        onClick={onCreateCategory}
                      >
                        Add Category
                      </Button>
                    </Center>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab as="b" color="#285430">
                  Product List
                </Tab>
                <Tab as="b" color="#285430">
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
          </Menu>
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
        </Box>
      </Box>
    </div>
  );
};
