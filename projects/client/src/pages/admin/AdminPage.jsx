import { Box, Center } from "@chakra-ui/react";
import { BranchComp } from "../../components/admin/BranchComp";
import { SuperComp } from "../../components/admin/SuperComp";
import { ForbiddenPage } from "../403ForbiddenPage";

export const AdminPage = () => {
  const tokenLocalStorage = localStorage.getItem("tokenSuper");
  const tokenLocalStorage2 = localStorage.getItem("tokenBranch");

  return (
    <div>
      <Center>
        <Box w={"390px"} h={"844px"} bgColor="white">
          {tokenLocalStorage ? (
            <SuperComp />
          ) : tokenLocalStorage2 ? (
            <BranchComp />
          ) : (
            <ForbiddenPage />
          )}
        </Box>
      </Center>
    </div>
  );
};
