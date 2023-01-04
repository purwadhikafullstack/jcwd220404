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
  MenuButton,
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
} from "@chakra-ui/react";
import Axios from "axios"
import Swal from "sweetalert2";
import { ChevronDownIcon } from "@chakra-ui/icons";
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
          mt={"100px"}
          className="body"
          bgColor="black"
          h={"844px"}
          w={"390px"}
          pos="fixed"
        >
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
          <Text>Product Management</Text>
          <Menu>
            <MenuButton as={"button"} rightIcon={<ChevronDownIcon />}>
              <Avatar name={username}></Avatar>
            </MenuButton>
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
              </Stack>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Add Cetegory
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
              <ListProductComp />
            </TabPanel>
            <TabPanel>
              <ListCategoryComp/>
            </TabPanel>
          </TabPanels>
        </Tabs>
          </Menu>
        </Box>
      </Box>
    </div>
  );
};
