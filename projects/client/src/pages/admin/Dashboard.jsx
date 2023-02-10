import { Box, Grid, GridItem, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DashboardComp } from "../../components/admin/Dashboard";
import { SidebarComp } from "../../components/admin/Sidebar";
import Axios from "axios";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export const DashboardPage = () => {
  const [data7, setData7] = useState();
  const [data8, setData8] = useState();
  const [branch, setBranch] = useState();
  const { id } = useSelector((state) => state.adminSlice.value);

  const getBranch = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/branch/adminByBranch/${id}`
      );
      setBranch(res.data);
      console.log(res.data);
      setData7(res.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBranch();
  }, [id]);

  const findStock = async () => {
    try {
      const stock = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/inventory/find/${data7}`
      );
      console.log(stock.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    findStock();
  }, [data7]);

  const getInv = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/inventory/findAllByBranch/${data7}`
      );
      setData8(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInv();
  }, [data7]);

  return (
    <div>
      <Box bgColor={"black"} mt={"100px"}>
      <ResponsiveContainer width="50%" height="50%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="pv" fill="black" />
          <Bar dataKey="uv" fill="black" />
        </BarChart>
      </ResponsiveContainer>
      </Box>
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
          <SidebarComp />
        </GridItem>
        <GridItem>
          <DashboardComp />
        </GridItem>
      
      </Grid>
    </div>
  );
};

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
