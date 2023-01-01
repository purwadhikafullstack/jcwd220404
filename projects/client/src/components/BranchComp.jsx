import React, { useState } from "react";
import { logoutAdmin } from "../redux/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

export const BranchComp = () => {
  const [edit, setEdit] = useState({});
  const { username } = useSelector((state) => state.adminSlice.value);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem("tokenBranch");
    navigate("/loginAdmin");
  };
  return (
    <div>
      <Box>
        <Box display={"flex"} justifyContent="space-between">
          <Text>Branch Page</Text>
          <Text>{username}</Text>
        </Box>
        <Button onClick={onLogout}>Logout</Button>
      </Box>
    </div>
  );
};
