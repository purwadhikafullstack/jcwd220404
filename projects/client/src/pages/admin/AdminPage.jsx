import { Box, Center } from "@chakra-ui/react";
import { SuperComp } from "../../pages/admin/SuperAdmin";
import { RestrictedPage } from "../403ResultPage";
import { BranchComp } from "./BranchAdmin";

export const AdminPage = () => {
  const tokenLocalStorage = localStorage.getItem("tokenSuper");
  const tokenLocalStorage2 = localStorage.getItem("tokenBranch");

  return (
    <>
      <Box>
        <Center>
          <Box w={"100%"} h={"100vh"} bgColor="white">
            {tokenLocalStorage ? (
              <SuperComp />
            ) : tokenLocalStorage2 ? (
              <BranchComp />
            ) : (
              <RestrictedPage />
            )}
          </Box>
        </Center>
      </Box>
    </>
  );
};
