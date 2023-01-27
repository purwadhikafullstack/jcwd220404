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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { logoutAdmin } from "../../redux/adminSlice";
import { syncData } from "../../redux/branchSlice";

export const SidebarComp = () => {
  const { username, id } = useSelector((state) => state.adminSlice.value);
  const { isOpen, onClose, onToggle } = useDisclosure();
  const data = useSelector((state) => state.branchSlice.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  console.log(data);
  console.log(params);

  const toDashboard = () => {
    navigate("/adminPage");
  };

  const toProduct = () => {
    navigate("/adminPage/productAdminPage");
  };

  const toCategory = () => {
    navigate("/adminPage/categoryAdminPage");
  };

  const toInventory = () => {
    navigate("/adminPage/inventoryAdminPage");
  };
  const toTransaction = () => {
    navigate("/adminPage/transactionAdminPage");
  };
  const toDiscount = () => {
    navigate("adminPage/discountAdminPage");
  };

  const onLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem("tokenBranch");
    navigate("/loginAdmin");
  };

  const getBranch = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/branch/findByAdmin/7`
      );
      dispatch(syncData(res.data));
      console.log(res.data);
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
        pt={"10px"}
        pl={"1px"}
        zIndex={"2"}
        pos="fixed"
        borderRight={"2px"}
        borderColor="#285430"
      >
        <Box margin={"auto"} alignItems={"center"} textColor="#285430">
          <Image
            ml={"3vw"}
            boxSize={"8vw"}
            src={`${process.env.REACT_APP_API_BASE_URL}/upload/OnlyFreshLogo.png`}
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
          <Button
            display={"flex"}
            bgColor={"#FF0000"}
            textColor="gray.800"
            width={"100px"}
            justifyContent={"center"}
            borderColor="#gray.800"
            border="2px"
            onClick={onToggle}
            mt="17vw"
            ml="4vw"
            position="absolute"
          >
            LogOut
          </Button>
          <Popover
            returnFocusOnClose={false}
            isOpen={isOpen}
            closeOnBlur={false}
          >
            <PopoverContent
              ml="560"
              mt="280"
              borderColor="#285430"
              border="2px"
              bgColor={"#E5D9B6"}
            >
              <PopoverArrow />
              <PopoverBody textColor={"#285430"}>
                Are you sure you want to logout?
              </PopoverBody>
              <PopoverFooter display="flex" justifyContent="flex-end">
                <ButtonGroup size="sm">
                  <Button
                    onClick={onClose}
                    bgColor={"#A4BE7B"}
                    borderColor="#285430"
                    border="2px"
                    fontSize="14px"
                    color="gray.800"
                  >
                    No
                  </Button>
                  <Button
                    onClick={onLogout}
                    bgColor="#A4BE7B"
                    borderColor="#285430"
                    border="2px"
                    fontSize="14px"
                    color="gray.800"
                  >
                    Yes
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </Box>
      </Box>
    </div>
  );
};
