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
import { syncData } from "../redux/addressSlice";

export const ListAddressPage = () => {
  // const [data, setData] = useState([]);
  const { data } = useSelector((state) => state.addressSlice.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toAddAddress = () => {
    navigate("/account/address/addAddress");
  };

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/addressById`
      );
      console.log(result.data);
      // setData(result.data);
      dispatch(syncData(result.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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

  const toUpdate = (id) => {
    navigate(`/account/address/updateAddress/${id}`);
  };

  return (
    <div>
      <Center>
        <Box>
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
              <ArrowBackIcon
                mt={"20px"}
                ml={"20px"}
                pos={"fixed"}
                color="#285430"
                fontSize={"25px"}
              />
            </Box>
            <Box margin={"auto"} alignItems={"center"} textColor="#285430">
              <Text as={"b"} fontSize="xl">
                MY ADDRESS
              </Text>
            </Box>
          </Box>
          <Box
            mt={"80px"}
            pt={"3px"}
            className="body"
            bgColor="white"
            h={"740px"}
            w={"390px"}
          >
            {data?.map((item) => {
              return (
                <Box
                  ml="8px"
                  mr="8px"
                  mt="8px"
                  pl="8px"
                  pr="8px"
                  border={"2px"}
                  borderColor={"#285430"}
                  borderRadius="xl"
                >
                  <Flex justifyContent={"space-between"}>
                    <Text color={"#285430"}>{item.receiverName}</Text>
                    <Text color={"#285430"}>{item.receiverPhone}</Text>
                    <Menu>
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
                  <Text color={"#285430"}>Alamat Utama?</Text>
                </Box>
              );
            })}{" "}
            <Center>
              <Button
                mt="8"
                onClick={toAddAddress}
                bgColor={"#A4BE7B"}
                borderColor="#285430"
                border="2px"
                fontSize="18px"
                color="gray.800"
                width={"160px"}
                justifyContent="center"
              >
                Tambah Alamat
              </Button>
            </Center>
          </Box>
        </Box>
      </Center>
    </div>
  );
};
