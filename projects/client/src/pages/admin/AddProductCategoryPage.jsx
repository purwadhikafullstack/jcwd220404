import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { AddCategoryComp } from "../../components/admin/AddCategoryComp";
import { AddProductComp } from "../../components/admin/AddProductComp";
import { SidebarBranchComp } from "../../components/admin/SidebarBranchComp";

export const AddProductCategoryPage = () => {
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
          <SidebarBranchComp />
        </GridItem>
        <Flex>
          <AddProductComp />
          <AddCategoryComp />
        </Flex>
      </Grid>
    </div>
  );
};