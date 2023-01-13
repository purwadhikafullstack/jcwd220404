import { useEffect, useState } from "react";

import Axios from "axios";
import {
  Box,
  Button,
  ButtonGroup,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

export const ListProduct = () => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState({});
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState("upload");

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/list`
      );
      console.log(res.data);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [edit]);

  const onDelete = async (id) => {
    try {
      const res = await Axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/product/remove/${id}`
      );
      console.log(res);
      getData();
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

    console.log(image);
    console.log(profile);
    window.location.replace("/admin-page");
  };

  return (
    <div>
      <TableContainer>
        <Table variant="simple" colorScheme="teal">
          <Thead alignContent={"center"}>
            <Tr>
              <Th color={"#285430"}>Product</Th>
              <Th color={"#285430"}>Actions</Th>
              <Th color={"#285430"}>Picture</Th>
              <Th color={"#285430"}>Distributor</Th>
              <Th color={"#285430"}>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item) => {
              return (
                <Tr>
                  <Td color={"#285430"}>{item.productName}</Td>
                  <Td color={"#285430"}>
                    <Box
                      mr="28px"
                      display={"flex"}
                      justifyContent="space-evenly"
                    >
                      <Button onClick={() => setEdit(item)}>
                        <EditIcon color={"#285430"} />
                      </Button>
                      <Button onClick={() => onDelete(item.id)}>
                        <DeleteIcon color={"#285430"} />
                      </Button>
                    </Box>
                  </Td>

                  <Td>
                    <Image
                      boxSize={"50px"}
                      src={"http://localhost:8000/" + item.picture}
                    />
                    <ButtonGroup size="sm">
                      <form encType="multipart/form-data">
                        <input
                          color="#285430"
                          type={"file"}
                          accept="image/*"
                          name="file"
                          size={"100px"}
                          onChange={(e) => handleChoose(e)}
                        ></input>
                      </form>
                      <Button
                        bgColor={"#A4BE7B"}
                        borderColor="#285430"
                        border="2px"
                        fontSize="14px"
                        color="gray.800"
                        width={"100%"}
                        justifyContent="center"
                        onClick={handleUpload}
                        size="sm"
                      >
                        Upload
                      </Button>
                    </ButtonGroup>
                  </Td>
                  <Td color={"#285430"}>{item.description}</Td>
                  <Td>{item.distributor}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
