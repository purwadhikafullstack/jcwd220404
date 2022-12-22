import React from "react";
import { Box, Center, Text, Flex, Avatar } from "@chakra-ui/react";

export const Menu = () => {
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
    </div>
  );
};