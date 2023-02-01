import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../../redux/productSlice";
import { syncCategory } from "../../redux/categorySlice";
import { ArrowBackIcon } from "@chakra-ui/icons";

export const CategoryDetail = (id) => {
  const data = useSelector((state) => state.categorySlice.value);
  // const [data, setData] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();

  const getCategory = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/listCategory/${params.id}`
      );
      console.log(result.data[0]);

      dispatch(syncCategory(result.data[0]));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, [id]);

  return (
    <div>
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
            zIndex={"2"}
          >
            <Box as={Link} to={"/"}>
              <ArrowBackIcon
                mt={"20px"}
                ml={"20px"}
                pos={"fixed"}
                color="#285430"
                fontSize={"25px"}
              />
            </Box>
            <Box margin={"auto"} alignItems={"center"} textColor="#285430">
              <Text m="100px" as={"b"} fontSize="xl">
                {data?.categoryName}
              </Text>
            </Box>
          </Box>
          <Box
            mt={"80px"}
            pt={"3px"}
            className="body"
            bgColor="white"
            h={"740px"}
            w={"390px"}
          >
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              spacing={{ base: 8, md: 2 }}
              py={{ base: 18, md: 2 }}
            >
              {data?.Product_Categories?.map((item) => {
                return (
                  <>
                    <Card w={"150px"}>
                      <CardBody>
                        <Image
                          boxSize={"50px"}
                          src={
                            `${process.env.REACT_APP_API_BASE_URL}/` +
                            item?.Product?.picture
                          }
                        />
                        <Text>{item.Product.productName}</Text>
                        <Text size="sm">
                          Rp{item?.Product?.Price?.productPrice}
                        </Text>
                      </CardBody>
                    </Card>
                  </>
                );
              })}
            </SimpleGrid>
          </Box>
        </Center>
      </Box>
    </div>
  );
};

                  <Image
                    boxSize={"50px"}
                    src={
                      `${process.env.REACT_APP_API_BASE_URL}/` +
                      item?.Product?.picture
                    }
                  />
                </CardBody>
              </Card>
            </>
          );
        })}
      </Box>
    </div>
  );
};