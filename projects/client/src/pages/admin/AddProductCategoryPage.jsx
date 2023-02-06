import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { AddCategory } from "../../components/admin/AddCategory";
import { AddProduct } from "../../components/admin/AddProduct";
import { SidebarBranch } from "../../components/admin/SidebarBranch";

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
          <SidebarBranch />
        </GridItem>
        <Flex>
          <AddProduct />
          <AddCategory />
        </Flex>
      </Grid>
    </div>
  );
};