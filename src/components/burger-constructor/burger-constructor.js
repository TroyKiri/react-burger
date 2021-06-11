import React from 'react';

import PropTypes from 'prop-types';
//проверка объекта с определенной структурой
import dataPropTypes from '../../utils/prop-types';

import burgerConstructorStyles from './burger-constructor.module.css';

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { ChoosenIngredientContext } from '../../services/ingredientContext';

function BurgerConstructor(props) {
  const [choosenIngredients] = React.useContext(ChoosenIngredientContext);
  
  const stuffing = choosenIngredients.stuffing;
  const bun = choosenIngredients.bun;
  const totalPrice = choosenIngredients.totalPrice;

  return (
    <section className={`${burgerConstructorStyles.container} mr-9 pt-25`}>
      {!!Object.keys(bun).length && <li className={`${burgerConstructorStyles.listElement} mr-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </li>}

      {!!stuffing.length ? (<div className={burgerConstructorStyles.scrollbar}>
        <ul className={burgerConstructorStyles.listContainer}>
          {!!stuffing.length && stuffing.map((item, index) => {
            return (item.type !== 'bun' && 
              <li key={index} className={`${burgerConstructorStyles.listElement} mr-2`}>
                <div className='mr-2'>
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  key={item._id} 
                />
              </li>)
          })}
        </ul>
      </div>) : <div className={burgerConstructorStyles.emtyContainer}></div>}

      {!!Object.keys(bun).length && <li className={`${burgerConstructorStyles.listElement} mr-4`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </li>}
      <div className={`${burgerConstructorStyles.orderContainer} mt-10 mr-4`}>
        <div className={`${burgerConstructorStyles.priceContainer} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={props.openModal}>
          Оформить заказ
        </Button>
      </div>
    </section>
    
  )
}

// BurgerConstructor.propTypes = {
//   data: PropTypes.arrayOf(dataPropTypes).isRequired,
//   openModal: PropTypes.func.isRequired
// }

export default BurgerConstructor;