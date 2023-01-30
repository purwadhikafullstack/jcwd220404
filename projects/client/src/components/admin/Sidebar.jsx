import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { logoutAdmin } from "../../redux/adminSlice";
import { syncData } from "../../redux/branchSlice";
import { LogoutBranch } from "../../components/admin/LogoutBranch";

export const SidebarComp = () => {
  const { username, id } = useSelector((state) => state.adminSlice.value);
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [data, setData] = useState();
  // const data = useSelector((state) => state.branchSlice.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  console.log(id);
  console.log(data);
  console.log(params);

  const toDashboard = () => {
    navigate("/admin");
  };

  const toProduct = () => {
    navigate("/admin/product");
  };

  const toCategory = () => {
    navigate("/admin/category");
  };

  const toInventory = () => {
    navigate("/admin/inventory");
  };
  const toTransaction = () => {
    navigate("/admin/transaction");
  };
  const toDiscount = () => {
    navigate("/admin/discount");
  };

  const getBranch = async (id) => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/branch/branchById/1`
      );
      setData(res.data.response);
      // dispatch(syncData(res.data));
      console.log(res.data.response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBranch();
  }, []);

  return (
    <div>
      {" "}
      <Box
        className="sidebar"
        w={"16vw"}
        h={"100vh"}
        bgColor="#E5D9B6"
        // pt={"10px"}
        pl={"1px"}
        zIndex={"2"}
        pos="fixed"
        borderRight={"2px"}
        borderColor="#285430"
      >
        <Box margin={"auto"} alignItems={"center"} textColor="#285430">
          <Image
            ml={"50px"}
            boxSize={"100px"}
            src={`${process.env.REACT_APP_API_BASE_URL}/upload/PIMG-167324294561798293.png`}
          />
          <Text color={"#285430"} as="b" ml={"3vw"}>
            BRANCH ADMIN
          </Text>
          <Avatar
            bgColor={"gray.500"}
            size={"lg"}
            mt="2vw"
            ml="5vw"
            pb={""}
            name={username}
          ></Avatar>
          <Text textColor={"#285430"} fontSize="md" as={"b"} ml="5vw">
            {username}
          </Text>
          <Text ml="5.5vw">{data?.branchName}</Text>
          <Button
            mt={"2vw"}
            ml={"3vw"}
            textColor={"#285430"}
            fontSize="md"
            onClick={toDashboard}
          >
            Dashboard
          </Button>
          <Button
            mt={"1vw"}
            ml={"3vw"}
            textColor={"#285430"}
            fontSize="md"
            onClick={toProduct}
          >
            Product
          </Button>
          <Button
            mt={"1vw"}
            ml={"3vw"}
            textColor={"#285430"}
            fontSize="md"
            onClick={toCategory}
          >
            Category
          </Button>
          <Button
            mt={"1vw"}
            ml={"3vw"}
            textColor={"#285430"}
            fontSize="md"
            onClick={toInventory}
          >
            Inventory
          </Button>
          <Button
            mt={"1vw"}
            ml={"3vw"}
            textColor={"#285430"}
            fontSize="md"
            onClick={toTransaction}
          >
            Transaction
          </Button>
          <Button
            mt={"1vw"}
            ml={"3vw"}
            textColor={"#285430"}
            fontSize="md"
            onClick={toDiscount}
          >
            Discount
          </Button>
          <LogoutBranch />
        </Box>
      </Box>
    </div>
  );
};
