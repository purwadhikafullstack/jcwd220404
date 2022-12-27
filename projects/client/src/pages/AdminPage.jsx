import { Box, Center } from "@chakra-ui/react";
import {BranchComp} from "../components/BranchComp";
import {SuperComp} from "../components/SuperComp";

export const AdminPage= () => {
  const tokenLocalStorage = localStorage.getItem("tokenSuper");

  return (
    <div>
      <Center>
        <Box w={"390px"} h={"844px"} bgColor="white">
          {tokenLocalStorage ? <SuperComp /> : <BranchComp />}
        </Box>
      </Center>
    </div>
  );
};
