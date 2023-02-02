import { useRef } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Center,
  Box,
} from "@chakra-ui/react";

export const AddCategory = () => {
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
        text: "Category Added",
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

  return (
    <div>
      <h2>
        <Box color="#285430" as="span" flex="1" textAlign="left">
          Add Category
        </Box>
      </h2>

      <Stack spacing={"10px"}>
        <FormControl>
          <FormLabel color="#285430">Nama Category</FormLabel>
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
  );
};
