import { Routes, Route } from "react-router-dom";
import {
  Sidenav,
  DashboardNavbar,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import AddProducts from "@/pages/dashboard/AddProducts";
import ProductUpdate from '../pages/dashboard/UpdateProduct';
import SellerOrderDetails from "@/pages/dashboard/seller/SellerOrderDetails";
import SellerOrders from "@/pages/dashboard/seller/SellerOrders";
import { getDecodedToken, hasRole } from "../services/authService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const navigate = useNavigate();

  useEffect(()=>{
    const decodedToken = getDecodedToken();
    if (decodedToken) {
        const hasDefaultRole = hasRole(decodedToken, 'seller');
        console.log('user is :', hasDefaultRole);
        if(!hasDefaultRole){
          navigate('/login');
        }
    }else{
      navigate('/login');
    } 
  },[])

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        
        <Route path="/add-products" element={<AddProducts />}>
          {" "}
        </Route>
        <Route path="/update-product/:id" element={<ProductUpdate />}>
          {" "}
        </Route>
        <Route path="/order-details/:orderId" element={<SellerOrderDetails />}>
          {" "}
        </Route>
        </Routes>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
