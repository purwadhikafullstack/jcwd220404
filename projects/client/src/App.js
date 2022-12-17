import { Routes, Route } from "react-router-dom"
import { LandingPage } from "./pages/LandingPage";
import { AccountPage } from "./pages/AccountPage";
import { NotificationPage } from "./pages/NotificationPage";
import { TransactionPage } from "./pages/TransactionPage";
import { CategoryPage } from "./pages/CategoryPage";
import { CartPage } from "./pages/CartPage";
import { LoginPage } from "./pages/LoginPage";
import { ResetPassPage } from "./pages/ResetPasswordPage";
import { RegisterPage } from "./pages/RegisterPage";
import { VerificationPage } from "./pages/VerificationPage"
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import Axios from "axios";
import { login } from "./redux/userSlice"

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const keepLogin = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/user/keepLogin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data);
      dispatch(login({
        id: res.data.id,
        phoneNumber: res.data.phoneNumber,
        email: res.data.email,
        profilePic: res.data.profilePic,
        isVerified: res.data.isVerified,
      }));
    } catch (err) {
      console.log(err);
    }
  };

useEffect(() => {
  keepLogin()
})

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/notification" element={<NotificationPage/>}></Route>
        <Route path="/account" element={<AccountPage/>}></Route>
        <Route path="/transaction" element={<TransactionPage/>}></Route>
        <Route path="/category" element={<CategoryPage/>}></Route>
        <Route path="/cart" element={<CartPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
        <Route path="/verification/:token" element={<VerificationPage />} />
        <Route path="/resetpassword/:token" element={<ResetPassPage />} />
      </Routes>
    </div>
  );
}

export default App;
