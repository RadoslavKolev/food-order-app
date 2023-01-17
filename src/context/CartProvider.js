import React, { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// Reducer function which runs when we dispatch an action in useReducer()
const cartReducer = (prevState, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount = 
      prevState.totalAmount + action.item.price * action.item.amount;

    // Finds the first index of the item, who triggered the action
    const existingCartItemIndex = 
      prevState.items.findIndex(item => item.id === action.item.id);

    // Get the item (object)
    const existingCartItem = prevState.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      // If the item exists in the cart - change its amount
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };

      // Copy the items and change the updated item via the index
      updatedItems = [...prevState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // If the item doesn't exist in the cart - add in the array
      updatedItems = prevState.items.concat(action.item);
    }
    
    // Returns the new state snapshot
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  } else if (action.type === 'REMOVE') {
    const existingCartItemIndex = 
      prevState.items.findIndex(item => item.id === action.id);
    
    const existingItem = prevState.items[existingCartItemIndex];
    const updatedTotalAmount = prevState.totalAmount - existingItem.price;

    let updatedItems;

    if (existingItem.amount === 1) {
      // If it's the last item in the Cart - remove it from the array
      updatedItems = prevState.items.filter(item => item.id !== action.id);
    } else {
      // If the item occurs more than once - decrease its amount
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1
      };

      // Copy the items and change the updated item via the index
      updatedItems = [...prevState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    // Returns the new state snapshot
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: 'ADD',  
      item: item  // Object
    });
  };

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({
      type: 'REMOVE',
      id: id
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;