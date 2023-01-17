import React, { useContext, useEffect, useState } from 'react';

import CartIcon from '../../Cart/CartIcon/CartIcon';
import CartContext from '../../../context/cart-context';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [isHighlighted, setIsHighlighted] = useState(false)
  const cartContext = useContext(CartContext);

  // Finds the total amount of items in the cart
  const numberOfCartItems = cartContext.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount
  }, 0);

  const btnClasses = `${classes.button} ${isHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if (cartContext.items.length === 0) {
      return;
    }

    setIsHighlighted(true);

    const timer = setTimeout(() => {
      setIsHighlighted(false);
    }, 300);

    // Cleanup function
    return () => {
      clearTimeout(timer);
    };
  }, [cartContext.items]);

  return (
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