import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth, } from "@/layouts";
import LandingPage from "./pages/user/LandingPage";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import AddProducts from "./pages/dashboard/AddProducts";

function App() {
  return (
    <Routes>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/signup" element={<Signup/>}/>
      <Route path="/dashboard/*" element={<Dashboard />} />
      {/* <Route path="/dashboard/add-products" element={<AddProducts />} /> */}
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/" element={<LandingPage/>} />

    </Routes>
  );
}

export default App;
