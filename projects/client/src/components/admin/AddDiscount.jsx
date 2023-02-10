import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Center,
  Box,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

export const AddDiscount = () => {
  const [data3, setData3] = useState([]);
  const inputProductName = useRef("");
  const inputDescription = useRef("");
  const inputCategory = useRef(0);

  const onCreate = async () => {
    try {
      const addProduct = {
        productName: inputProductName.current.value,
        description: inputDescription.current.value,
        CategoryId: inputCategory.current.value,
      };
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/product/create`,
        addProduct
      );
      Swal.fire({
        icon: "success",
        text: "Success",
        width: "370px",
      });
      setTimeout(() => window.location.replace("/admin/product"), 2000);
    } catch (err) {
    }
  };

  const getProduct = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/list`
      );
      setData3(res.data);
    } catch (err) {
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <Box
        p="10px"
        ml="200px"
        mt="215px"
        mr="100px"
        color={useColorModeValue("#285430")}
        border="2px"
        borderRadius="2xl"
      >
        <Box
          w={"385px"}
          m="10px"
          mb="25px"
          borderWidth="2px"
          boxShadow="xl"
          borderRadius="8px"
          borderColor="#285430"
        >
          <Box
            pt="10px"
            h="50px"
            borderTopRadius="8px"
            align="center"
            bg="#E5D9B6"
            fontSize="18px"
          >
            <Text justifyContent="center" fontWeight="bold" color="#285430">
              Add Product
            </Text>
          </Box>
          <Stack spacing={"10px"}>
            <FormControl>
              <FormLabel color="#285430">Nama Produk</FormLabel>
              <Input
                ref={inputProductName}
                placeholder="Produk"
                _placeholder={{ color: "#5F8D4E" }}
                borderColor="#285430"
                textColor="black"
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel mt={"10px"} ml={"10px"} color={"#285430"}>
                Price
              </FormLabel>
              <Textarea
                w={"360px"}
                ml={"10px"}
                textColor="#285430"
                borderColor="#285430"
                ref={inputDescription}
              ></Textarea>
            </FormControl>
            <Center>
              <Button
                mt={"20px"}
                mb={"20px"}
                w={"360px"}
                bgColor={"#A4BE7B"}
                borderColor="#285430"
                border="2px"
                fontSize="16px"
                color="gray.800"
                justifyContent="center"
                onClick={onCreate}
              >
                Add Product
              </Button>
            </Center>
          </Stack>
        </Box>
      </Box>
    </div>
  );
};
