import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(() => {
    const savedCount = sessionStorage.getItem('cartCount');
    return savedCount ? Math.max(0, parseInt(savedCount)) : 0;
  });

  // Update sessionStorage when cartCount changes
  useEffect(() => {
    sessionStorage.setItem('cartCount', cartCount.toString());
  }, [cartCount]);

  // Clear data when component unmounts
  useEffect(() => {
    return () => {
      sessionStorage.removeItem('cartCount');
    };
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
