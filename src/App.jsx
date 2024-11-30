import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth, } from "@/layouts";
import LandingPage from "./pages/user/LandingPage";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import AddProducts from "./pages/dashboard/AddProducts";

import BuyerOrders from "./pages/dashboard/buyer/BuyerOrders";
import SellerOrders from "./pages/dashboard/seller/SellerOrders";
import BuyerOrderDetails from "./pages/dashboard/buyer/BuyerOrderDetails";
import SellerOrderDetails from "./pages/dashboard/seller/SellerOrderDetails";
import ForgotPassword from "../src/pages/user/auth/ForgotPassword";
import ProductList from "./pages/user/ProductList";
import ProductDetails from "./pages/user/ProductDetails";
import AddToCart from "./pages/user/AddToCart";


function App() {
  return (
    <Routes>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      <Route path="/dashboard/*" element={<Dashboard />} />
      {/* <Route path="/dashboard/add-products" element={<AddProducts />} /> */}
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/" element={<LandingPage/>} />



      {/*Orders*/}
      <Route path="/dashboard/buyerOrders" element={<BuyerOrders/>} />
      <Route path="/dashboard/sellerOrders" element={<SellerOrders/>} />
      <Route path="/dashboard/buyerOrders/:orderId" element={<BuyerOrderDetails />} />
      <Route path="/dashboard/sellerOrders/:orderId" element={<SellerOrderDetails/>} />

      <Route path="/products" element={<ProductList/>}/>
      <Route path='/product-details/:id' element={<ProductDetails/>}></Route>
      <Route path="/cart" element={<AddToCart/>}/>

    </Routes>
  );
}

export default App;
