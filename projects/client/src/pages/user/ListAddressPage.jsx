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
import {
  ArrowBackIcon,
  DeleteIcon,
  EditIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../../redux/addressSlice";

export const ListAddressPage = () => {
  const { data } = useSelector((state) => state.addressSlice.value);
  const { id } = useSelector((state) => state.userSlice.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/addressById/${id}`
      );
      console.log(result.data);
      dispatch(syncData(result.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const onDelete = async (id) => {
    try {
      const res = await Axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/address/remove/${id}`
      );
      console.log(res);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const toAddAddress = () => {
    navigate(`/account/address/addAddress/${id}`);
  };

  const toUpdate = (addressId) => {
    navigate(`/account/address/updateAddress/${addressId}`);
  };

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
            {data?.map((item) => {
              return (
                <Box border={"2px"} borderColor={"black"}>
                  <Flex justifyContent={"space-between"}>
                    <Text>{item.receiverName}</Text>
                    <Text>{item.receiverPhone}</Text>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<HamburgerIcon />}
                        variant="ghost"
                      />
                      <MenuList>
                        <MenuItem
                          as={"button"}
                          onClick={() => toUpdate(item.id)}
                          icon={<EditIcon />}
                        >
                          Edit Address
                        </MenuItem>
                        <MenuItem
                          as={"button"}
                          onClick={() => onDelete(item.id)}
                          icon={<DeleteIcon />}
                        >
                          Delete Address
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                  <Text>{item.addressLine}</Text>
                  <Flex>
                    <Text>{item.district},</Text>
                    <Text>{item.city},</Text>
                    <Text>{item.province}</Text>
                  </Flex>
                  <Text>{item.detail}</Text>
                  <Text>Alamat Utama?</Text>
                </Box>
              );
            })}
            <Button onClick={toAddAddress} mt={"20px"} w={"100%"}>
              Tambah Alamat
            </Button>
          </Box>
        </Box>
      </Center>
    </div>
  );
};
