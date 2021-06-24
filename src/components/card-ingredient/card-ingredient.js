import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";

import cardIngrStyles from "./card-ingredient.module.css";

import { ADDITION, CHOOSE_INGREDIENT } from "../../services/actions/actions";

//проверка объекта с определенной структурой
import dataPropTypes from "../../utils/prop-types";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

function CardIngredient(props) {
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { ...props.item, index: 0 },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  // количество булок
  const { countBun, name: nameBun } = useSelector(
    (store) => store.ingredientReducer.constructorIngredients.bun
  );
  // массив начинок
  const { stuffing } = useSelector(
    (store) => store.ingredientReducer.constructorIngredients
  );

  // массив одинаковых ингредиентов
  const stuff =
    stuffing.length && stuffing.filter((item) => item.name === props.item.name);

  const countStuff = stuff ? stuff.length : 0;

  const dispatch = useDispatch();

  const renderIngredient = () => {
    props.openModal();
    dispatch({
      type: CHOOSE_INGREDIENT,
      item: props.item,
    });

    // dispatch({
    //   type: ADDITION,
    //   item: props.item
    // })
  };

  return (
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
      {props.item.type === "bun" && props.item.name === nameBun && countBun && (
        <Counter count={countBun} size="default" />
      )}
      {!!countStuff && <Counter count={countStuff} size="default" />}
    </div>
  );
}

CardIngredient.propTypes = {
  item: dataPropTypes.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default CardIngredient;
