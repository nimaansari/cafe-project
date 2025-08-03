import React, { createContext, useState } from 'react';

export const cartContext = createContext();

export const CartMaker = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <cartContext.Provider value={{ cartItems, addCart, clearCart }}>
            {children}
        </cartContext.Provider>
    );
};
