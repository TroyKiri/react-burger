import { combineReducers } from "redux";

import ingredientReducer from "./reducers";
import constructorReducer from "./constructorReducer";
import ingredientsReducer from "./ingredientsReducer";
import ingredientDetailsReducer from "./ingredientDetailsReducer";

const rootReducer = combineReducers({
  constructorIngredients: constructorReducer,
  currentIngredient: ingredientDetailsReducer,
  ingredientReducer,
  ingredients: ingredientsReducer,
});

export default rootReducer;
