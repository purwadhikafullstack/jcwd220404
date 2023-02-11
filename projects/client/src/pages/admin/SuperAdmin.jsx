import { Grid, GridItem } from "@chakra-ui/react";
import { SidebarSuper } from "../../components/admin/SidebarSuper";
import React, { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import Axios from "axios";
import { async } from "q";

export const SuperComp = () => {
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const [data4, setData4] = useState();
  const [data5, setData5] = useState();

  const getAll = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/totalAll`
      );
      setData4(res.data.total);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const getAllInv = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/inventory/totalInv`
      );
      setData5(res.data.total);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllInv();
  }, []);

  const getData = async (id) => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/salesDepok`
      );
      setData1(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData2 = async (id) => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/salesJaksel`
      );
      setData2(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData2();
  }, []);

  const getData3 = async (id) => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/salesJaktim`
      );
      setData3(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData3();
  }, []);

  return (
    <>
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"150px 1fr"}
        h="10vh"
        gap="1"
        color="#285430"
        fontWeight="bold"
        bgColor={"white"}
      >
        <GridItem>
          <SidebarSuper />
        </GridItem>
      </Grid>
      <ResponsiveContainer width="50%" height="50%">
        <BarChart
          width={5}
          height={5}
          data={data4}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Branch.branchName" />
          <YAxis />
          <Tooltip
            dataKey={new Intl.NumberFormat("IND", {
              style: "currency",
              currency: "IDR",
            }).format("total_order")}
          />
          <Legend
            dataKey={new Intl.NumberFormat("IND", {
              style: "currency",
              currency: "IDR",
            }).format("total_order")}
          />
          <Bar dataKey={"total_order"} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="50%" height="50%">
        <BarChart
          width={5}
          height={5}
          data={data5}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Branch.branchName" />
          <YAxis />
          <Tooltip dataKey={"total_product"} />
          <Legend />
          <Bar dataKey={"total_product"} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
