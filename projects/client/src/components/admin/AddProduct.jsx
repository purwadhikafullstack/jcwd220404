import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import Select from "react-select";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  // Select,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";

export const AddProduct = () => {
  const inputProductName = useRef("");
  const inputDescription = useRef("");
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [edit2, setEdit2] = useState({});
  const inputProductName = useRef("");
  const inputDescription = useRef("");
  const inputCategory = useRef(0);

  const onCreate = async () => {
    try {
      const addProduct = {
        productName: inputProductName.current.value,
        description: inputDescription.current.value,
      };
      const loopCategory = categoryOptions.map((item) => item.value);
      console.log(loopCategory);
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/product/create`,
        {
          addProduct,
          CategoryId: categoryOptions[0]?.value,
        }
      );
      Swal.fire({
        icon: "success",
        text: "Success",
      });
      setTimeout(() => window.location.replace("/admin/product"), 2000);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getCategory = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/listCategory`
      );
      console.log(res.data);
      setData2(res.data);
      const categories = res.data.map((item) => item.categoryName);
      console.log(categories);
      setData3(categories);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, [edit2]);

  const categoryOptions = [
    { value: 1, label: "Sayuran" },
    { value: 2, label: "Seafood" },
    { value: 3, label: "Buah-Buahan" },
    { value: 4, label: "Beli 1 Gratis 1" },
    { value: 5, label: "Daging" },
    { value: 6, label: "Protein" },
    { value: 8, label: "Unggas" },
    { value: 9, label: "Ibu dan Anak" },
    { value: 10, label: "Makanan Jadi" },
    { value: 11, label: "Paket Masak" },
  ];

  return (
    <>
      <h2>
        <Box color="#285430" as="span" flex="1" textAlign="left">
          Add Product
        </Box>
      </h2>
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
        <FormLabel color="#285430">Distributor</FormLabel>
        <Input
          // ref={inputDistributor}
          placeholder="Distributor"
          _placeholder={{ color: "#5F8D4E" }}
          borderColor="#285430"
          textColor="black"
        ></Input>
        <FormControl>
          <FormLabel color="#285430">Category 1</FormLabel>
          <Select
            // defaultValue={[colourOptions[2], colourOptions[3]]}
            isMulti
            name="colors"
            options={categoryOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            value={categoryOptions.value}
          />
          {/* <Select color={"#285430"} borderColor="#285430" width="100%">
            <option>Select Category</option>
            {data2?.map((item) => {
              return (
                <>
                  <option color="#285430">{item.categoryName}</option>
                </>
              );
            })}
          </Select> */}
        </FormControl>
        <FormControl>
          <FormLabel color={"#285430"}>Description</FormLabel>
          <Textarea
            textColor="black"
            borderColor="#285430"
            ref={inputDescription}
          ></Textarea>
        </FormControl>
        <Center>
          <Button
            bgColor={"#A4BE7B"}
            borderColor="#285430"
            border="2px"
            fontSize="18px"
          >
            <Text justifyContent="center" fontWeight="bold" color="#285430">
              Add Product
            </Text>
          </Box>
          <Stack spacing={"10px"}>
            <FormControl>
              <FormLabel mt={"10px"} ml={"10px"} color="#285430">
                Product Name
              </FormLabel>
              <Input
                w={"360px"}
                ml={"10px"}
                ref={inputProductName}
                placeholder="Product"
                _placeholder={{ color: "#5F8D4E" }}
                borderColor="#285430"
                textColor="#285430"
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel mt={"10px"} ml={"10px"} color="#285430">
                Category
              </FormLabel>
              <Select
                w={"360px"}
                ml={"10px"}
                color={"#285430"}
                borderColor="#285430"
              >
                <option>Select Category</option>
                {data2?.map((item) => {
                  return (
                    <>
                      <option color="#285430">{item.categoryName}</option>
                    </>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel mt={"10px"} ml={"10px"} color={"#285430"}>
                Description
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