import React, { useContext } from 'react';

import MealItemForm from '../MealItemForm/MealItemForm';
import CartContext from '../../../context/cart-context';

import classes from './MealItem.module.css';

const MealItem = ({ id, name, description, price }) => {
  const cartContext = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartContext.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price
    });
  };
  
  price = `$${price.toFixed(2)}`; // Formatted price

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>
          {description}
        </div>
        <div className={classes.price}>
          {price}
        </div>
      </div>

      <div>
        <MealItemForm 
          id={id} 
          onAddToCart={addToCartHandler} 
        />
      </div>
    </li>
  );
};

export default MealItem;