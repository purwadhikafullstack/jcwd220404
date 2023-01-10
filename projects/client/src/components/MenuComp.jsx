import { useEffect } from "react";
import {
  Box,
  Center,
  Text,
  Flex,
  Avatar,
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Button,
  Image
} from "@chakra-ui/react";
import Axios from "axios";
import { useState } from "react";

export const Menu = () => {
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();

  const cards = [
    [
      "https://s3-ap-southeast-1.amazonaws.com/assets.segari.id/categories/v3/semua_produk.png",
      "Semua Produk",
    ],
    [
      "https://s3.ap-southeast-1.amazonaws.com/assets.segari.id/categories/v3/produk-baru.png",
      "Produk Terbaru",
    ],
    [
      "https://s3.ap-southeast-1.amazonaws.com/assets.segari.id/categories/v3/serba-promo.png",
      "Serba Promo",
    ],
    [
      "https://s3-ap-southeast-1.amazonaws.com/assets.segari.id/categories/v3/sayuran-semua_not-selected.png",
      "Serba Sayuran",
    ],
    [
      "https://s3-ap-southeast-1.amazonaws.com/assets.segari.id/categories/v3/buah-semua_not-selected.png",
      "Serba Buah",
    ],
    [
      "https://s3-ap-southeast-1.amazonaws.com/assets.segari.id/categories/v3/daging-semua_not-selected.png",
      "Serba Daging",
    ],
    [
      "https://s3.ap-southeast-1.amazonaws.com/assets.segari.id/categories/unggas-semua.png",
      "Serba Unggas",
    ],
    [
      "https://s3-ap-southeast-1.amazonaws.com/assets.segari.id/categories/v3/seafood-semua_not-selected.png",
      "Serba Seafood",
    ],
    [
      "https://s3.ap-southeast-1.amazonaws.com/assets.segari.id/categories/v4/Icons_Pack-FMCG_Protein.png",
      "Serba Protein",
    ],
    [
      "https://s3.ap-southeast-1.amazonaws.com/assets.segari.id/categories/v3/icon_lainnya.png",
      "Lainnya",
    ],
  ];

  const getCategory = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/listCategory`
      );
      console.log(res.data);
      setCategory(res.data);
      // dispatch(syncData(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getProduct = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/list`
      );
      console.log(res.data);
      setProduct(res.data);
      // dispatch(syncData(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <Center>
        <Flex
          flexWrap="wrap"
          mt="-12"
          w={[330, 330, 380]}
          justifyContent="center"
        >
          {cards.map((item, index) => {
            return (
              <div>
                <Box key={index} align="center" _hover={{ cursor: "pointer" }}>
                  <Avatar
                    border="1px"
                    bgColor="#A4BE7B"
                    _hover={{ border: "2px" }}
                    mr={[2, 3, 4]}
                    ml={[2, 3, 4]}
                    mt="3"
                    size="md"
                    name="Grocery"
                    src={item[0]}
                  />
                  <Text fontSize="x-small" color={"#285430"}>
                    {item[1]}
                  </Text>
                </Box>
              </div>
            );
          })}
        </Flex>
      </Center>
      <Box mt={"50px"}>
        {category?.map((item) => {
          return (
            <div>
              <Text>{item.categoryName}</Text>
            </div>
          );
        })}
      </Box>
      <Box>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(100px, 1fr))"
        >
          {product?.map((item) => {
            return (
              <Card>
                <CardHeader>
                  <Heading size="sm">{item.productName}</Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize={"xs"}>Price</Text>
                  <Image src={"http://localhost:8000/" + item.picture} />
                </CardBody>
                <CardFooter>
                  <Button>Tambah</Button>
                </CardFooter>
              </Card>
            );
          })}
        </SimpleGrid>
      </Box>
    </div>
  );
};