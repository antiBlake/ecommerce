import { AnimatePresence } from "framer-motion";
import React, { useContext, createContext } from "react";
import { useState } from "react";
import ShoppingCartOverlay from "../components/ShoppingCart/shoppingCartOverlay";

const ShoppingCartContext = createContext();

export const useShoppingCart = () => useContext(ShoppingCartContext);

export const ShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  function getItemQuantity(id) {
    const data = cartItems.find((item) => {
      return item._id == id;
    })?.quantity;
    return data;
  }

  function getTotalCartPrice() {
    return cartItems.reduce((prev, curr) => {
      return prev + curr.totalPrice;
    }, 0);
  }

  function getCartQuantity() {
    return cartItems.length;
  }

  function removeFromCart(id) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item._id !== id);
    });
  }

  function modifyItemQuantity(productInfo, productQuantity) {
    setCartItems((currentItems) => {
      if (currentItems?.find((item) => item._id === productInfo._id) == null) {
        return [
          ...currentItems,
          {
            ...productInfo,
            quantity: productQuantity,
            totalPrice:
              productInfo.defaultProductVariant.price * productQuantity,
          },
        ];
      } else {
        return currentItems.map((item) => {
          if (item._id == productInfo._id) {
            return {
              ...item,
              quantity: productQuantity,
              totalPrice:
                productInfo.defaultProductVariant.price * productQuantity,
            };
          } else {
            return item;
          }
        });
      }
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        modifyItemQuantity,
        getItemQuantity,
        getCartQuantity,
        cartOpen,
        cartItems,
        setCartOpen,
        removeFromCart,
        getTotalCartPrice,
      }}
    >
      <AnimatePresence>{cartOpen && <ShoppingCartOverlay />}</AnimatePresence>
      {children}
    </ShoppingCartContext.Provider>
  );
};
