import { useState } from 'react';

import PropTypes from 'prop-types';
//проверка объекта с определенной структурой
import dataPropTypes from '../../utils/prop-types';

import burgerConstructorStyles from './burger-constructor.module.css';

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

function BurgerConstructor(props) {
  const [visible, setVisible] = useState(false)
  const [typeOfModal, setTypeOfModal] = useState('')
  const [ingredient, setIngredient] = useState({})

  const openModal =(id) => (event) => {
    let typeOfModal;
    // изменение свойства type состояния (окно с ингредиентом или с заказом в зависимости от события
    event.target.nodeName === 'BUTTON' ? typeOfModal = 'checkout-button' : typeOfModal = 'ingredient';
    // находим ингредиент в данных с API, который был выбран
    const ingredientItem = props.data.find(item => item._id === id);

    setVisible(true);
    setTypeOfModal(typeOfModal);
    setIngredient(ingredientItem)
    
    document.addEventListener('keydown', (event) => {
      event.key === 'Escape' && closeModal();
    });
  }

  const closeModal = () => {
    setVisible(false)
  }

  const modal = (
    <ModalOverlay onClose={closeModal} typeOfModal={typeOfModal} ingredient = {ingredient}/>
  );
  return (
    <section className={`${burgerConstructorStyles.container} mr-9 pt-25`}>
      <li className={`${burgerConstructorStyles.listElement} mr-4`} onClick={openModal('60b646daabc9290027b206d7')}>
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
            return (item.type !== 'bun' && item.name !== "Соус Spicy-X" && 
              <li key={item._id} className={`${burgerConstructorStyles.listElement} mr-2`} onClick={openModal(item._id)}>
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
      <li className={`${burgerConstructorStyles.listElement} mr-4`} onClick={openModal('60b646daabc9290027b206d7')}>
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
        <Button type="primary" size="medium" onClick={openModal()}>
          Оформить заказ
        </Button>
      </div>
      {visible && modal}
    </section>
    
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes).isRequired
}

export default BurgerConstructor;