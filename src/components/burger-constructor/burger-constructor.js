import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { useHistory } from "react-router-dom";

import { addIngredientToConstructor } from "../../services/actions/constructorAction";
import { getOrderNumber } from "../../services/actions/orderAction";

import PropTypes from "prop-types";

import burgerConstructorStyles from "./burger-constructor.module.css";

import ConstructorItem from "../constructor-item/constructor-item";

import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie } from "../../utils/cookie";

function BurgerConstructor(props) {
  const history = useHistory();

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      dispatch(addIngredientToConstructor({ ingredient }));
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

  const { orderNumberRequest } = useSelector((store) => store.order);

  // Итоговая стоимость
  const priceOfStuffing = useMemo(
    () =>
      stuffing.reduce((prev, item) => {
        return (prev = prev + item.price);
      }, 0),
    [stuffing]
  );
  const totalPrice = useMemo(
    () => (bun.price ? 2 * bun.price + priceOfStuffing : priceOfStuffing),
    [priceOfStuffing, bun]
  );

  function makeOrder() {
    const arrayOfStuffingId = stuffing.map((item) => item._id);
    const arrayOfIngredientsId = [...arrayOfStuffingId, bun._id];
    // проверяем наличие булочки и хотя бы одной начинки
    !!stuffing.length && !!Object.keys(bun).length && getCookie("accessToken")
      ? dispatch(getOrderNumber(arrayOfIngredientsId, props.openModal))
      : history.replace("/login");
  }

  const content = (
    <>
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
                    <ConstructorItem key={item.key} item={item} index={index} />
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
    </>
  );

  return (
    <section
      className={`${burgerConstructorStyles.container} mr-9 pt-25`}
      ref={dropTarget}
      style={{ border }}
    >
      {orderNumberRequest ? (
        <h1 className="text text_type_main-medium">Оформляем заказ...</h1>
      ) : (
        content
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
