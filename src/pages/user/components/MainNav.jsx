import React, { useEffect, useState } from "react";
import { Badge, IconButton, Avatar, Select } from "@material-tailwind/react";
import { HomeIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import MainNavSide from "./MainNavSide";
import {  getSearchProducts } from "../services/productServices";
import UserDropdown from "./UserDropdown";
import logoImg from "../../../../public/img/log_img.png";
import { jwtDecode } from "jwt-decode";
import  { useCart } from "../cartProvider";
import { getUsername } from "@/services/authService";

const MainNav = ({ getSearchResults,cartTotal }) => {
  const navigate = useNavigate();
  // const [cartCount, setCartCount] = useState(0);
  const [userName, setUserName] = useState('');
  const [buyerID, setBuyerID] = useState('');
  const [isUserLogged, setIsUserLogged] = useState(false);
  const email = getUsername(); 
  const { cartCount } = useCart();
  // const getCartTotal = () => {
  //   return localStorage.getItem('cartTotal') || 0;
  // }
  // Usage example in another component:
// const [cartNumber, setCartNumber] = useState(getCartTotal());

// To keep it in sync, use useEffect
// useEffect(() => {
//   const total = getCartTotal();
//   setCartNumber(total);
// }, [cartTotal]); // Add dependencies if needed

  // const cartNumber = cartTotal?cartTotal:0;
  // useEffect(() => {
  //   try {
  //     const token = sessionStorage.getItem('jwtToken');
  //     const decodedData = jwtDecode(token);
  //     setUserName(decodedData.email);
  //     if (decodedData) {
  //       setIsUserLogged(true);
  //     }
  //     if (decodedData.role == 'User') {
  //       setBuyerID(decodedData.email);
  //     }
  //     console.log(decodedData.email)
  //   } catch (error) {
  //     console.error('Error fetching orders:', error);
  //   }
  // }, []);

  const handleSearch = async (searchTerm) => {
    try {
      console.log()
      // Fetch search results
      navigate(`/products?search=${searchTerm}`);
      const results = await getSearchProducts(searchTerm);
      // Pass search results to ProductList
      getSearchResults(results);
      // Navigate to /products with search term as query param

    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // useEffect(() => {
  //   const fetchCartItems = async () => {
  //     try {
  //       const cartItems = await cartItems(email);
  //       setCartCount(cartItems.length);
  //     } catch (error) {
  //       console.error('Error fetching shopping cart items:', error);

  //     }
  //   };
  //   fetchCartItems();
  // }, [buyerID]);

  const handleOrders =  async ()=>{
    const token = sessionStorage.getItem('jwtToken');
    const decodedData= jwtDecode(token);
    const role = decodedData.resource_access.EADclient.roles[0];
    if(role == "buyer"){
      navigate('/buyer/orders');
    }
    if(role == "seller"){
      navigate('/dashboard/my-orders');
    }
  }

  return (
    <>
      <div className=" md:grid grid-cols-4 gap-0 px-4 py-2">
        <div className="">
          {/* image */}
          <div className="w-50 max-w-full px-8 ">
            <a href="/#" className="block w-full">
              <img
                src={logoImg}
                alt="logo"
                className="dark:hidden"
              />
            </a>
          </div>
        </div>
        <div className="  md:col-span-3">
          <div className="grid grid-rows-2 ">
            <div>
              {/* delivery */}
              <div className="flex justify-between">
                {/* nsv link section */}

                <ul className="block lg:flex items-start text-sm">
                  <ListItem NavLink="/#">Home</ListItem>
                  <ListItem NavLink="/#">About</ListItem>
                  <ListItem  onClick={handleOrders}>My Orders</ListItem>
                  <ListItem NavLink="/#">Offers</ListItem>
                </ul>
              </div>
            </div>
            <div>
              {/* signup and search */}
              <div className="flex items-center justify-end px-4 ">
                <SearchBar onSearch={handleSearch} />
                <div className="hidden justify-end pr-16 gap-3 sm:flex lg:pr-0 items-center ">
                  <Badge content={cartCount} color="green" className="mx-3">

                    <IconButton color="gray" variant="outlined" className="rounded-full"
                      onClick={() => navigate("/cart")}
                    >
                      <ShoppingCartIcon className="h-3 w-3" />
                    </IconButton>
                  </Badge>
                  {
                    isUserLogged ?
                      <>
                        <div className="w-28 flex items-center">
                          <UserDropdown userName={userName} />
                        </div>
                      </>
                      :
                      <>
                        <div className="flex gap-3">
                          <Link to={"/login"} className='bg-transparent border-green-500 border rounded-full inline-flex items-center 
                                        justify-center py-2 px-8 text-center text-sm font-medium  text-green-500
                                        disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5'>
                            Login
                          </Link>
                        
                          <Link to={"/create"} className='bg-green-500 border-primary border w-full rounded-full inline-flex items-center 
                                        justify-center py-2 px-7 text-center text-sm font-medium   text-white hover:bg-primary/90
                                        disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5'>
                            SignUp
                          </Link>
                        </div>
                      </>
                  }
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default MainNav;

const ListItem = ({ children, NavLink }) => {
  return (
    <>
      <li>
        <a
          href={NavLink}
          className="flex py-0 text-base font-medium text-body-color hover:text-dark dark:text-dark-6 dark:hover:text-white lg:ml-12 lg:inline-flex"
        >
          {children}
        </a>
      </li>
    </>
  );
};
