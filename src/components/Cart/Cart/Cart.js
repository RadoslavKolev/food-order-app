import React, { useContext } from 'react';

import Modal from '../../UI/Modal/Modal';
import CartContext from '../../../context/cart-context';
import CartItem from '../CartItem/CartItem';

import classes from './Cart.module.css';

const Cart = (props) => {
  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartContext.addItem({
      ...item,
      amount: 1
    });
  };

  const cartItemRemoveHandler = (id) => {

  };

  const cartItems = <ul className={classes['cart-items']}>
    {
      cartContext.items.map(item => (
        <CartItem 
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))
    }
  </ul>

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems} 
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;