import { Grid, GridItem } from "@chakra-ui/react";
// import { BranchComp } from "../../components/admin/BranchComp";
import { SidebarSuperComp } from "../../components/admin/SidebarSuperComp";

export const SuperPage = () => {
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
          <SidebarSuperComp />
        </GridItem>
        <GridItem>
          {/* <BranchComp /> */}
        </GridItem>
      </Grid>
    </div>
  );
};