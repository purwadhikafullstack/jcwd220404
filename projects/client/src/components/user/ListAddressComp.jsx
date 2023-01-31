import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { syncData } from "../../redux/addressSlice";
import Axios from "axios";
import {
  Badge,
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import {
  CheckIcon,
  DeleteIcon,
  EditIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";

export const ListAddressComp = () => {
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

  const onDefault = async (idAddress) => {
    try {
      const result = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/address/setDefault/${idAddress}/${id}`
      );
      console.log(result)
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const toUpdate = (addressId) => {
    navigate(`/account/address/update/${addressId}`);
  };

  return (
    <div>
      {data?.map((item) => {
        return (
          <Box
            ml="8px"
            mr="8px"
            mt="8px"
            p="4"
            border={"1px"}
            borderColor={"#285430"}
            borderRadius="md"
          >
            <Flex justifyContent={"space-between"}>
              <Text color={"#285430"}>{item.receiverName}</Text>
              <Text color={"#285430"}>{item.receiverPhone}</Text>
              <Menu theme={{ direction: "rtl" }}>
                <MenuButton
                  color={"#285430"}
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  variant="ghost"
                />
                <MenuList bgColor="#E5D9B6">
                  <MenuItem
                    as={"button"}
                    onClick={() => toUpdate(item.id)}
                    icon={<EditIcon />}
                    bgColor="#E5D9B6"
                    textColor={"#285430"}
                    placement="bottom"
                    direction="ltr"
                  >
                    Edit Address
                  </MenuItem>
                  <MenuItem
                    as={"button"}
                    onClick={() => onDelete(item.id)}
                    icon={<DeleteIcon />}
                    bgColor="#E5D9B6"
                    textColor={"#285430"}
                  >
                    Delete Address
                  </MenuItem>
                  <MenuItem
                    as={"button"}
                    onClick={() => onDefault(item.id)}
                    icon={<CheckIcon />}
                    bgColor="#E5D9B6"
                    textColor={"#285430"}
                  >
                    Set As Default Address
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            <Text color={"#285430"}>{item.addressLine}</Text>
            <Flex>
              <Text color={"#285430"}>{item.district},</Text>
              <Text color={"#285430"}>{item.city},</Text>
              <Text color={"#285430"}>{item.province}</Text>
            </Flex>
            <Text color={"#285430"}>{item.detail}</Text>
            <Badge color={"#285430"} fontSize="14px">
              {item.defaultAddress === false ? "" : "Alamat Utama"}
            </Badge>
          </Box>
        );
      })}{" "}
    </div>
  );
};