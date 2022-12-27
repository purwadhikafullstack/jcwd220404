import React from 'react'
import { logoutAdmin } from "../redux/admin/adminSlice";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
} from "@chakra-ui/react";

export const SuperComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem("tokenSuper");
    navigate("/loginAdmin");
  };
  return (
    <div>
    <h1>Super Page</h1>
    <Button onClick={onLogout}>Logout</Button>
    </div>
  )
}