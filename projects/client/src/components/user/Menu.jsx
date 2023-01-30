import { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Center, Text, Flex, Avatar } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { InventoryList } from "./InventoryList";
import { ProductList } from "./ProductList";

export const MenuComp = () => {
  const [category, setCategory] = useState();
  const [state3, setState3] = useState();
  const data = useSelector((state) => state.inventorySlice.value);
  const { id, cart } = useSelector((state) => state.userSlice.value);
  const tokenLocalStorage = localStorage.getItem("tokenUser");

  const getCategory = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/listCategory`
      );
      setCategory(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getData2 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/findDefault/${id}`
      );
      console.log(result.data.defaultAdd);
      setState3(result.data.defaultAdd);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData2();
  }, [id]);

  return (
    <>
      <Center>
        <Flex
          flexWrap="wrap"
          mt="-140"
          w={[330, 330, 380]}
          justifyContent="center"
        >
          {/* <Input
            placeholder="Only Fresh Here..."
            _placeholder={{ color: "#5F8D4E" }}
            bgColor={"white"}
            w={"400px"}
            textColor="black"
            borderColor={"#285430"}
          /> */}

          {category?.map((item) => {
            return (
              <div>
                <Avatar
                  border="1px"
                  bgColor="#A4BE7B"
                  _hover={{ border: "2px" }}
                  mr={[2, 3, 4]}
                  ml={[2, 3, 4]}
                  mt="20px"
                  size="md"
                  name="Grocery"
                  src={
                    `${process.env.REACT_APP_API_BASE_URL}/` +
                    item.categoryPicture
                  }
                  as={Link}
                  to={`/category/${item.id}`}
                ></Avatar>
                <Text fontSize="x-small" color={"#285430"}>
                  {item.categoryName}
                </Text>
              </div>
            );
          })}
        </Flex>
      </Center>
      {tokenLocalStorage ? <InventoryList /> : <ProductList />}
    </>
  );
};