import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Table,
  TableContainer,
  TabPanel,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { syncCategory } from "../../redux/categorySlice";
import { BsFilterLeft } from "react-icons/bs";
import { BiReset, BiSearchAlt } from "react-icons/bi";
import { useFormik } from "formik";
import * as Yup from "yup";

export const ListCategoryComp = () => {
  const data = useSelector((state) => state.categorySlice.value);
  const [edit, setEdit] = useState({});
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState("upload");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState("ASC");
  const [order, setOrder] = useState("categoryName");
  const [searchCategory, setSearchCategory] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [state, setState] = useState(0);
  const dispatch = useDispatch();

  const getCategory = async () => {
    try {
      const res = await Axios.get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/product/pagCategory?search_query=${searchCategory}&page=${
          page - 1
        }&limit=${limit}&order=${order ? order : `categoryName`}&sort=${
          sort ? sort : "ASC"
        }`
      );
      dispatch(syncCategory(res.data.result));
      console.log(res.data.result);
      setTotalPage(Math.ceil(res.data.totalRows / res.data.limit));
      setState(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, [searchCategory, page, limit, sort]);

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
      `${process.env.REACT_APP_API_BASE_URL}/product/single-uploaded-category/11`,
      data,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    console.log(resultImage.data);
    setProfile(resultImage.data.categoryPicture);
    setImage({ images: "" });
    console.log(image);
    console.log(profile);
  };

  const onDeleteCategory = async (id) => {
    try {
      const res = await Axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/product/removeCategory/${id}`
      );
      console.log(res);
      getCategory();
      Swal.fire({
        icon: "success",
        text: " Delete Success",
        width: "370",
      });
    } catch (err) {
      console.log(err);
    }
  };

  async function fetchSort(filter) {
    setSort(filter);
  }

  const formik = useFormik({
    initialValues: {
      searchName: ``,
    },
    validationSchema: Yup.object().shape({
      searchName: Yup.string().min(3, "Minimal 3 huruf"),
    }),
    validationOnChange: false,
    onSubmit: async () => {
      const { searchName } = formik.values;
      setSearchCategory(searchName);
    },
  });

  useEffect(() => {
    fetchSort();
  }, []);

  return (
    <div>
      <Center>
        <Flex
          ml="3"
          mr="3"
          flexWrap={"wrap"}
          color={useColorModeValue("#285430")}
          border="2px"
          borderRadius="xl"
        >
          <Box className="filter">
            <Box
              m="10px"
              mb="20px"
              borderWidth="2px"
              boxShadow="md"
              borderRadius="8px"
              borderColor="#285430"
            >
              <Box
                alignItems={"center"}
                h="50px"
                borderTopRadius="8px"
                align="center"
                bg="#E5D9B6"
                display="flex"
              >
                <Box h="25px" ml="10px">
                  <Icon color="#285430" boxSize="6" as={BsFilterLeft} />
                </Box>
                <Box h="25px">
                  <Text mx="10px" fontWeight="bold" color="#285430">
                    Filter & Search
                  </Text>
                </Box>
                <Icon
                  color="#285430"
                  sx={{ _hover: { cursor: "pointer" } }}
                  boxSize="6"
                  as={BiReset}
                  onClick={() => {
                    async function submit() {
                      setSearchCategory("");
                      document.getElementById("search").value = "";
                      formik.values.searchName = "";
                    }
                    submit();
                  }}
                />
              </Box>
              <Flex m={2} wrap="wrap">
                <FormControl w="" m={1}>
                  <FormLabel fontSize="x-small" color="#285430">
                    Format Sort
                  </FormLabel>
                  <Select
                    color={"#285430"}
                    borderColor="#285430"
                    onChange={(event) => {
                      fetchSort(event.target.value);
                    }}
                  >
                    <option value="ASC">A-Z</option>
                    <option value="DESC">Z-A</option>
                  </Select>
                </FormControl>
                <FormControl w="" m={1}>
                  <FormLabel fontSize="x-small" color="#285430">
                    Show
                  </FormLabel>
                  <Select
                    color={"#285430"}
                    borderColor="#285430"
                    onChange={(event) => {
                      setLimit(event.target.value);
                    }}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </Select>
                </FormControl>
                <FormControl w="" m={1}>
                  <FormLabel fontSize="x-small" color="#285430">
                    Search Product & Category
                  </FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="Search Category"
                      _placeholder={{ color: "#5F8D4E" }}
                      borderColor="#285430"
                      border="1px"
                      fontSize="18px"
                      color="gray.800"
                      id="search"
                      type="text"
                      onChange={(event) =>
                        formik.setFieldValue("searchName", event.target.value)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          formik.handleSubmit();
                        }
                      }}
                    />
                    <InputRightElement>
                      <Icon
                        fontSize="xl"
                        as={BiSearchAlt}
                        sx={{ _hover: { cursor: "pointer" } }}
                        onClick={() => formik.handleSubmit()}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText color="red">
                    {formik.errors.searchName}
                  </FormHelperText>
                </FormControl>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Center>
      <TabPanel>
        <TableContainer>
          <Table variant="simple" colorScheme="#285430">
            <Thead>
              <Tr>
                <Th color={"#285430"}>Category</Th>
                <Th color={"#285430"}>Actions</Th>
                <Th color={"#285430"}>Picture</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((item) => {
                return (
                  <Tr>
                    <Td color={"#285430"} textColor="gray.800">
                      {item.categoryName}
                    </Td>
                    <Td>
                      <Button onClick={() => setEdit(item)}>
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
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" alignContent="center">
          <Button
            onClick={() => {
              async function submit() {
                setPage(page === 1 ? 1 : page - 1);
              }
              submit();
              var pageNow = page - 1;
              pageNow = pageNow <= 0 ? 1 : pageNow;
              document.getElementById("pagingInput").value = parseInt(pageNow);
            }}
            bgColor={"#A4BE7B"}
            borderColor="#285430"
            border="2px"
            fontSize="14px"
            color="gray.800"
            width={"60px"}
            justifyContent="center"
            size="sm"
            mt="1rem"
          >
            Prev
          </Button>
          <Text alignSelf="center" mx="10px" pt="15px">
            {" "}
            {page} of {totalPage}
          </Text>
          <Button
            onClick={() => {
              async function submit() {
                setPage(totalPage === page ? page : page + 1);
              }
              submit();
              var pageNow = page + 1;
              pageNow = pageNow > totalPage ? page : pageNow;
              document.getElementById("pagingInput").value = parseInt(pageNow);
            }}
            bgColor={"#A4BE7B"}
            borderColor="#285430"
            border="2px"
            fontSize="14px"
            color="gray.800"
            width={"60px"}
            justifyContent="center"
            size="sm"
            mt="1rem"
          >
            Next
          </Button>
        </Box>
      </TabPanel>
    </div>
  );
};
