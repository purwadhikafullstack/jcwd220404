import Axios from "axios";
import { useEffect, useState } from "react";
import { Avatar, Box, Center, Flex, Text } from "@chakra-ui/react";
import { NavbarComp } from "../../components/user/NavbarComp";

export const CategoryPage = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/listCategory`
      );
      console.log(res.data);
      setData(res.data);
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
        <Center>
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
            <Center>
              <Flex
                flexWrap="wrap"
                mt="-5"
                w={[330, 330, 380]}
                justifyContent="center"
              >
                {data?.map((item) => {
                  return (
                    <div>
                      <Avatar
                        border="1px"
                        bgColor="#A4BE7B"
                        _hover={{ border: "2px" }}
                        mr={[2, 3, 4]}
                        ml={[2, 3, 4]}
                        mt="3"
                        size="md"
                        name="Grocery"
                        src={
                          `${process.env.REACT_APP_API_BASE_URL}/` +
                          item.categoryPicture
                        }
                      ></Avatar>
                      <Text>{item.categoryName}</Text>
                    </div>
                  );
                })}
              </Flex>
            </Center>
          </Box>
          <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}>
            <NavbarComp />
          </Box>
        </Center>
      </Box>
    </>
  );
};
