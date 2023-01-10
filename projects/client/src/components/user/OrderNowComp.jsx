import { Box, Button, Image } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const OrderNowComp = () => {
  const navigate = useNavigate();

  const toLandingPage = () => {
    navigate("/");
  };

  return (
    <div>
      <Box>
        <Image
          src={`${process.env.REACT_APP_API_BASE_URL}/upload/PIMG-167331034678635995.png`}
        ></Image>
        <Button onClick={toLandingPage}>Order Now</Button>
      </Box>
    </div>
  );
};
