import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import Select from "react-select";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  // Select,
  Stack,
  Textarea,
  Center,
  Box,
} from "@chakra-ui/react";

export const AddProduct = () => {
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
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/product/create`,
        {
          addProduct,
          CategoryId: categoryOptions.value,
        }
      );
      Swal.fire({
        icon: "success",
        text: "Product Added",
        width: "370px",
      });
      setTimeout(() => {
        window.location.replace("/admin");
      }, 900);
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
    { value: 7, label: "Unggas" },
    { value: 8, label: "Ibu dan Anak" },
    { value: 9, label: "Makanan Jadi" },
    { value: 10, label: "Paket Masak" },
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
            color="gray.800"
            width={"100%"}
            justifyContent="center"
            onClick={onCreate}
          >
            Add Product
          </Button>
        </Center>
      </Stack>
    </>
  );
};
