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
      const updateBook = {
        categoryName: inputCategoryName.current.value,
      };
      // console.log(updateBook);

      const res = await Axios.patch(
        `http://localhost:8000/product/updateCategory/${id}`,
        updateBook
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

  const handleChoose = (e) => {
    console.log("e.target.files", e.target.files);
    setImage(e.target.files[0]);
  };

  const handleUpload = async (id) => {
    const data = new FormData();
    console.log(data);
    data.append("file", image);
    console.log(data.get("file"));

    const resultImage = await Axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/product/single-uploaded/${id}`,
      data,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    console.log(resultImage.data);
    setProfile(resultImage.data.picture);
    setImage({ images: "" });
  };
  console.log(image);
  console.log(profile);

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
        <FormControl>
          <FormLabel>Image</FormLabel>
          <ButtonGroup size="sm">
            <form encType="multipart/form-data">
              <input
                type={"file"}
                accept="image/*"
                name="file"
                onChange={(e) => handleChoose(e)}
              ></input>
            </form>
            <Button colorScheme="blue" onClick={handleUpload}>
              Upload
            </Button>
          </ButtonGroup>
        </FormControl>
        <Button onClick={() => onUpdate(data.id)}>Edit </Button>
      </Stack>
    </div>
  );
};
