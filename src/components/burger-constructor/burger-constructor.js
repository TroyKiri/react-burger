import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";

import { ADD_INGREDIENT_TO_CONSTRUCTOR } from "../../services/actions/constructorAction";
import { getOrderNumber } from "../../services/actions/orderAction";

import PropTypes from "prop-types";

import burgerConstructorStyles from "./burger-constructor.module.css";

import ConstructorItem from "../constructor-item/constructor-item";

import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor(props) {
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      dispatch({
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        item: ingredient,
      });
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const border = isHover && "2px solid #4C4CFF";

  const dispatch = useDispatch();

  const { bun, stuffing } = useSelector(
    (store) => store.constructorIngredients
  );

  const arrayOfStuffingId = stuffing.map((item) => item._id);
  const arrayOfIngredientsId = [...arrayOfStuffingId, bun._id];

  // Итоговая стоимость
  const priceOfStuffing = stuffing.reduce((prev, item) => {
    return (prev = prev + item.price);
  }, 0);
  const totalPrice = bun.price
    ? 2 * bun.price + priceOfStuffing
    : priceOfStuffing;

  function makeOrder() {
    // проверяем наличие булочки и хотя бы одной начинки
    !!stuffing.length &&
      !!Object.keys(bun).length &&
      dispatch(getOrderNumber(arrayOfIngredientsId, props.openModal));
  }

  return (
    <section
      className={`${burgerConstructorStyles.container} mr-9 pt-25`}
      ref={dropTarget}
      style={{ border }}
    >
      {!!Object.keys(bun).length && (
        <li className={`${burgerConstructorStyles.listElement} mr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
      )}

      {!!stuffing.length ? (
        <div className={burgerConstructorStyles.scrollbar}>
          <ul className={burgerConstructorStyles.listContainer}>
            {!!stuffing.length &&
              stuffing.map((item, index) => {
                return (
                  item.type !== "bun" && (
                    <ConstructorItem key={index} item={item} index={index} />
                  )
                );
              })}
          </ul>
        </div>
      ) : (
        <div className={burgerConstructorStyles.emtyContainer}></div>
      )}

      {!!Object.keys(bun).length && (
        <li className={`${burgerConstructorStyles.listElement} mr-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
      )}
      <div className={`${burgerConstructorStyles.orderContainer} mt-10 mr-4`}>
        <div className={`${burgerConstructorStyles.priceContainer} mr-10`}>
          <p className="text text_type_digits-medium mr-2">
            {totalPrice ? totalPrice : 0}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={makeOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
