import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  ArrowBackIcon,
  DeleteIcon,
  EditIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";

export const ListAddressPage = () => {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const onAddress = () => {
    navigate("/account/address/addAddress");
  };

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/addressById/6`
      );
      setData(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Center>
        <Box w={"390px"} h={"844px"} bgColor="white">
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
            <Box as={Link} to={"/account"}>
              <ArrowBackIcon mt={"20px"} pos={"fixed"} />
            </Box>
            <Box margin={"auto"} alignItems={"center"} textColor="black">
              Account
            </Box>
          </Box>
          <Box
            mt={"100px"}
            className="body"
            bgColor="white"
            h={"1750px"}
            w={"390px"}
          >
            {/* {data.map((item) => {
              return ( */}
            <Box border={"2px"} borderColor={"black"}>
              <Flex justifyContent={"space-between"}>
                <Text>{data.receiverName}</Text>
                <Text>{data.receiverPhone}</Text>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="ghost"
                  />
                  <MenuList>
                    <MenuItem icon={<EditIcon />}>Edit Address</MenuItem>
                    <MenuItem icon={<DeleteIcon />}>Delete Address</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
              <Text>{data.addressLine}</Text>
              <Flex>
                <Text>{data.district}</Text>
                <Text>{data.city}</Text>
                <Text>{data.province}</Text>
              </Flex>
              <Text>{data.detail}</Text>
              <Text>Alamat Utama?</Text>
            </Box>
            {/* );
            })} */}
            <Button onClick={onAddress} mt={"20px"} w={"100%"}>
              Tambah Alamat
            </Button>
          </Box>
        </Box>
      </Center>
    </div>
  );
};
