import { EditIcon, HamburgerIcon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { syncData } from "../redux/addressSlice";
import { useEffect } from "react";

export const DefaultAddress = () => {
  const { data } = useSelector((state) => state.addressSlice.value);
  const { id } = useSelector((state) => state.userSlice.value);
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

  return (
    <div>
      <Flex pr={"20px"} mt="100px">
        <Stack>
          {data?.map((item) => {
            return (
              <Button
                _placeholder={{ color: "#5F8D4E" }}
                bgColor="#E5D9B6"
                w={"105%"}
                textColor="black"
                borderColor={"#285430"}
              >
                <StarIcon />
                <Flex>
                  <Text color={"#285430"}>{item.district},</Text>
                  <Text color={"#285430"}>{item.city},</Text>
                  <Text color={"#285430"}>{item.province}</Text>
                </Flex>
              </Button>
            );
          })}
        </Stack>
      </Flex>
    </div>
  );
};
