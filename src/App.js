import React, { useState } from 'react';

import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals/Meals';
import Cart from './components/Cart/Cart/Cart';
import CartProvider from './context/CartProvider';

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);
 
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  // Or 1 function which switches between true and false
  // const cartHandler = () => {
  //   setCartIsShown((prevState) => !prevState);
  // };

  return (
    <CartProvider>
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
