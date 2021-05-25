import React from 'react';
import PropTypes from 'prop-types';

import appStyles from './app.module.css';

// import data from '../../utils/data';
import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';

function App(props) {
  return (
    <div className={appStyles.page}>
      <AppHeader />
      <section className={appStyles.main}>
        <BurgerIngredients data = {props.data} />
        <BurgerConstructor data = {props.data} />
      </section>
  </div>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired
}
BurgerConstructor.propTypes = {
  data: PropTypes.array.isRequired
}

export default App;
