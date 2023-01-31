import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const OrderSuccess = () => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/");
  };

  return (
    <div>
      <Box>
        <Center>
          <Box
            className="header"
            w={"390px"}
            h={"80px"}
            bgColor="#E5D9B6"
            display={"flex"}
            justifyContent="space-between"
            pt={"10px"}
            pl={"1px"}
            pos="fixed"
            top={"0"}
            zIndex={"2"}
          >
            <Box margin={"auto"} alignItems={"center"} textColor="#285430">
              <Text m="100px" as={"b"} fontSize="xl">
                Order Success
              </Text>
            </Box>
          </Box>
          <Box
            mt={"100px"}
            className="body"
            bgColor="white"
            h={"100%"}
            w={"390px"}
          >
            <FormControl>
              <FormLabel>Time Limit</FormLabel>
              <Text>00:00:00</Text>
            </FormControl>
            <FormControl>
              <FormLabel>Total Bill</FormLabel>
              <Text>Rpxx.xxx</Text>
              <Text>ID Pesanan</Text>
            </FormControl>
            <Button onClick={toHome} w={"100%"}>
              Back to Home
            </Button>
          </Box>
        </Center>
      </Box>
    </div>
  );
};