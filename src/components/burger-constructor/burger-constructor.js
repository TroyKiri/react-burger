import PropTypes from 'prop-types';
//проверка объекта с определенной структурой
import dataPropTypes from '../../utils/prop-types';

import burgerConstructorStyles from './burger-constructor.module.css';

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor(props) {
  return (
    <section className={`${burgerConstructorStyles.container} mr-9 pt-25`}>
      <li className={`${burgerConstructorStyles.listElement} mr-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
        />
      </li>
      <div className={burgerConstructorStyles.scrollbar}>
        <ul className={burgerConstructorStyles.listContainer}>
          {props.data.map((item) => {
            return (item.type !== 'bun' && 
              <li key={item._id} className={`${burgerConstructorStyles.listElement} mr-2`}>
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
      </div>
      <li className={`${burgerConstructorStyles.listElement} mr-4`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
        />
      </li>
      <div className={`${burgerConstructorStyles.orderContainer} mt-10 mr-4`}>
        <div className={`${burgerConstructorStyles.priceContainer} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={props.openModal}>
          Оформить заказ
        </Button>
      </div>
    </section>
    
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes).isRequired,
  openModal: PropTypes.func.isRequired
}

export default BurgerConstructor;