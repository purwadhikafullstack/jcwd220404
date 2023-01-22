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
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  Select,
  Text,
  Textarea,
  useNumberInput,
} from "@chakra-ui/react";
import { Calculator } from "../Calculator";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import Swal from "sweetalert2";
import { cartSync } from "../../redux/cartSlice";
import { delCart } from "../../redux/userSlice";
import { PopoutCheckout } from "../PopoutCheckout";

export const CartComp = () => {
  const [product, setProduct] = useState([]);
  // const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const data = useSelector((state) => state.cartSlice.value);
  const { id } = useSelector((state) => state.userSlice.value);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      // defaultValue: 1,
      min: 0,
      precision: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/cart/findCheckout/${id}`
      );
      console.log(res.data);
      dispatch(cartSync(res.data));
      // setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const onCheckout = async (id, status) => {
    try {
      const res = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/cart/cartUpdate/${id}`,
        {
          status: status ? false : true,
          id: id,
        }
      );
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const onQty = async (id) => {
    try {
      const res = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/cart/update/${id}`,
        {
          id: id,
          qty: 1,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getDefault = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/findDefault/${id}`
      );
      console.log(result.data);
      setData2(result.data.defaultAdd);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDefault();
  }, [id]);

  const onDelete = async (id) => {
    try {
      await Axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/cart/remove/${id}`
      );
      // Swal.fire({
      //   icon: "success",
      //   text: "Cart Berhasil Dihapus",
      //   timer: 2000,
      //   customClass: {
      //     container: "my-swal",
      //   },
      // });
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

  const toCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Box>
        <FormControl>
          <FormLabel>Products</FormLabel>
          <Flex justify={"space-between"}>
            {/* <Checkbox>Select All</Checkbox> */}
            {/* <Text align="end" as={"button"} variant="ghost">
              Hapus
            </Text> */}
          </Flex>
          {data?.map((item) => {
            return (
              <Card margin={"10px"}>
                <Flex mb={"50px"} justify={"space-between"}>
                  <Checkbox
                    defaultChecked={item.status ? true : false}
                    onChange={() =>
                      onCheckout(
                        item.id,
                        item.status,
                        window.location.replace("/cart", 100)
                      )
                    }
                  >
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
                        {/* <GridItem>{item.Product?.weight} g</GridItem> */}
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
                    <HStack maxW="200px">
                      <Button variant={"unstyled"} {...dec}>
                        -
                      </Button>
                      <Input
                        w={"50px"}
                        // {...input}
                        defaultValue={item.qty}
                      ></Input>
                      <Button variant={"unstyled"} {...inc}>
                        +
                      </Button>
                    </HStack>
                    {/* <Button onChange={() => onQty(item.id, item.qty)}>
                      Change
                    </Button> */}
                  </Box>
                </Flex>
              </Card>
            );
          })}
        </FormControl>
        <FormControl>
          <FormLabel>Total</FormLabel>
          <PopoutCheckout props={checkout} />
        </FormControl>

        <FormControl>
          <FormLabel>Buyer Information</FormLabel>
          <Text>{data2?.["User.name"]}</Text>
          <Text>{data2?.["User.phoneNumber"]}</Text>
        </FormControl>
        <FormControl>
          <FormLabel>Delivery Address</FormLabel>
          <Box border={"2px"}>
            <Text as={"b"}>{data2?.receiverName}</Text>
            <Text>{data2?.receiverPhone}</Text>
            {data2?.addressLine},{data2?.district},{data2?.city},
            {data2?.province}
            <Text>{data2?.detail}</Text>
          </Box>
        </FormControl>
        <FormControl>
          <FormLabel>Order Note</FormLabel>
          <Textarea></Textarea>
        </FormControl>
        <Button onClick={toCheckout} w={"100%"}>
          Select Payment Method
        </Button>
      </Box>
    </>
  );
};
