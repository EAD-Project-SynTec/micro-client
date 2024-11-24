import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import LandingPage from "./pages/user/LandingPage";

import BuyerOrders from "./pages/dashboard/buyer/BuyerOrders";
import SellerOrders from "./pages/dashboard/seller/SellerOrders";
import BuyerOrderDetails from "./pages/dashboard/buyer/BuyerOrderDetails";
import SellerOrderDetails from "./pages/dashboard/seller/SellerOrderDetails";

import ProductList from "./pages/user/ProductList";


function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/" element={<LandingPage/>} />



      {/*Orders*/}
      <Route path="/dashboard/buyerOrders" element={<BuyerOrders/>} />
      <Route path="/dashboard/sellerOrders" element={<SellerOrders/>} />
      <Route path="/dashboard/buyerOrders/:orderId" element={<BuyerOrderDetails />} />
      <Route path="/dashboard/sellerOrders/:orderId" element={<SellerOrderDetails/>} />

      <Route path="/products" element={<ProductList/>}/>

    </Routes>
  );
}

export default App;
