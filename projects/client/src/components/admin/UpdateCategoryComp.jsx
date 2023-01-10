import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

export const UpdateCategoryComp = ({ data }) => {
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState("upload");
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const inputCategoryName = useRef("");

  const onUpdate = async (id) => {
    try {
      const updateCategory = {
        categoryName: inputCategoryName.current.value,
      };
      // console.log(updateBook);

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
      <Stack spacing={"10px"}>
        <FormControl>
          <FormLabel>Nama Category</FormLabel>
          <Input
            defaultValue={data?.categoryName}
            ref={inputCategoryName}
          ></Input>
        </FormControl>
        <Button onClick={() => onUpdate(data.id)}>Edit </Button>
      </Stack>
    </div>
  );
};