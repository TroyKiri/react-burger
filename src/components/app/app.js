import appStyles from './app.module.css';

import data from '../../utils/data';

import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';

function App() {
  return (
    <main className={appStyles.page}>
      <AppHeader />
      <section className={appStyles.main}>
        <BurgerIngredients data = {data} />
        <BurgerConstructor data = {data} />
      </section>
    </main>
  )
}

export default App;
