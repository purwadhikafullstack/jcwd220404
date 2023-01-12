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
import { useEffect, useState } from "react";
import Axios from "axios";

export const CartComp = () => {
  const [product, setProduct] = useState();

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/list`
      );
      console.log(res.data);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      Cart
      <Box>
        {product?.map((item) => {
          return (
            <Card>
              <CardHeader>
                <Text size="sm">{item.productName}</Text>
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
    </>
  );
};
