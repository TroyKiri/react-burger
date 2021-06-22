import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/actions';

import PropTypes from 'prop-types';

import burgerIngredientsStyles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import CardIngredient from '../card-ingredient/card-ingredient.js';

//import { IngredientContext } from '../../services/ingredientContext';

function BurgerIngredients(props) {
  //const ingredientsData = React.useContext(IngredientContext);

  const { ingredients } = useSelector(store => store.ingredientReducer);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getIngredients())
  // }, []);

  const [current, setCurrent] = React.useState('rolls');

  return (
    <section className={`${burgerIngredientsStyles.ingredients} ml-5 mr-10`}>
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
          <div className={`${burgerIngredientsStyles.container} mr-4`}>
            {ingredients.map(item => {
              return item.type === 'bun' ? <CardIngredient item={item} key={item._id} chooseIngredient={props.chooseIngredient} openModal={props.openModal} /> : null;
            })}
          </div>
        </div>
        <div className={burgerIngredientsStyles.block}>
          <h2 className='text text_type_main-medium mt-2 mb-6'>Соусы</h2>
          <div className={`${burgerIngredientsStyles.container} mr-4`}>
            {ingredients.map(item => {
              return item.type === 'sauce' ? <CardIngredient item={item} key={item._id} chooseIngredient={props.chooseIngredient} openModal={props.openModal} /> : null;
            })}
          </div>
        </div>
        <div className={burgerIngredientsStyles.block}>
          <h2 className='text text_type_main-medium mt-2 mb-6'>Начинки</h2>
          <div className={`${burgerIngredientsStyles.container} mr-4`}>
            {ingredients.map(item => {
              return item.type === 'main' ? <CardIngredient item={item} key={item._id} chooseIngredient={props.chooseIngredient} openModal={props.openModal} /> : null;
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  chooseIngredient: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
}

export default BurgerIngredients;