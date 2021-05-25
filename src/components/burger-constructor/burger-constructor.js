import React from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor(props) {
  return (
    <section className={burgerConstructorStyles.container + ' mr-9 pt-25'}>
      <div className={burgerConstructorStyles.listElement + ' mr-4'}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
        />
      </div>
      <div className={burgerConstructorStyles.scrollbar}>
        <ul className={burgerConstructorStyles.listContainer}>
          {props.data.map((item, index) => {
            if (item.type !== 'bun' && item.name !== "Соус Spicy-X") {
              return <li key={item._id} className={burgerConstructorStyles.listElement + ' mr-2'}>
                <div className='mr-2'>
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  key={item._id} 
                />
                </li>
            }
          })}
        </ul>
      </div>
      <div className={burgerConstructorStyles.listElement + ' mr-4'}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
        />
      </div>
      <div className={burgerConstructorStyles.orderContainer + ' mt-10 mr-4'}>
        <div className={burgerConstructorStyles.priceContainer + ' mr-10'}>
          <p className='text text_type_digits-medium mr-2'>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
    
  )
}

export default BurgerConstructor;