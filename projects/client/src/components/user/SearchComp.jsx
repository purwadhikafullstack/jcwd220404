import { Input, Box } from "@chakra-ui/react";

export const SearchComp = () => {
  return (
    <>
      <Box pr={"20px"} pt="13px">
        <Input
          placeholder="Only Fresh Here..."
          _placeholder={{ color: "#5F8D4E" }}
          bgColor={"white"}
          w={"230px"}
          textColor="black"
          borderColor={"#285430"}
        />
      </Box>
    </>
  );
};
