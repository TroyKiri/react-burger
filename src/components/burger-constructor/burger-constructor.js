import { useState } from 'react';

import PropTypes from 'prop-types';
//проверка объекта с определенной структурой
import dataPropTypes from '../../utils/prop-types';

import burgerConstructorStyles from './burger-constructor.module.css';

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

function BurgerConstructor(props) {
  const [state, setState] = useState({
    visible: false,
    type: ''
  })
  const openModal = (event) => {
    let typeOfModal;
    // определение содержимого модального окна (окно заказа или окно ингредиента)
    event.target.nodeName === 'BUTTON' ? typeOfModal = 'checkout-button' : typeOfModal = 'ingredient';
    // меняю состояние
    setState({...state, visible:true, type:typeOfModal})

    // вешаю обработчик на document события keydown для ESC
    document.addEventListener('keydown', (event) => {
      event.key === 'Escape' && closeModal();
    });
    // обработчик события для закрытия окна при клике по overlay
    document.addEventListener('click', (event) => {
      //1ая проверка: клик не произошел по крестику
      !(event.target.localName === 'svg') && event.target.className.startsWith('modal-overlay') && closeModal()
    })
  }

  const closeModal = () => {
    setState({...state, visible:false})
  }

  const modal = (
    <ModalOverlay onClose={closeModal} {...state}/>
  );
  return (
    <section className={`${burgerConstructorStyles.container} mr-9 pt-25`}>
      <div className={`${burgerConstructorStyles.listElement} mr-4`} onClick={openModal}>
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
          {props.data.map((item) => {
            return (item.type !== 'bun' && item.name !== "Соус Spicy-X" && 
              <li key={item._id} className={`${burgerConstructorStyles.listElement} mr-2`} onClick={openModal}>
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
      <div className={`${burgerConstructorStyles.listElement} mr-4`} onClick={openModal}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
        />
      </div>
      <div className={`${burgerConstructorStyles.orderContainer} mt-10 mr-4`}>
        <div className={`${burgerConstructorStyles.priceContainer} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
      {state.visible && modal}
    </section>
    
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes).isRequired
}

export default BurgerConstructor;