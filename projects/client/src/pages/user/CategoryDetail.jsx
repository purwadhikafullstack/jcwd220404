import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

export const CategoryDetail = () => {
  const [data, setData] = useState([]);
  const params = useParams();

  const getCategory = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/listCategory/${params.id}`
      );
      console.log(result.data);
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      <Box>
        {data?.map((item) => {
          return (
            <Card w={"200px"}>
              <CardHeader>
                <Text size="sm">
                  {item.Product_Categories?.Product?.productName}
                </Text>
              </CardHeader>
              <CardBody>
                <Text fontSize={"xs"}>Price</Text>
                <Image
                  boxSize={"50px"}
                  src={`${process.env.REACT_APP_API_BASE_URL}/` + item.picture}
                />
              </CardBody>
              <CardFooter>
                <Button>Tambah</Button>
              </CardFooter>
            </Card>
          );
        })}
      </Box>
    </div>
  );
};
