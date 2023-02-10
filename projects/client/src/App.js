import { Routes, Route } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./redux/userSlice";
import { loginAdmin } from "./redux/adminSlice";
import { LandingPage } from "./pages/user/Landing";
import { AccountPage } from "./pages/user/Account";
import { NotificationPage } from "./pages/user/Notification";
import { TransactionPage } from "./pages/user/Transaction";
import { CategoryPage } from "./pages/user/Category";
import { CartPage } from "./pages/user/Cart";
import { RegisterPage } from "./pages/user/Register";
import { VerificationPage } from "./pages/user/Verification";
import { ProfilePage } from "./pages/user/Profile";
import { AddressPage } from "./pages/user/Address";
import { ForgotPasswordPage } from "./pages/user/ForgotPassword";
import { ResetPassPage } from "./pages/user/ResetPassword";
import { ChangePassword } from "./pages/user/ChangePassword";
import { ChangeEmail } from "./pages/user/ChangeEmail";
import { ListAddressPage } from "./pages/user/ListAddress";
import { RestrictedPage } from "./pages/403ResultPage";
import { LoginAdminPage } from "./pages/admin/Login";
import { AdminPage } from "./pages/admin/AdminPage";
import { UpdateAddressPage } from "./pages/user/UpdateAddress";
import { NotFoundPage } from "./pages/user/404Result";
import { EnterComp } from "./components/user/Enter";
import { Checkout } from "./pages/user/Checkout";
import { PaymentMethod } from "./pages/user/PaymentMethod";
import { OrderSuccess } from "./pages/user/OrderSuccess";
import { ProductDetail } from "./pages/user/ProductDetail";
import { CategoryDetail } from "./pages/user/CategoryDetail";
import { OrderDetail } from "./pages/user/OrderDetail";
import { ProductAdminPage } from "./pages/admin/Product";
import { CategoryAdminPage } from "./pages/admin/Category";
import { InventoryAdminPage } from "./pages/admin/Inventory";
import { TransactionAdminPage } from "./pages/admin/Transaction";
import { Discount } from "./pages/admin/Discount";
import { BranchAdminMgt } from "./pages/admin/BranchAdminMgt";
import { Sales } from "./pages/admin/Sales";
import { AddProductCategory } from "./pages/admin/AddProductCategory";
import { syncInventory } from "./redux/inventorySlice";
import { syncData } from "./redux/branchSlice";
import { InventorySuperPage } from "./pages/admin/InventorySuper";

function App() {
  const [data2, setData2] = useState() 
  const dispatch = useDispatch();
  const tokenUser = localStorage.getItem("tokenUser");
  const tokenSuper = localStorage.getItem("tokenSuper");
  const tokenBranch = localStorage.getItem("tokenBranch");
  const { id } = useSelector((state) => state.branchSlice.value);

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

  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (!"geolocation in navigator") {
      onError({
        code: 0,
        message: "geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);
  

  const getInv = async () => {
    try {
      const branch = {
        lattitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
      };
      const result = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/branch/byId`,
        branch
      );
      dispatch(syncData(result.data));
      console.log(result.data);
      setData2(result.data.id);
      console.log(result.data.id);
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    getInv();
  }, [location]);

  const getProduct = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/inventory/byBranchId/${data2}`
      );
      dispatch(syncInventory(res.data));
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  // const getBranch = async () => {
  //   try {
  //     const res = await Axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/branch/adminByBranch/${id}`
  //     );
  //     // setBranch(res.data);
  //     console.log(res.data)
  //     setData4(res.data.id);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getBranch();
  // }, [id]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/notification" element={<NotificationPage />}></Route>
        <Route path="/transaction" element={<TransactionPage />}></Route>
        <Route path="/category" element={<CategoryPage />}></Route>
        <Route path="/carts" element={<CartPage />}></Route>
        <Route path="/product/:id" element={<ProductDetail />}></Route>
        <Route path="/category/:id" element={<CategoryDetail />}></Route>
        <Route path="/transaction/:id" element={<OrderDetail />}></Route>
        <Route path="/checkout/:id" element={<Checkout />}></Route>
        <Route path="/checkout/success/:id" element={<OrderSuccess />}></Route>
        <Route path="/registers" element={<RegisterPage />}></Route>
        <Route
          path="/verification/:token"
          element={<VerificationPage />}
        ></Route>
        <Route path="/login-user" element={<EnterComp />}></Route>
        <Route path="/account" element={<AccountPage />}></Route>
        <Route path="/account/profile/:id" element={<ProfilePage />}></Route>
        <Route path="/account/profile/email" element={<ChangeEmail />}></Route>
        <Route
          path="/account/profile/password"
          element={<ChangePassword />}
        ></Route>
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
        <Route
          path="/reset-password/:token"
          element={<ResetPassPage />}
        ></Route>
        <Route path="/restricted" element={<RestrictedPage />}></Route>
        <Route path="/login-admin" element={<LoginAdminPage />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/*" element={<NotFoundPage />}></Route>
        <Route path="/admin/product" element={<ProductAdminPage />}></Route>
        <Route
          path="/admin/product/add"
          element={<AddProductCategory />}
        ></Route>
        <Route path="/admin/category" element={<CategoryAdminPage />}></Route>
        <Route path="/admin/inventory" element={<InventoryAdminPage />}></Route>
        <Route
          path="/admin/transaction"
          element={<TransactionAdminPage />}
        ></Route>
        <Route path="/admin/discount" element={<Discount />}></Route>
        <Route
          path="/admin/branch-management"
          element={<BranchAdminMgt />}
        ></Route>
        <Route path="/admin/sales" element={<Sales />}></Route>
        <Route path="/admin/inventory-super" element={<InventorySuperPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
