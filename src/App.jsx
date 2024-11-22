import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import LandingPage from "./pages/user/LandingPage";
import BuyerOrders from "./pages/dashboard/buyer/BuyerOrders";
import SellerOrders from "./pages/dashboard/seller/SellerOrders";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/" element={<LandingPage/>} />


      {/*Orders*/}
      <Route path="/buyer-orders" element={<BuyerOrders/>} />
      <Route path="/seller-orders" element={<SellerOrders/>} />
    </Routes>
  );
}

export default App;
