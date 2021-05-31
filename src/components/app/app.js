import { useState, useEffect } from 'react';

import appStyles from './app.module.css';

import DATA_ID from '../../utils/constants';

import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    res: {}
  })

  function getData() {
    setState({...state, isLoading:true})
    fetch(DATA_ID)
      .then(res => res.json())
      .then(res => setState({...state, res, isLoading: false}))
      .catch(e => setState({...state, isLoading: false, hasError: true}))
  }

  useEffect(() => {
    getData()
  }, [])

  const data = state.res.data;
  const { isLoading, hasError } = state;

  return (
    <main className={`${appStyles.page} mb-10`}>
      <AppHeader />
      <section className={appStyles.main}>
        {!isLoading && !hasError && data && <BurgerIngredients data = {data} />}
        {!isLoading && !hasError && data && <BurgerConstructor data = {data} />}
      </section>
    </main>
  )
}

export default App;
