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
import { useState } from "react";
import { useParams } from "react-router-dom";

export const DefaultAddress = () => {
  const [data, setData] = useState([]);
  const { id } = useSelector((state) => state.userSlice.value);
  const dispatch = useDispatch();
  const params = useParams();

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/findDefault/${id}`
      );
      console.log(result.data);
      setData(result.data.defaultAdd);
      // dispatch(syncData(result.data));
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
          console.log(item);
          <Button
            _placeholder={{ color: "#5F8D4E" }}
            // bgColor="#E5D9B6"
            w={"105%"}
            textColor="black"
            borderColor={"#285430"}
          >
            <StarIcon />
            <Text color={"#285430"}>
              {data?.district},{data?.city},{data?.province}
            </Text>
          </Button>
        </Stack>
      </Flex>
    </div>
  );
};
