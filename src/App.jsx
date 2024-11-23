import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import LandingPage from "./pages/user/LandingPage";
import ProductList from "./pages/user/ProductList";
import ProductDetails from "./pages/user/ProductDetails";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/" element={<LandingPage/>} />
      <Route path="/products" element={<ProductList/>}/>
      <Route path='/product-details/:id' element={<ProductDetails/>}></Route>
    </Routes>
  );
}

export default App;
