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
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../../redux/productSlice";
import { syncCategory } from "../../redux/categorySlice";

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
        {data?.Product_Categories?.map((item) => {
          return (
            <>
              <Card w={"200px"}>
                <CardBody>
                  <Text>{item.Product.productName}</Text>
                  <Text size="sm">{item?.Product?.Price?.productPrice}</Text>

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
