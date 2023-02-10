import {
  Avatar,
  Box,
  Button,
  Center,
  Image,
  Text,
} from "@chakra-ui/react";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LogoutBranch } from "./LogoutBranch";

export const SidebarComp = () => {
  const { username, id } = useSelector((state) => state.adminSlice.value);
  const [data, setData] = useState();
  const navigate = useNavigate();

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

  const getBranch = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/branch/branchByAdmin/${id}`
      );
      setData(res.data);
    } catch (err) {
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
        pt={"10px"}
        pl={"1px"}
        zIndex={"2"}
        pos="fixed"
        borderRight={"2px"}
        borderColor="#285430"
      >
        <Box margin={"auto"} alignItems={"center"} textColor="#285430">
          <Image
            ml={"3.5vw"}
            boxSize={"8vw"}
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
          <Text textColor={"#285430"} fontSize="md" as={"b"} ml="3.8vw">
            {username}
          </Text>
          <Center>
            <Text
              bgColor={"#A4BE7B"}
              borderRadius="md"
              borderColor="#285430"
              border="2px"
              color="gray.800"
              fontSize="14px"
              mt={"1vh"}
              width="100px"
              mr={"1.5vw"}
              align="center"
            >
              {data?.branchName}
            </Text>
          </Center>
          <Button
            bgColor={"#E5D9B6"}
            mt={"2vw"}
            ml={"4vw"}
            textColor={"#285430"}
            fontSize="md"
            variant="unstyled"
            onClick={toDashboard}
          >
            Dashboard
          </Button>
          <Button
            bgColor={"#E5D9B6"}
            mt={"1vw"}
            ml={"4vw"}
            textColor={"#285430"}
            fontSize="md"
            variant="unstyled"
            onClick={toProduct}
          >
            Product
          </Button>
          <Button
            bgColor={"#E5D9B6"}
            mt={"1vw"}
            ml={"4vw"}
            textColor={"#285430"}
            fontSize="md"
            variant={"unstyled"}
            onClick={toCategory}
          >
            Category
          </Button>
          <Button
            bgColor={"#E5D9B6"}
            mt={"1vw"}
            ml={"4vw"}
            textColor={"#285430"}
            fontSize="md"
            variant={"unstyled"}
            onClick={toInventory}
          >
            Inventory
          </Button>
          <Button
            bgColor={"#E5D9B6"}
            mt={"1vw"}
            ml={"4vw"}
            textColor={"#285430"}
            fontSize="md"
            variant={"unstyled"}
            onClick={toTransaction}
          >
            Transaction
          </Button>
          <Button
            bgColor={"#E5D9B6"}
            mt={"1vw"}
            ml={"4vw"}
            textColor={"#285430"}
            fontSize="md"
            variant={"unstyled"}
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
