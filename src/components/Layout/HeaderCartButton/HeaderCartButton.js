import React, { useContext, useEffect, useState } from 'react';

import CartIcon from '../../Cart/CartIcon/CartIcon';
import CartContext from '../../../context/cart-context';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const cartContext = useContext(CartContext);

  // Finds the total amount of items in the cart
  const numberOfCartItems = cartContext.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount
  }, 0);

  const btnClasses = `${classes.button} ${isHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    // If there are no items in the cart, it stops the function
    if (cartContext.items.length === 0) {
      return;
    }

    setIsHighlighted(true);

    const timer = setTimeout(() => {
      setIsHighlighted(false);
    }, 300);

    // Cleanup function - clears the timer
    return () => clearTimeout(timer);
  }, [cartContext.items]);

  return (
    // When the button is clicked - it shows the Cart and the Modal 
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>
        {numberOfCartItems}
      </span>
    </button>
  );
};

export default HeaderCartButton;