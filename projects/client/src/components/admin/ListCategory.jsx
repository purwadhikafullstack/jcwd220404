import { useEffect, useState } from "react";
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

  

  return (
    <div>
      
    </div>
  );
};
