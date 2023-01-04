import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
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
import { UpdateComp } from "./UpdateProductComp";

export const ListProductComp = () => {
  // const [data, setData] = useState([]);
  // const [edit, setEdit] = useState({});
  const dispatch = useDispatch();
  const data2 = useSelector((state) => state.productSlice.value);

  // const getData = async () => {
  //   try {
  //     const res = await Axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/product/list`
  //     );
  //     console.log(res.data);
  //     setData(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div>
      {/* <TableContainer>
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th>Distributor</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item) => {
              return (
                <Tr>
                  <Td>{item.productName}</Td>
                  <Td>{item.distributor}</Td>
                  <Td>{item.description}</Td>
                  <Td>
                    <Box display={"flex"} justifyContent="space-evenly">
                      <DeleteIcon />
                      <Button onClick={() => setEdit(item)}>
                        <EditIcon onClick={"#href"} />
                      </Button>
                    </Box>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer> */}
    </div>
  );
};
