import React from 'react'
import { logoutAdmin } from "../redux/admin/adminSlice";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
} from "@chakra-ui/react";
export const BranchComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem("tokenBranch");
    navigate("/loginAdmin");
  };
  return (
    <div>
    <h1>Branch Page</h1>
    <Button onClick={onLogout}>Logout</Button>
    </div>
  )
}
