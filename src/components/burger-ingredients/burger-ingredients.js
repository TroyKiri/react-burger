import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import CardIngredient from '../card-ingredient/card-ingredient.js';

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('rolls');
  return (
    <section className={burgerIngredientsStyles.ingredients}>
      <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
      <div style={{ display: 'flex' }}>
        <Tab value="rolls" active={current === 'rolls'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="toppings" active={current === 'toppings'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={burgerIngredientsStyles.scrollbar}>
        <div className={burgerIngredientsStyles.block}>
          <h2 className='text text_type_main-medium mt-10 mb-6'>Булки</h2>
          <div className={burgerIngredientsStyles.container}>
            {props.data.map(item => {
              if (item.type==='bun') {return (<CardIngredient item={item} key={item._id} />)}
            })}
          </div>
        </div>
        <div className={burgerIngredientsStyles.block}>
          <h2 className='text text_type_main-medium mt-10 mb-6'>Соусы</h2>
          <div className={burgerIngredientsStyles.container}>
            {props.data.map(item => {
              if (item.type==='sauce') {return (<CardIngredient item={item} key={item._id} />)}
            })}
          </div>
        </div>
        <div className={burgerIngredientsStyles.block}>
          <h2 className='text text_type_main-medium mt-10 mb-6'>Начинки</h2>
          <div className={burgerIngredientsStyles.container}>
            {props.data.map(item => {
              if (item.type==='main') {return (<CardIngredient item={item} key={item._id} />)}
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BurgerIngredients;