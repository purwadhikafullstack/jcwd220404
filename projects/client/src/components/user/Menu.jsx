import { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsFilterLeft } from "react-icons/bs";
import { BiReset, BiSearchAlt } from "react-icons/bi";
import {
  Box,
  Center,
  Text,
  Flex,
  Avatar,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
  Input,
  FormHelperText,
  InputRightElement,
  Icon,
  useColorModeValue,
  Select,
  FormLabel,
  FormControl,
  InputGroup,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { cartSync } from "../../redux/cartSlice";
import { addCart } from "../../redux/userSlice";
import { useFormik } from "formik";
import { syncData } from "../../redux/productSlice";
import { syncInventory } from "../../redux/inventorySlice";
import * as Yup from "yup";
import { InventoryList } from "./InventoryList";
import { ProductList } from "./ProductList";

export const MenuComp = () => {
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();
  const [address, setAddress] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("ASC");
  const [order, setOrder] = useState("productName");
  const [searchProduct, setSearchProduct] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [state2, setState2] = useState(0);
  const [state, setState] = useState("");
  const [state3, setState3] = useState();
  const data = useSelector((state) => state.inventorySlice.value);
  const { id, cart } = useSelector((state) => state.userSlice.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const tokenLocalStorage = localStorage.getItem("tokenUser");
  const origin = state3;

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
          mt="-200"
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
