import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { AccountPage } from "./pages/AccountPage";
import { NotificationPage } from "./pages/NotificationPage";
import { TransactionPage } from "./pages/TransactionPage";
import { CategoryPage } from "./pages/CategoryPage";
import { CartPage } from "./pages/CartPage";
import { RegisterPage } from "./pages/RegisterPage";
import { VerificationPage } from "./pages/VerificationPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "./redux/userSlice";
import {loginAdmin} from "./redux/admin/adminSlice"
import { ProfilePage } from "./pages/ProfilePage";
import { AddressPage } from "./pages/AddressPage";
import { NotFoundPage } from "./pages/404ResultPage";
import Axios from "axios";
import { ForgotPasswordPage } from "./pages/ForgotPassPage";
import { ResetPassPage } from "./pages/ResetPassPage";
import { EnterComp } from "./components/EnterComp";
import { LoginAdminPage } from "./pages/LoginAdminPage";
import { AdminPage } from "./pages/AdminPage";


const url2 = `http://localhost:8000/user/keepLogin`;

const url1 = `http://localhost:8000/admin/keepLogin`;

function App() {
  const dispatch = useDispatch();
  const tokenUser = localStorage.getItem("tokenUser");
  const tokenSuper = localStorage.getItem("tokenSuper");
  const tokenBranch = localStorage.getItem("tokenBranch");
  
  const keepLoginUser = async () => {
    try {
      const user = await Axios.get(url2, {
        headers: {
          Authorization: `Bearer ${tokenUser} `,
        },
      });
      dispatch(
        loginUser({
          phoneNumber: user.data.phoneNumber,
          name: user.data.name,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const keepLoginSuper = async () => {
    try {
      const Super = await Axios.get(url1, {
        headers: {
          Authorization: `Bearer ${tokenSuper} `,
        },
      });
      dispatch(
        loginAdmin({
          username: Super.data.username,
          email: Super.data.email,
          isSuper: Super.data.isSuper,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const keepLoginBranch = async () => {
    try {
      const Branch = await Axios.get(url1, {
        headers: {
          Authorization: `Bearer ${tokenBranch} `,
        },
      });
      dispatch(
        loginAdmin({
          username: Branch.data.username,
          email: Branch.data.email,
          isSuper: Branch.data.isSuper,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    tokenUser ? keepLoginUser() : console.log("Check Database");
  }, []);

  
  useEffect(() => {
    tokenSuper ? keepLoginSuper() : console.log("Check Database");
  }, []);

  useEffect(() => {
    tokenBranch ? keepLoginBranch() : console.log("Check Database");
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/notification" element={<NotificationPage />}></Route>
        <Route path="/account" element={<AccountPage />}></Route>
        <Route path="/transaction" element={<TransactionPage />}></Route>
        <Route path="/category" element={<CategoryPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<EnterComp />}></Route>
        <Route path="/notfound" element={<NotFoundPage />}></Route>
        <Route path="/verification/:token" element={<VerificationPage />}></Route>
        <Route path="/account/profile" element={<ProfilePage />}></Route>
        <Route path="/account/address" element={<AddressPage />}></Route>
        <Route path="/forgotPassword" element={<ForgotPasswordPage/>}></Route>
        <Route path="/resetPassword/:token" element={<ResetPassPage/>}></Route>
        <Route path="/loginAdmin" element={<LoginAdminPage/>}></Route>
        <Route path="/AdminPage" element={<AdminPage/>}></Route>
        
      </Routes>
    </div>
  );
}

export default App;