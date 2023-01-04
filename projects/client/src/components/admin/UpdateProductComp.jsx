import React, { useEffect, useRef } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  Select,
  Stack,
  Tag,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import Swal from "sweetalert2";
import { ArrowUpIcon } from "@chakra-ui/icons";

export const UpdateProductComp = ({ data }) => {
  //   const { id } = useSelector((state) => state.productSlice.value);
  //   const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState("upload");
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const inputProductName = useRef("");
  const inputDescription = useRef("");
  const inputDistributor = useRef("");
  const inputCategoryName = useRef("");

  const onUpdate = async (id) => {
    try {
      const updateBook = {
        productName: inputProductName.current.value,
        description: inputDescription.current.value,
        distributor: inputDistributor.current.value,
      };
      // console.log(updateBook);

      const res = await Axios.patch(
        `http://localhost:8000/product/update/${id}`,
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
          <FormLabel>Nama Produk</FormLabel>
          <Input
            ref={inputProductName}
            defaultValue={data?.productName}
          ></Input>
        </FormControl>
        <FormLabel>Distributor</FormLabel>
        <Input ref={inputDistributor} defaultValue={data?.distributor}></Input>
        {/* <FormControl>
          <FormLabel>Category 1</FormLabel>
          <Select>
            <option
              // selected={data.Profile?.gender === ""}
              value=""
            >
              Pilih Kategori
            </option>
            <option>Sayuran</option>
            <option>Buah-buahan</option>
            <option>Daging</option>
            <option>Susu dan Olahan</option>
            <option>Perawatan Tubuh</option>
          </Select>
          <FormLabel>Category 2</FormLabel>
          <Select>
            <option
              // selected={data.Profile?.gender === ""}
              value=""
            >
              Pilih Kategori
            </option>
            <option>Sayuran</option>
            <option>Buah-buahan</option>
            <option>Daging</option>
            <option>Susu dan Olahan</option>
            <option>Perawatan Tubuh</option>
          </Select>
        </FormControl> */}
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            ref={inputDescription}
            defaultValue={data?.description}
          ></Textarea>
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>

          <Tag mt={"20px"} as={"button"} ml={"10px"} onClick={onToggle}>
            <ArrowUpIcon mr={"5px"} /> Update Picture
          </Tag>
          <Popover
            returnFocusOnClose={false}
            isOpen={isOpen}
            onClose={onClose}
            placement="auto-end"
            closeOnBlur={false}
          >
            <PopoverContent w={"400px"}>
              <PopoverBody>
                <PopoverArrow />
                <PopoverCloseButton />
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
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </FormControl>
        <Button onClick={() => onUpdate(data.id)}>Edit Product</Button>
      </Stack>
    </div>
  );
};
