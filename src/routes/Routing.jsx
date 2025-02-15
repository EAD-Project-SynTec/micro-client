import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  MyProducts,
  MyOrders,
  NewOrders,
  MyReviews,
  MyReturns,
  Profile,
} from "@/seller/SellerDashboard/dashboard";
import SelectCourier from "@/seller/SellerDashboard/dashboard/components/SelectCourier";
import OrderDetails from "@/seller/SellerDashboard/dashboard/components/OrderDetails";
import AddProducts from "@/seller/SellerDashboard/dashboard/AddProducts";
import UpdateProduct from "../pages/dashboard/UpdateProduct";
import ReturnProductDetails from "@/seller/SellerDashboard/dashboard/components/reviews/ReturnProductDetails";
import Review from "@/seller/SellerDashboard/dashboard/Review";
import ProductUpdate from "@/pages/dashboard/UpdateProduct";
import SellerOrderDetails from "@/pages/dashboard/seller/SellerOrderDetails";
const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/my-products" element={<MyProducts />}></Route>

        <Route path="/new-orders" element={<NewOrders />}>
          {" "}
        </Route>

        <Route path="/my-orders" element={<MyOrders />}>
          {" "}
        </Route>
        <Route path="/profile" element={<Profile/>}>
          {" "}
        </Route>
        <Route path="/my-reviews" element={<MyReviews />}>
          {" "}
        </Route>

        <Route path="/my-reviews/review/:id" element={<Review />}>
          {" "}
        </Route>

        <Route path="/my-returns" element={<MyReturns />}>
          {" "}
        </Route>

        <Route path="/my-returns/:id" element={<ReturnProductDetails />}>
          {" "}
        </Route>

        <Route path="/select-courier/:id" element={<SelectCourier />}>
          {" "}
        </Route>

        <Route path="/add-products" element={<AddProducts />}>
          {" "}
        </Route>
        <Route path="/update-product/:id" element={<ProductUpdate />}>
          {" "}
        </Route>
        <Route path="/orders-details/:orderId" element={<SellerOrderDetails/>}>
          {" "}
        </Route>

  
       
      </Routes>
    </>
  );
};

export default Routing;
