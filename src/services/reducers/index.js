import { combineReducers } from "redux";

import constructorReducer from "./constructorReducer";
import ingredientsReducer from "./ingredientsReducer";
import ingredientDetailsReducer from "./ingredientDetailsReducer";
import orderReducer from "./orderReducer";

import authReducer from "./authReducer";

const rootReducer = combineReducers({
  constructorIngredients: constructorReducer,
  currentIngredient: ingredientDetailsReducer,
  order: orderReducer,
  ingredients: ingredientsReducer,
  auth: authReducer,
});

export default rootReducer;
