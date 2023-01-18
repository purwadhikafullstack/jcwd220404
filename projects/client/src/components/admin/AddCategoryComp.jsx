import React, { useRef } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";

export const AddCategoryComp = () => {
    const inputCategoryName = useRef("");

  const onCreateCategory = async () => {
    try {
      const addProduct = {
        categoryName: inputCategoryName.current.value,
      };
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/product/createCategory`,
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
  return (
    <div>
        <Stack spacing={"10px"}>
                <FormControl>
                  <FormLabel color="#285430">Category Name</FormLabel>
                  <Input
                    ref={inputCategoryName}
                    placeholder="Category"
                    _placeholder={{ color: "#5F8D4E" }}
                  ></Input>
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
                    onClick={onCreateCategory}
                  >
                    Add Category
                  </Button>
                </Center>
              </Stack>
    </div>
  )
};
