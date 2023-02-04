import React from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { RegisterBranch} from "../../components/admin/RegisterBranch";
import { ListBranch } from "../../components/admin/ListBranch";
import { SidebarSuper } from "../../components/admin/SidebarSuper";

export const BranchManagement = () => {
  return (
    <div>
      <Grid
        templateAreas={`"header header"
              "nav main"
              "nav footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"150px 1fr"}
        h="100vh"
        gap="1"
        color="#285430"
        fontWeight="bold"
        bgColor={"white"}
      >
        <GridItem>
          <SidebarSuper />
        </GridItem>
        <Flex>
          <ListBranch />
          <RegisterBranch />
        </Flex>
      </Grid>
    </div>
  );
};
