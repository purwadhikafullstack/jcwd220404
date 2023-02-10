import {
  Box,
  Button,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { transSync } from "../../redux/transactionSlice";

export const SalesComp = () => {
  // const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const [data4, setData4] = useState();
  const [data5, setData5] = useState();
  const [data6, setData6] = useState();
  const [data7, setData7] = useState();
  const [limit2, setLimit2] = useState(5);
  const [sort2, setSort2] = useState("ASC");
  const [order2, setOrder2] = useState("status");
  const [searchProduct, setSearchProduct] = useState("");
  const [state2, setState2] = useState(0);
  const [searchCategory2, setSearchCategory2] = useState("");
  const [page2, setPage2] = useState(1);
  const [totalPage2, setTotalPage2] = useState(0);
  const [limit3, setLimit3] = useState(5);
  const [sort3, setSort3] = useState("ASC");
  const [order3, setOrder3] = useState("status");
  const [searchProduct3, setSearchProduct3] = useState("");
  const [state3, setState3] = useState(0);
  const [searchCategory3, setSearchCategory3] = useState("");
  const [page3, setPage3] = useState(1);
  const [totalPage3, setTotalPage3] = useState(0);
  const [limit4, setLimit4] = useState(5);
  const [sort4, setSort4] = useState("ASC");
  const [order4, setOrder4] = useState("status");
  const [searchProduct4, setSearchProduct4] = useState("");
  const [state4, setState4] = useState(0);
  const [searchCategory4, setSearchCategory4] = useState("");
  const [page4, setPage4] = useState(1);
  const [totalPage4, setTotalPage4] = useState(0);
  const data = useSelector((state) => state.transactionSlice.value);
  const dispatch = useDispatch();

  const getData = async (id) => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/salesDepok`
      );
      console.log(result.data[0]?.BranchId);
      setData5(result.data[0]?.BranchId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData2 = async (id) => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/salesJaksel`
      );

      setData6(result.data[0]?.BranchId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData2();
  }, []);

  const getData3 = async (id) => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/salesJaktim`
      );

      setData7(result.data[0]?.BranchId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData3();
  }, []);

  const getTransDepok = async () => {
    try {
      const res = await Axios.get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/transaction/pagDepok?search_query=${searchCategory2}&page=${
          page2 - 1
        }&limit=${limit2}&order=${order2 ? order2 : `status`}&sort=${
          sort2 ? sort2 : "ASC"
        }&BranchId=${data5}`
      );
      dispatch(transSync(res.data.result));
      console.log(res.data.result);
      setTotalPage2(Math.ceil(res.data.totalRows / res.data.limit));
      setState2(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTransDepok();
  }, [searchCategory2, page2, limit2, sort2]);

  async function fetchSort2(filter) {
    setSort2(filter);
  }

  useEffect(() => {
    fetchSort2();
  }, []);

  const getTransJaksel = async () => {
    try {
      const res = await Axios.get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/transaction/pagJaksel?search_query=${searchCategory3}&page=${
          page3 - 1
        }&limit=${limit3}&order=${order3 ? order3 : `status`}&sort=${
          sort3 ? sort3 : "ASC"
        }&BranchId=${data6}`
      );
      dispatch(transSync(res.data.result));
      console.log(res.data.result);
      setTotalPage3(Math.ceil(res.data.totalRows / res.data.limit));
      setState3(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTransJaksel();
  }, [searchCategory3, page3, limit3, sort3]);

  async function fetchSort3(filter) {
    setSort2(filter);
  }

  useEffect(() => {
    fetchSort3();
  }, []);

  const getTransJaktim = async () => {
    try {
      const res = await Axios.get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/transaction/pagJaktim?search_query=${searchCategory4}&page=${
          page4 - 1
        }&limit=${limit4}&order=${order4 ? order4 : `status`}&sort=${
          sort4 ? sort4 : "ASC"
        }&BranchId=${data7}`
      );
      dispatch(transSync(res.data.result));
      console.log(res.data.result);
      setTotalPage4(Math.ceil(res.data.totalRows / res.data.limit));
      setState4(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTransJaktim();
  }, [searchCategory4, page4, limit4, sort4]);

  async function fetchSort4(filter) {
    setSort4(filter);
  }

  useEffect(() => {
    fetchSort4();
  }, []);

  return (
    <div>
      <Tabs mt="50px" ml="140px">
        <TabList>
          <Tab borderRadius={"5px"}>
            <Text>Depok</Text>
          </Tab>
          <Tab>
            <Text>Jakarta Selatan</Text>
          </Tab>
          <Tab>
            <Text>Jakarta Timur</Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TableContainer mt="30px" w="60vw" bgColor={"white"}>
              <Table variant="simple" colorScheme="#285430">
                <Thead alignContent={"center"}>
                  <Tr>
                    <Th textAlign={"center"} color={"#285430"}>
                      Invoice
                    </Th>
                    <Th textAlign={"center"} color={"#285430"}>
                      Total Product
                    </Th>
                    <Th textAlign={"center"} color={"#285430"}>
                      Delivery Cost
                    </Th>
                    <Th textAlign={"center"} color={"#285430"}>
                      Weight
                    </Th>
                    <Th textAlign={"center"} color={"#285430"}>
                      Status
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map((item) => {
                    return (
                      <Tr>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.id_order}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.totalOrder}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.totalCharge}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.totalWeight}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.status}
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
                    setPage2(page2 === 1 ? 1 : page2 - 1);
                  }
                  submit();
                  var pageNow = page2 - 1;
                  pageNow = pageNow <= 0 ? 1 : pageNow;
                  document.getElementById("pagingInput").value =
                    parseInt(pageNow);
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
                {page2} of {totalPage2}
              </Text>
              <Button
                onClick={() => {
                  async function submit() {
                    setPage2(totalPage2 === page2 ? page2 : page2 + 1);
                  }
                  submit();
                  var pageNow = page2 + 1;
                  pageNow = pageNow > totalPage2 ? page2 : pageNow;
                  document.getElementById("pagingInput").value =
                    parseInt(pageNow);
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
          <TabPanel>
            <TableContainer mt="30px" w="60vw" bgColor={"white"}>
              <Table variant="simple" colorScheme="#285430">
                <Thead alignContent={"center"}>
                  <Tr>
                    <Th textAlign={"center"} color={"#285430"}>
                      Invoice
                    </Th>
                    <Th textAlign={"center"} color={"#285430"}>
                      Total Product
                    </Th>
                    <Th textAlign={"center"} color={"#285430"}>
                      Delivery Cost
                    </Th>
                    <Th textAlign={"center"} color={"#285430"}>
                      Weight
                    </Th>
                    <Th textAlign={"center"} color={"#285430"}>
                      Status
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map((item) => {
                    return (
                      <Tr>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.id_order}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.totalOrder}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.totalCharge}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.totalWeight}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.status}
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
                    setPage3(page3 === 1 ? 1 : page3 - 1);
                  }
                  submit();
                  var pageNow = page3 - 1;
                  pageNow = pageNow <= 0 ? 1 : pageNow;
                  document.getElementById("pagingInput").value =
                    parseInt(pageNow);
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
                {page3} of {totalPage3}
              </Text>
              <Button
                onClick={() => {
                  async function submit() {
                    setPage3(totalPage3 === page3 ? page3 : page3 + 1);
                  }
                  submit();
                  var pageNow = page3 + 1;
                  pageNow = pageNow > totalPage3 ? page3 : pageNow;
                  document.getElementById("pagingInput").value =
                    parseInt(pageNow);
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
          <TabPanel>
            <TableContainer mt="30px" w="60vw" bgColor={"white"}>
              <Table variant="simple" colorScheme="#285430">
                <Thead alignContent={"center"}>
                  <Tr>
                    <Th textAlign={"center"} color={"#285430"}>
                      Invoice
                    </Th>
                    <Th textAlign={"center"} color={"#285430"}>
                      Total Product
                    </Th>
                    <Th textAlign={"center"} color={"#285430"}>
                      Delivery Cost
                    </Th>
                    <Th textAlign={"center"} color={"#285430"}>
                      Weight
                    </Th>
                    <Th textAlign={"center"} color={"#285430"}>
                      Status
                    </Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data?.map((item) => {
                    return (
                      <Tr>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.id_order}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.totalOrder}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.totalCharge}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.totalWeight}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.status}
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
                    setPage4(page4 === 1 ? 1 : page4 - 1);
                  }
                  submit();
                  var pageNow = page4 - 1;
                  pageNow = pageNow <= 0 ? 1 : pageNow;
                  document.getElementById("pagingInput").value =
                    parseInt(pageNow);
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
                {page4} of {totalPage4}
              </Text>
              <Button
                onClick={() => {
                  async function submit() {
                    setPage4(totalPage4 === page4 ? page4 : page4 + 1);
                  }
                  submit();
                  var pageNow = page4 + 1;
                  pageNow = pageNow > totalPage4 ? page4 : pageNow;
                  document.getElementById("pagingInput").value =
                    parseInt(pageNow);
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
        </TabPanels>
      </Tabs>
    </div>
  );
};
