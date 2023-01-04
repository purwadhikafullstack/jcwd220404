import {
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

export const ListAdminComp = () => {
  const [data, setData] = useState([]);
  // const { data } = useSelector((state) => state.nameSlice.value);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/admin/findAll`
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
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item) => {
              return (
                <Tr>
                  <Td>{item.username}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.isSuper === 2 ? "Super Admin" : "Branch Admin"}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
