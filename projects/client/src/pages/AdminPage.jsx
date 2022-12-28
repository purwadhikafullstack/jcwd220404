import { useEffect, useRef } from "react";
import React from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../redux/admin/listSlice";
import {
  Image,
  Button,
  Box,
  Flex,
  Center,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Stack,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuDivider,
  MenuItem,
  useColorModeValue,
  useColorMode,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";

import StatsComp from "../components/StatsComp";
import { syncName } from "../redux/nameSlice";
import { logoutAdmin } from "../redux/admin/adminSlice";
import { EditIcon, MoonIcon, SunIcon, AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/AllBookComp";
import CreateComp from "../components/CreateComp";
import { DeleteIcon } from "@chakra-ui/icons";
import UpdateComp from "../components/UpdateComp";
import { useState } from "react";
import { loanSync } from "../redux/admin/loanAdminSlice";

export const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState({});

  const data = useSelector((state) => state.listSlice.value);
  const data1 = useSelector((state) => state.nameSlice.value);
  const data2 = useSelector((state) => state.loanAdminSlice.value);
  const { username } = useSelector((state) => state.adminSlice.value);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  //   const onLogout = () => {
  //     dispatch(logoutAdmin());
  //     localStorage.removeItem("tokenAdmin");
  //     navigate("/admin");
  //   };

  const getData = async () => {
    try {
      const res = await Axios.get(`http://localhost:2000/book/list`);
      console.log(res.data);
      dispatch(syncData(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onDelete = async (id) => {
    try {
      const res = await Axios.delete(`http://localhost:2000/book/remove/${id}`);
      console.log(res);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>Admin</Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{username}</p>
                  </Center>
                  <br />
                  <MenuDivider />

                  <MenuItem
                  //    onClick={onLogout}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <StatsComp />
      <Center>{/* <AddIcon /> */}</Center>

      <Stack mt="20px" mb="20px" ml="20px" mr="20px">
        <Box m="20px">
          <Heading align="center">Books</Heading>
          <TableContainer>
            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Author</Th>
                  <Th>Genre</Th>
                  <Th>Publisher</Th>
                  {/* <Th>Stock</Th> */}
                  <Th>Images</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              {/* {data.map((item) => {
                return ( */}
              <Tbody>
                <Tr>
                  <Td>
                    {/* {item.Title} */}
                    title
                  </Td>
                  <Td>
                    {/* {item.Author} */}
                    author
                  </Td>
                  <Td>
                    {/* {item.Genre} */}
                    genre
                  </Td>
                  <Td>
                    {/* {item.Publisher} */}
                    publisher
                  </Td>

                  <Td>
                    <Image
                      w="20px"
                      h="20px"
                      // src={item.Images}
                    ></Image>
                  </Td>
                  <Td>
                    <Flex>
                      <Button
                        colorScheme="teal"
                        // onClick={() => onDelete(item.id)}
                      >
                        <DeleteIcon />
                      </Button>
                      <Button
                        colorScheme="teal"
                        display="flex"
                        // onClick={() => setEdit(item)}
                      >
                        <EditIcon onClick={"#href"} />
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              </Tbody>
              {/* );
              })} */}
            </Table>
          </TableContainer>

          <Heading align={"center"}>Users</Heading>

          <CreateComp />
          {/* <UpdateComp data={edit} /> */}

          <BookCard />
        </Box>
      </Stack>
    </div>
  );
};
