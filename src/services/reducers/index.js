import { combineReducers } from "redux";

import constructorReducer from "./constructorReducer";
import ingredientsReducer from "./ingredientsReducer";
import ingredientDetailsReducer from "./ingredientDetailsReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  constructorIngredients: constructorReducer,
  currentIngredient: ingredientDetailsReducer,
  order: orderReducer,
  ingredients: ingredientsReducer,
});

export default rootReducer;
