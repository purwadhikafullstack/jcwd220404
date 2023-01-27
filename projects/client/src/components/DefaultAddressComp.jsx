import {
  Button,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { syncData } from "../redux/addressSlice";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const DefaultAddressComp = () => {
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div>
      <Flex 
      mt="80px"
      >
        <Stack>
          <Button
            _placeholder={{ color: "#5F8D4E" }}
            w={"390px"}
            backgroundColor="white"
            textColor="#285430"
            border="2px"
            borderColor={"#285430"}
            borderRadius="xl"
          >
            <Text color={"#285430"}>
            Sent to:: {data?.city}, {data?.province}
            </Text>
          </Button>
        </Stack>
      </Flex>
    </div>
  );
};