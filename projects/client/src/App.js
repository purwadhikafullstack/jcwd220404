import { Routes, Route } from "react-router-dom"
import { LandingPage } from "./pages/LandingPage";
import { AccountPage } from "./pages/AccountPage";
import { NotificationPage } from "./pages/NotificationPage";
import { TransactionPage } from "./pages/TransactionPage";
import { CategoryPage } from "./pages/CategoryPage";
import { CartPage } from "./pages/CartPage";
import { RegisterPage } from "./pages/RegisterPage";
import { VerificationPage } from "./pages/VerificationPage"

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/notification" element={<NotificationPage/>}></Route>
        <Route path="/account" element={<AccountPage/>}></Route>
        <Route path="/transaction" element={<TransactionPage/>}></Route>
        <Route path="/category" element={<CategoryPage/>}></Route>
        <Route path="/cart" element={<CartPage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
        <Route path="/verification/:token" element={<VerificationPage />}></Route>
        
      </Routes>
    </div>
  );
}

export default App;
