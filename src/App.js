import React, { useState } from 'react';

import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals/Meals';
import Cart from './components/Cart/Cart/Cart';

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
    <React.Fragment>
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </React.Fragment>
  );
}

export default App;
