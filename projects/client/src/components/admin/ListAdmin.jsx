import { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import Axios from "axios";

export const ListAdmin = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/admin/findAll`
      );
      console.log(res.data);
      setData(res.data);
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
        <Table ml="10px" mr="10px" variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th color={"#285430"}>Username</Th>
              <Th color={"#285430"}>Email</Th>
              <Th color={"#285430"}>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* {data?.map((item) => {
              return (
                <Tr>
                  <Td color={"#285430"}>{item.username}</Td>
                  <Td color={"#285430"}>{item.email}</Td>
                  <Td color={"#285430"}>
                    {item.isSuper === 2 ? "Super Admin" : "Branch Admin"}
                  </Td>
                </Tr>
              );
            })} */}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
