import { Button } from "@chakra-ui/button";
import React, { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const CompleteButton = () => {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [data5, setData5] = useState();
  const [data6, setData6] = useState();
  const params = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/list/${params.id}`
      );
      setData(result.data);

      setData6(result.data.id);

      const selectedItem = result.data.totalOrder;
      const selectedCharge = result.data.totalCharge;

      let totalOrder = selectedItem + selectedCharge;
      setData2(totalOrder);

      const statusDone = result.data.status;
      setData5(statusDone);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const setDone = async () => {
    try {
      const result = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/setDone/${params.id}`
      );
      navigate("/transaction");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button w={"390px"} bgColor={"gold"} onClick={() => setDone()}>
        Complete Order
      </Button>
    </div>
  );
};
