import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Stack,
} from "@chakra-ui/react";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const TransactionComp = () => {
  const [data, setData] = useState();
  const { id } = useSelector((state) => state.userSlice.value);
  console.log(data);

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/findById/${id}`
      );
      setData(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div>
      <Stack border={"10px"} spacing={"10px"}>
        <Card margin={"10px"}>
          {data?.map((item) => {
            return (
              <Flex mb={"50px"} justify={"space-between"}>
                <Grid
                  templateAreas={`"nav main""nav footer"`}
                  gridTemplateRows={"50px 1fr 30px"}
                  gridTemplateColumns={"120px 1fr"}
                  h="50px"
                  gap="1"
                  color="blackAlpha.700"
                  fontWeight="bold"
                >
                  <GridItem fontSize={"small"} pl="1" area={"main"}>
                    Order No. {item.id_order}
                  </GridItem>
                  <GridItem fontSize={"small"} pl="1" area={"footer"}>
                    Rp{item.totalOrder}
                  </GridItem>
                </Grid>
              </Flex>
            );
          })}
        </Card>
      </Stack>
    </div>
  );
};
