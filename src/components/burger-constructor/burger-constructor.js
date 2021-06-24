import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import { getOrderNumber, ADDITION, DELETE_INGREDIENT_FROM_CONSTRUCTOR } from '../../services/actions/actions';

import PropTypes from 'prop-types';

import burgerConstructorStyles from './burger-constructor.module.css';

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor(props) {
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      dispatch({
        type: ADDITION,
        item: ingredient
      })
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const border = isHover && '2px solid #4C4CFF';

  const { stuffing, bun, totalPrice, ingredientsId } = useSelector(store => store.ingredientReducer.constructorIngredients)
  const dispatch = useDispatch();

  function makeOrder() {
    // проверяем наличие булочки и хотя бы одной начинки
    !!stuffing.length && !!Object.keys(bun).length &&
      dispatch(getOrderNumber(ingredientsId, props.openModal))
  }

  function deleteIngredient(index) {
    dispatch({
      type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
      index: index
    })
  }

  return (
    <section className={`${burgerConstructorStyles.container} mr-9 pt-25`} ref={dropTarget} style={{ border }}>
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
                  handleClose={() => deleteIngredient(index)}
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
        <Button type="primary" size="medium" onClick={makeOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired
}

export default BurgerConstructor;