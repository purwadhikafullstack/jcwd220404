import { useEffect, useRef, useState } from "react";
import Axios from "axios";
import {
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
export const ListCategory = () => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState({});
  const [data2, setData2] = useState([]);
  const [edit2, setEdit2] = useState({});
  const [image2, setImage2] = useState("");
  const [profile2, setProfile2] = useState("upload");

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

  const getCategory = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/listCategory`
      );
      console.log(res.data);
      setData2(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, [edit2]);

  const onDeleteCategory = async (id) => {
    try {
      const res = await Axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/product/removeCategory/${id}`
      );
      console.log(res);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChoose1 = (e) => {
    console.log("e.target.files", e.target.files);
    setImage2(e.target.files[0]);
  };

  const handleUpload1 = async (id) => {
    const data = new FormData();
    console.log(data);
    data.append("file", image2);
    console.log(data.get("file"));

    const resultImage = await Axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/product/single-uploaded-category/${id}`,
      data,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    console.log(resultImage.data);
    setProfile2(resultImage.data.categoryPicture);
    setImage2({ images: "" });
    console.log(image2);
    console.log(profile2);
    window.location.replace("/admin-page");
  };

  return (
    <div>
      <TableContainer>
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th color={"#285430"}>Category</Th>
              <Th color={"#285430"}>Actions</Th>
              <Th color={"#285430"}>Picture</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data2?.map((item) => {
              return (
                <Tr>
                  <Td color={"#285430"} textColor="black">
                    {item.categoryName}
                  </Td>
                  <Td>
                    <Button onClick={() => setEdit2(item)}>
                      <EditIcon color={"#285430"} />
                    </Button>
                    <Button onClick={() => onDeleteCategory(item.id)}>
                      <DeleteIcon color={"#285430"} />
                    </Button>
                  </Td>
                  <Td>
                    <Image
                      boxSize={"50px"}
                      src={"http://localhost:8000/" + item.categoryPicture}
                    />
                    <ButtonGroup size="sm">
                      <form encType="multipart/form-data">
                        <input
                          type={"file"}
                          accept="image/*"
                          name="file"
                          size={"100px"}
                          onChange={(e) => handleChoose1(e)}
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
                        onClick={handleUpload1}
                        size="sm"
                      >
                        Upload
                      </Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
