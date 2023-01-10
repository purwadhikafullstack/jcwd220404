import {
  Button,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const WindowComp = () => {
  const navigate = useNavigate();

  const toRegister = () => {
    navigate("/register");
  };
  const toLogin = () => {
    navigate("/loginUser");
  };
  return (
    <div>
      <Flex
        w={"full"}
        h={"100vh"}
        backgroundImage={
          "url(https://media.istockphoto.com/id/467970412/vector/groceries.jpg?s=612x612&w=0&k=20&c=tH30XMv3C-OnoxGIvN3sWmjbmtbdOJMuffd_dR9L5Z8=)"
        }
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
      >
        <VStack
          w={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={"linear(to-r, blackAlpha.1000, transparent)"}
        >
          <Stack maxW={"2xl"} align={"flex-start"} spacing={6} mt="80px">
            <Text
              color={"#285430"}
              fontWeight={500}
              fontSize={useBreakpointValue({ base: "1xl", md: "2xl" })}
            >
              Produk Segar
            </Text>
            <Text color={"#285430"}>
              Produk Segar, dari petani lokal langsung ketempat anda.
            </Text>
            <Stack direction={"row"}>
              <Button
                onClick={toLogin}
                height="38px"
                width="150px"
                bgColor={"#A4BE7B"}
                borderColor="#285430"
                border="2px"
                fontSize="18px"
                color="gray.800"
              >
                Masuk
              </Button>
              <Button
                onClick={toRegister}
                height="38px"
                width="150px"
                bgColor={"#A4BE7B"}
                borderColor="#285430"
                border="2px"
                fontSize="18px"
                color="gray.800"
              >
                Daftar
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
    </div>
  );
};
