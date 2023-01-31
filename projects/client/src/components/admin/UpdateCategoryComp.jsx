import React, { useRef } from "react";
import Axios from "axios";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Swal from "sweetalert2";

export const UpdateCategoryComp = ({ data }) => {
  const inputCategoryName = useRef("");

  const onUpdate = async (id) => {
    try {
      const updateCategory = {
        categoryName: inputCategoryName.current.value,
      };

      const res = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/product/updateCategory/${id}`,
        updateCategory
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
      <Box>
        <FormControl>
          <FormLabel color="#285430">Category Name</FormLabel>
          <Input
            bgColor={"white"}
            _placeholder={{ color: "#5F8D4E" }}
            borderColor="#285430"
            textColor="#285430"
            defaultValue={data?.categoryName}
            ref={inputCategoryName}
          ></Input>
        </FormControl>
        <Center>
          <Button
            mt="1.5vw"
            bgColor={"#A4BE7B"}
            borderColor="#285430"
            border="2px"
            color="gray.800"
            width={"40%"}
            justifyContent="center"
            onClick={() => onUpdate(data.id)}
          >
            Save
          </Button>
        </Center>
      </Box>
    </div>
  );
};
