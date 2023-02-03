import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Axios from "axios";

import { useEffect } from "react";
import { useState } from "react";

export const DefaultAddress = () => {
  const [data, setData] = useState([]);
  const { id } = useSelector((state) => state.userSlice.value);

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
      <Flex pr={"20px"} mt="100px">
        <Stack>
          <Button
            _placeholder={{ color: "#5F8D4E" }}
            // bgColor="#E5D9B6"
            w={"390px"}
            textColor="black"
            borderColor={"#285430"}
          >
            {data === null   }
          
            
          
           <Text color={"#285430"}>
              Deliver to: {data?.city}, {data?.province}
            </Text>
          </Button>
        </Stack>
      </Flex>
    </div>
  );
};
