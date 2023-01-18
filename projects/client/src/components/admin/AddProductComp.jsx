import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";

export const AddProductComp = () => {
  const inputProductName = useRef("");
  const inputDescription = useRef("");
  const [data2, setData2] = useState([]);
  const [edit2, setEdit2] = useState({});

  const onCreate = async () => {
    try {
      const addProduct = {
        productName: inputProductName.current.value,
        description: inputDescription.current.value,
      };
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/product/create`,
        addProduct
      );
      Swal.fire({
        icon: "success",
        text: "Success",
        width: "370",
      });
      setTimeout(() => window.location.replace("/adminPage"), 2000);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getCategory = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/product/listCategory`);
      console.log(res.data);
      setData2(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, [edit2]);

  return (
    <div>
      <Stack spacing={"10px"}>
        <FormControl>
          <FormLabel color="#285430">Product Name</FormLabel>
          <Input
            ref={inputProductName}
            placeholder="Product"
            _placeholder={{ color: "#5F8D4E" }}
            borderColor="#285430"
            textColor="gray.800"
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel color="#285430">Category</FormLabel>
          <Select color={"#285430"} borderColor="#285430" width="100%">
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
          <FormLabel color={"#285430"}>Description</FormLabel>
          <Textarea
            textColor="gray.800"
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
    </div>
  );
};
