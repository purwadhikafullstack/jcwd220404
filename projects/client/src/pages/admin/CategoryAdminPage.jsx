import { Grid, GridItem } from "@chakra-ui/react";
import { SidebarBranchComp } from "../../components/admin/SidebarBranchComp";
import { CategoryComp } from "../../components/admin/CategoryComp";

export const CategoryAdminPage = () => {

    return (
      <div><Grid
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
      <GridItem>
        <CategoryComp/>
      </GridItem>
    </Grid>
         </div>
  );
};