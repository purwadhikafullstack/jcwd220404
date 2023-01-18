import React, { useRef } from "react";
import Axios from "axios";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import Swal from "sweetalert2";

export const UpdateProductComp = ({ data }) => {
  const inputProductName = useRef("");
  const inputDescription = useRef("");
  

  const onUpdate = async (id) => {
    try {
      const updateProduct = {
        productName: inputProductName.current.value,
        description: inputDescription.current.value,
      };

      const res = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/product/update/${id}`,
        updateProduct
      );
      console.log(res);
      Swal.fire({
        icon: "success",
        text: "Data Updated",
      });
      setTimeout(() => window.location.replace("/adminPage"), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Stack spacing={"10px"}>
        <FormControl>
          <FormLabel color="#285430">Product Name</FormLabel>
          <Input
            _placeholder={{ color: "#5F8D4E" }}
            borderColor="#285430"
            textColor="black"
            ref={inputProductName}
            defaultValue={data?.productName}
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel color="#285430">Description</FormLabel>
          <Textarea
            _placeholder={{ color: "#5F8D4E" }}
            borderColor="#285430"
            textColor="black"
            ref={inputDescription}
            defaultValue={data?.description}
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
            onClick={() => onUpdate(data.id)}
          >
            Edit Product
          </Button>
        </Center>
      </Stack>
    </div>
  );
};
