import { Box, Center } from "@chakra-ui/react";
import { BranchComp } from "../../pages/admin/BranchComp";
import { SuperComp } from "../../pages/admin/SuperComp";
import { RestrictedPage } from "../403ResultPage";

export const AdminPage = () => {
  const tokenLocalStorage = localStorage.getItem("tokenSuper");
  const tokenLocalStorage2 = localStorage.getItem("tokenBranch");

  return (
    <>
      <Box>
        <Center>
          <Box w={"390px"} h={"844px"} bgColor="white">
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
