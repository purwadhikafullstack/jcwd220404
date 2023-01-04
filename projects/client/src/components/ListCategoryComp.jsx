import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { syncData } from "../redux/nameSlice";

export const ListCategoryComp = () => {
  const [data, setData] = useState([]);
  // const { data } = useSelector((state) => state.nameSlice.value);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/listCategory`
      );
      console.log(res.data);
      setData(res.data);
      // dispatch(syncData(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <TableContainer>
        <Table variant="simple" colorScheme="teal">
          <Thead alignContent={"center"}>
            <Tr>
              <Th color={"#285430"}>Category</Th>
              <Th color={"#285430"}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item) => {
              return (
                <Tr>
                  <Td color={"#285430"}>{item.categoryName}</Td>
                  <Td>
                    <Box mr="28px" display={"flex"} justifyContent="space-evenly">
                      <EditIcon color={"#285430"} />
                      <DeleteIcon color={"#285430"}/>
                    </Box>
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
