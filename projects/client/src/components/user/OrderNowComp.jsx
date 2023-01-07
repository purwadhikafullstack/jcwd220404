import { Box, Button } from "@chakra-ui/react";
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
        <Button onClick={toLandingPage}>Order Now</Button>
      </Box>
    </div>
  );
};
