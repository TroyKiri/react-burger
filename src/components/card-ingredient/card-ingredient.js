import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import cardIngrStyles from "./card-ingredient.module.css";

import { CHOOSE_INGREDIENT } from "../../services/actions/ingredientDetailsAction";

//проверка объекта с определенной структурой
import dataPropTypes from "../../utils/prop-types";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

function CardIngredient(props) {
  const location = useLocation();

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ...props.item },
  });

  const { _id: bunId } = useSelector(
    (store) => store.constructorIngredients.bun
  );
  const { stuffing } = useSelector((store) => store.constructorIngredients);

  // массив одинаковых ингредиентов
  const stuff = useMemo(
    () =>
      stuffing.length && stuffing.filter((item) => item._id === props.item._id),
    [stuffing]
  );
  const countStuff = useMemo(() => (stuff ? stuff.length : 0), [stuff]);

  const dispatch = useDispatch();

  const renderIngredient = () => {
    props.openModal();
    dispatch({
      type: CHOOSE_INGREDIENT,
      item: props.item,
    });
  };
  const ingredientId = props.item._id;
  return (
    <Link
      key={ingredientId}
      to={{
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location },
      }}
      className={cardIngrStyles.link}
    >
      <div className={`${cardIngrStyles.card} mb-8`} onClick={renderIngredient}>
        <div className={cardIngrStyles.container} ref={dragRef}>
          <img
            className="mb-1"
            src={props.item.image}
            alt={props.item.name}
          ></img>
          <div className={cardIngrStyles.price}>
            <p className="text text_type_digits-default mr-1">
              {props.item.price}
            </p>
            <CurrencyIcon />
          </div>
          <h3 className="text text_type_main-default mt-1 mb-6">
            {props.item.name}
          </h3>
        </div>
        {props.item.type === "bun" && props.item._id === bunId && (
          <Counter count={2} size="default" />
        )}
        {!!countStuff && <Counter count={countStuff} size="default" />}
      </div>
    </Link>
  );
}

CardIngredient.propTypes = {
  item: dataPropTypes.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default CardIngredient;
