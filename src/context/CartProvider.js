import React, { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (prevState, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount = 
      prevState.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = 
      prevState.items.findIndex(item => item.id === action.item.id);

    const existingCartItem = prevState.items[existingCartItemIndex];
    let updatedItems;

    // If the item exists in the cart - change its amount
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };

      updatedItems=[...prevState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
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

    // If it's the last item in the Cart - remove it from the array
    if (existingItem.amount === 1) {
      updatedItems = prevState.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1
      };

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
      item: item
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