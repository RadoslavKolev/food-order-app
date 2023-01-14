import React from 'react';

import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals/Meals';
import Cart from './components/Cart/Cart/Cart';

const App = () => {
  return (
    <React.Fragment>
      <Cart />
      <Header />
      <main>
        <Meals />
      </main>
    </React.Fragment>
  );
}

export default App;
