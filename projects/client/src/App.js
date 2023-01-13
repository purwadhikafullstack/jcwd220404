import { Routes, Route } from "react-router-dom";
import Axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "./redux/userSlice";
import { loginAdmin } from "./redux/adminSlice";
import { LandingPage } from "./pages/user/LandingPage";
import { AccountPage } from "./pages/user/AccountPage";
import { NotificationPage } from "./pages/user/NotificationPage";
import { TransactionPage } from "./pages/user/TransactionPage";
import { CategoryPage } from "./pages/user/CategoryPage";
import { CartPage } from "./pages/user/CartPage";
import { RegisterPage } from "./pages/user/RegisterPage";
import { VerificationPage } from "./pages/user/VerificationPage";
import { ProfilePage } from "./pages/user/ProfilePage";
import { AddressPage } from "./pages/user/AddressPage";
import { ForgotPasswordPage } from "./pages/user/ForgotPassPage";
import { ResetPassPage } from "./pages/user/ResetPassPage";
import { ChangePassword } from "./pages/user/ChangePassword";
import { ChangeEmail } from "./pages/user/ChangeEmail";
import { ListAddressPage } from "./pages/user/ListAddressPage";
import { RestrictedPage } from "./pages/403ResultPage";
import { LoginAdminPage } from "./pages/admin/LoginAdminPage";
import { AdminPage } from "./pages/admin/AdminPage";
import { UpdateAddressPage } from "./pages/user/UpdateAddressPage";
import { NotFoundPage } from "./pages/user/404ResultPage";
import { WindowComp } from "./components/user/WindowComp";
import { EnterComp } from "./components/user/EnterComp";

function App() {
  const dispatch = useDispatch();
  const tokenUser = localStorage.getItem("tokenUser");
  const tokenSuper = localStorage.getItem("tokenSuper");
  const tokenBranch = localStorage.getItem("tokenBranch");

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

      dispatch(
        loginUser({
          id: user.data.id,
          phoneNumber: user.data.phoneNumber,
          name: user.data.name,
          email: user.data.email,
          gender: user.data.gender,
          birthDate: user.data.birthDate,
          profilePic: user.data["Profile.profilePic"],
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const keepLoginSuper = async () => {
    try {
      const Super = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/admin/keepLogin`,
        {
          headers: {
            Authorization: `Bearer ${tokenSuper} `,
          },
        }
      );
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
      const Branch = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/admin/keepLogin`,
        {
          headers: {
            Authorization: `Bearer ${tokenBranch} `,
          },
        }
      );
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
        <Route path="/transaction" element={<TransactionPage />}></Route>
        <Route path="/category" element={<CategoryPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route
          path="/verification/:token"
          element={<VerificationPage />}
        ></Route>
        <Route path="/login-user" element={<EnterComp />}></Route>
        <Route path="/account" element={<AccountPage />}></Route>
        <Route path="/account/profile/:id" element={<ProfilePage />}></Route>
        <Route
          path="/account/profile/password"
          element={<ChangePassword />}
        ></Route>
        <Route path="/account/profile/email" element={<ChangeEmail />}></Route>
        <Route
          path="/account/address/:id"
          element={<ListAddressPage />}
        ></Route>
        <Route path="/account/address" element={<ListAddressPage />}></Route>
        <Route
          path="/account/address/add/:id"
          element={<AddressPage />}
        ></Route>
        <Route
          path="/account/address/update/:id"
          element={<UpdateAddressPage />}
        ></Route>
        <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
        <Route path="/reset-password/:token" element={<ResetPassPage />}></Route>
        <Route path="/restricted" element={<RestrictedPage />}></Route>
        <Route path="/login-admin" element={<LoginAdminPage />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
