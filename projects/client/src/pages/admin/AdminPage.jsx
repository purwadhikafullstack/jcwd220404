import { Box, Center } from "@chakra-ui/react";
import { SuperComp } from "../../components/admin/SuperComp";
import {DashboardPage } from "../admin/DashboardPage";
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
            <SuperComp />
          ) : tokenLocalStorage2 ? (
            <DashboardPage/>
          ) : (
            <ForbiddenPage />
          )}
        </Box>
      </Center>
    </div>
  );
};
