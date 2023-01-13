import Axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export const UpdateCategoryComp = ({ data }) => {
  const [data2, setData2] = useState([]);
  const [edit2, setEdit2] = useState({});
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
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
      setTimeout(() => window.location.replace("/admin"), 900);
    } catch (err) {
      console.log(err);
    }
  };

  // const getCategory = async () => {
  //   try {
  //     const res = await Axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/product/listCategory`
  //     );
  //     console.log(res.data);
  //     setData2(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getCategory();
  // }, [edit2]);

  return (
    <>
      <Stack spacing={"10px"}>
        <FormControl>
          <FormLabel color="#285430">Nama Category</FormLabel>
          <Input
            _placeholder={{ color: "#5F8D4E" }}
            borderColor="#285430"
            textColor="black"
            defaultValue={data?.categoryName}
            ref={inputCategoryName}
          ></Input>
        </FormControl>
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
          Edit{" "}
        </Button>
      </Stack>
    </>
  );
};
