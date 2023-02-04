import {
  Box,
  Button,
  Center,

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
                ORDER SUCCESS
              </Text>
            </Box>
          </Box>
          <Box
            mt={"80px"}
            className="body"
            bgColor="white"
            h={"100vh"}
            w={"390px"}
          >
            <FormControl>
              <FormLabel mt="10px" ml="10px" textColor="#285430">Time Limit</FormLabel>
              <Text ml="10px" textColor="#285430">00:00:00</Text>
            </FormControl>
            <FormControl>
              <FormLabel mt="10px" ml="10px" textColor="#285430">Total Bill</FormLabel>
              <Text ml="10px" textColor="#285430">Rpxx.xxx</Text>
              <Text mt="10px" ml="10px" textColor="#285430">ID Pesanan</Text>
            </FormControl>
            <Button onClick={toHome}  mt={"20px"} ml={"10px"}
            w={"370px"}
            bgColor={"#A4BE7B"}
            borderColor="#285430"
            border="2px"
            fontSize="16px"
            color="gray.800"
            justifyContent="center">
              Back to Home
            </Button>
          </Box>
        </Center>
      </Box>
    </div>
  );
};