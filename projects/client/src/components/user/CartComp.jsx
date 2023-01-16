import { useEffect, useState } from "react";
import Axios from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { Calculator } from "../Calculator";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const CartComp = () => {
  const [product, setProduct] = useState();
  const { id } = useSelector((state) => state.userSlice.value);
  const params = useParams();

  const getData = async () => {
    try {
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/cart/findAll/${params.id}`
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
      <Box>
        <Flex justify={"space-between"}>
          <Checkbox>Select All</Checkbox>
          <Text as={"button"} variant="ghost">
            Hapus
          </Text>
        </Flex>

        {product?.map((item) => {
          return (
            <Card margin={"10px"}>
              <Flex mb={"50px"} justify={"space-between"}>
                <Checkbox></Checkbox>
                <Grid
                  templateAreas={`
                  "nav main"
                  "nav footer"`}
                  gridTemplateRows={"50px 1fr 30px"}
                  gridTemplateColumns={"120px 1fr"}
                  h="50px"
                  gap="1"
                  color="blackAlpha.700"
                  fontWeight="bold"
                >
                  <>
                    <GridItem pl="1" area={"nav"}>
                      <Image
                        boxSize={"50px"}
                        src={
                          `${process.env.REACT_APP_API_BASE_URL}/` +
                          item.picture
                        }
                      ></Image>
                    </GridItem>
                    <GridItem fontSize={"small"} pl="1" area={"main"}>
                      {item.ProductId}
                    </GridItem>
                    <GridItem fontSize={"small"} pl="1" area={"footer"}>
                      price
                    </GridItem>
                  </>
                </Grid>
                <Calculator />
              </Flex>
            </Card>
          );
        })}
      </Box>
      <Box>
        {/* {product?.map((item) => {
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
        })} */}
      </Box>
    </>
  );
};
