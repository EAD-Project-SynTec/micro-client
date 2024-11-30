import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(() => {
    const savedCount = localStorage.getItem('cartCount');
    return savedCount ? parseInt(savedCount) : 0;
  });

  // Update localStorage when cartCount changes
  useEffect(() => {
    localStorage.setItem('cartCount', cartCount.toString());
  }, [cartCount]);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);