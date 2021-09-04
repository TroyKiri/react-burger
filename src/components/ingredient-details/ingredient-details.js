import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ingredientDetailsStyles from "./ingredient-details.module.css";

import {
  CHOOSE_INGREDIENT,
  DELETE_INGREDIENT,
} from "../../services/actions/ingredientDetailsAction";

function IngredientDetails() {
  const dispatch = useDispatch();
  const { currentIngredient } = useSelector((store) => store);
  const { ingredients } = useSelector((store) => store.ingredients);
  const { ingredientId } = useParams();

  useEffect(() => {
    let choosenIngredient;
    if (!currentIngredient._id) {
      choosenIngredient = ingredients.filter(
        (item) => item._id === ingredientId
      )[0];
      choosenIngredient &&
        dispatch({
          type: CHOOSE_INGREDIENT,
          item: choosenIngredient,
        });
    }
    return () => dispatch({ type: DELETE_INGREDIENT });
  }, [ingredients]);

  return (
    <div className={ingredientDetailsStyles.container}>
      <img
        className={`${ingredientDetailsStyles.image} mb-4`}
        src={currentIngredient.image_large}
        alt={currentIngredient.name}
      />
      <h2 className="text text_type_main-medium mb-8">
        {currentIngredient.name}
      </h2>
      <ul className={`${ingredientDetailsStyles.list}`}>
        <li className={`${ingredientDetailsStyles.item} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentIngredient.calories}
          </p>
        </li>
        <li className={`${ingredientDetailsStyles.item} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentIngredient.proteins}
          </p>
        </li>
        <li className={`${ingredientDetailsStyles.item} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentIngredient.fat}
          </p>
        </li>
        <li className={`${ingredientDetailsStyles.item}`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {currentIngredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
