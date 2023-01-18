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
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Calculator } from "../Calculator";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import Swal from "sweetalert2";
import { cartSync } from "../../redux/cartSlice";
import { delCart } from "../../redux/userSlice";
import { PopoutCheckout } from "../PopoutCheckout";

export const CartComp = () => {
  const [product, setProduct] = useState([]);
  const [data, setData] = useState([]);
  const { id } = useSelector((state) => state.userSlice.value);
  const params = useParams();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/cart/findBy/${id}`
      );
      console.log(res.data.carts);
      setData(res.data.carts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const getProduct = async () => {
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
    getProduct();
  }, []);

  const onDelete = async (id) => {
    try {
      await Axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/cart/remove/${id}`
      );
      Swal.fire({
        icon: "success",
        text: "Cart Berhasil Dihapus",
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
      });
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/cart/findBy/${id}`
      );
      dispatch(cartSync(result.data));
      dispatch(delCart());
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box>
        <Flex justify={"space-between"}>
          <Checkbox>Select All</Checkbox>
          <Text as={"button"} variant="ghost">
            Hapus
          </Text>
        </Flex>
        {data?.map((item) => {
          return (
            <Card margin={"10px"}>
              <Flex mb={"50px"} justify={"space-between"}>
                <Checkbox>
                  <Grid
                    templateAreas={`"nav main""nav footer"`}
                    gridTemplateRows={"50px 1fr 30px"}
                    gridTemplateColumns={"120px 1fr"}
                    h="50px"
                    gap="1"
                    color="blackAlpha.700"
                    fontWeight="bold"
                  >
                    <GridItem pl="1" area={"nav"}>
                      <Image
                        boxSize={"50px"}
                        src={
                          `${process.env.REACT_APP_API_BASE_URL}/` +
                          item.Product?.picture
                        }
                      ></Image>
                    </GridItem>
                    <GridItem fontSize={"small"} pl="1" area={"main"}>
                      {item.Product?.productName}
                      <GridItem>{item.Product?.weight} g</GridItem>
                    </GridItem>
                    <GridItem fontSize={"small"} pl="1" area={"footer"}>
                      Rp{item.Product?.Price?.productPrice}
                    </GridItem>
                  </Grid>
                </Checkbox>
                <Box>
                  <Button onClick={() => onDelete(item.id)}>
                    <DeleteIcon />
                  </Button>
                  <Calculator />
                </Box>
              </Flex>
            </Card>
          );
        })}
      </Box>
      <PopoutCheckout />
      {/* <Heading alignItems={"center"} size={"md"}>
        Recommendation Product
      </Heading>
      <Box>
        {product?.map((item) => {
          return (
            <Card>
              <CardBody>
                <Image
                  boxSize={"50px"}
                  src={`${process.env.REACT_APP_API_BASE_URL}/` + item.picture}
                />
                <Text size="sm">{item.productName}</Text>
                <Text fontSize={"xs"}>{item.Price?.productPrice}</Text>
              </CardBody>
              <CardFooter>
                <Button>Tambah</Button>
              </CardFooter>
            </Card>
          );
        })}
      </Box> */}
    </>
  );
};
