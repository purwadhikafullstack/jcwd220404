import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { AccountPage } from "./pages/AccountPage";
import { NotificationPage } from "./pages/NotificationPage";
import { TransactionPage } from "./pages/TransactionPage";
import { CategoryPage } from "./pages/CategoryPage";
import { CartPage } from "./pages/CartPage";
import { RegisterPage } from "./pages/RegisterPage";
import { VerificationPage } from "./pages/VerificationPage";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "./redux/userSlice";
import { ProfilePage } from "./pages/ProfilePage";
import { AddressPage } from "./pages/AddressPage";
import { ForgotPasswordPage } from "./pages/ForgotPassPage";
import { ResetPassPage } from "./pages/ResetPassPage";
import { ChangePassword } from "./pages/ChangePassword";
import { ChangeEmail } from "./pages/ChangeEmail";

function App() {
  const dispatch = useDispatch();
  const tokenUser = localStorage.getItem("tokenUser");
  const keepLoginUser = async () => {
    try {
      const user = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/keepLogin`,
        {
          headers: {
            Authorization: `Bearer ${tokenUser} `,
          },
        }
      );
      console.log(user.data)
      dispatch(
        loginUser({
          id: user.data.id,
          phoneNumber: user.data.phoneNumber,
          name: user.data.name,
          email: user.data.email,
          gender: user.data.gender,
          birthDate: user.data.birthDate,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    tokenUser ? keepLoginUser() : console.log("Check Database");
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
        <Route
          path="/verification/:token"
          element={<VerificationPage />}
        ></Route>
        <Route path="/account/profile" element={<ProfilePage />}></Route>
        <Route path="/account/address" element={<AddressPage />}></Route>
        <Route path="/account/password" element={<ChangePassword />}></Route>
        <Route path="/account/email" element={<ChangeEmail />}></Route>
        <Route path="/forgotPassword" element={<ForgotPasswordPage />}></Route>
        <Route path="/resetPassword/:token" element={<ResetPassPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
