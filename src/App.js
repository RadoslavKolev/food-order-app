import React from 'react';

import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals/Meals';

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Meals />
      </main>
    </React.Fragment>
  );
}

export default App;
