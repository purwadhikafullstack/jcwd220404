import { Box, Center } from "@chakra-ui/react";
import { SuperPage } from "./SuperPage";
import { BranchPage } from "./BranchPage";
import { ForbiddenPage } from "../403ForbiddenPage";

export const AdminPage = () => {
  const tokenLocalStorage = localStorage.getItem("tokenSuper");
  const tokenLocalStorage2 = localStorage.getItem("tokenBranch");

  return (
    <div>
      <Center>
        <Box
        w={"100%"}
        h={"100vh"} 
        bgColor="white"
        >
          {tokenLocalStorage ? (
            <SuperPage />
          ) : tokenLocalStorage2 ? (
            <BranchPage/>
          ) : (
            <ForbiddenPage />
          )}
        </Box>
      </Center>
    </div>
  );
};