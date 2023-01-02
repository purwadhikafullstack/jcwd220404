import { Box, Center, Text } from "@chakra-ui/react";
import { NavbarComp } from "../components/NavbarComp";
import Axios from "axios";
import { useEffect, useState } from "react";

export const CategoryPage = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/listCategory`
      );
      console.log(res.data);
      setData(res.data);
      // dispatch(syncData(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Center>
        <Box>
          <Box
            className="header"
            w={"390px"}
            h={"80px"}
            bgColor="#E5D9B6"
            display={"flex"}
            justifyContent="space-between"
            pt={"10px"}
            pl={"1px"}
            pos="fixed"
            top={"0"}
            zIndex="2"
          >
            <Box margin={"auto"} alignItems={"center"} textColor="black">
              CATEGORIES
            </Box>
          </Box>
          <Box
            mt={"100px"}
            className="body"
            bgColor={"white"}
            h={"1750px"}
            w={"390px"}
          >
            <Box>
              {data?.map((item) => {
                return (
                  <Box>
                    <Text>{item.categoryName}</Text>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}>
            <NavbarComp />
          </Box>
        </Box>
      </Center>
    </div>
  );
};
