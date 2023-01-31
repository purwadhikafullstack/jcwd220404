import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/user/LandingPage";
import { AccountPage } from "./pages/user/AccountPage";
import { RegisterPage } from "./pages/user/RegisterPage";
import { VerificationPage } from "./pages/user/VerificationPage";
import { ForgotPasswordPage } from "./pages/user/ForgotPassPage";
import { ResetPassPage } from "./pages/user/ResetPassPage";
import { ProfilePage } from "./pages/user/ProfilePage";
import { AddressPage } from "./pages/user/AddressPage";
import { CategoryPage } from "./pages/user/CategoryPage";
import { CartPage } from "./pages/user/CartPage";
import { TransactionPage } from "./pages/user/TransactionPage";
import { NotificationPage } from "./pages/user/NotificationPage";
import { ChangeEmail } from "./pages/user/ChangeEmail";
import { ChangePassword } from "./pages/user/ChangePassword";
import { NotFoundPage } from "./pages/user/404NotFoundPage";
import { LoginUserComp } from "./components/user/EnterComp";
import { LoginAdminPage } from "./pages/admin/LoginAdminPage";
import { AdminPage } from "./pages/admin/AdminPage";
import { ManagementBranchPage } from "./pages/admin/ManagementBranchPage";
import { ProductAdminPage } from "./pages/admin/ProductAdminPage";
import { CategoryAdminPage } from "./pages/admin/CategoryAdminPage";
import { InventoryAdminPage } from "./pages/admin/InventoryAdminPage";
import { TransactionAdminPage } from "./pages/admin/TransactionAdminPage";
import { DiscountAdminPage } from "./pages/admin/DiscountAdminPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "./redux/userSlice";
import { loginAdmin } from "./redux/adminSlice";
import Axios from "axios";
import { ListAddressPage } from "./pages/user/ListAddressPage";
import { UpdateAddressPage } from "./pages/user/UpdateAddressPage";
import { AddProductCategoryPage } from "./pages/admin/AddProductCategoryPage";
import { Checkout } from "./pages/user/CheckoutPage";
import { OrderSuccess } from "./pages/user/OrderSuccess";
import { ProductDetail } from "./pages/user/ProductDetailPage";
import { CategoryDetail } from "./pages/user/CategoryDetail";
import { OrderDetail } from "./pages/user/OrderDetail";

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
          id: Super.data.id,
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
          id: Branch.data.id,
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
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login-user" element={<LoginUserComp />}></Route>
        <Route path="/account" element={<AccountPage />}></Route>
        <Route path="/resetPassword/:token" element={<ResetPassPage />}></Route>
        <Route path="/forgotPassword" element={<ForgotPasswordPage />}></Route>
        <Route path="/category" element={<CategoryPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/transaction" element={<TransactionPage />}></Route>
        <Route path="/notification" element={<NotificationPage />}></Route>
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
          path="/account/address/addAddress/:id"
          element={<AddressPage />}
        ></Route>
        <Route
          path="/account/address/update/:id"
          element={<UpdateAddressPage />}
        ></Route>
        <Route path="/loginAdmin" element={<LoginAdminPage />}></Route>
        <Route path="/adminPage" element={<AdminPage />}></Route>
        <Route path="/adminPage/managementBranchPage" element={<ManagementBranchPage />}></Route>
        <Route
          path="/adminPage/productAdminPage"
          element={<ProductAdminPage />}
        ></Route>
        <Route
          path="/adminPage/productAdminPage/addProductCategory"
          element={<AddProductCategoryPage />}
        ></Route>
        <Route
          path="/adminPage/categoryAdminPage"
          element={<CategoryAdminPage />}
        ></Route>
        <Route
          path="/adminPage/inventoryAdminPage"
          element={<InventoryAdminPage />}
        ></Route>
        <Route
          path="/adminPage/transactionAdminPage"
          element={<TransactionAdminPage />}
        ></Route>
        <Route
          path="/adminPage/discountAdminPage"
          element={<DiscountAdminPage />}
        ></Route>
        <Route path="/*" element={<NotFoundPage />}></Route>
        <Route
          path="/verification/:token"
          element={<VerificationPage />}
        ></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route
          path="/checkout/payment/success"
          element={<OrderSuccess />}
        ></Route>
        <Route path="/product/:id" element={<ProductDetail />}></Route>
        <Route path="/category/:id" element={<CategoryDetail />}></Route>
        <Route path="/transaction/:id" element={<OrderDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;