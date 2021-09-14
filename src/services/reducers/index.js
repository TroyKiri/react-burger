import { combineReducers } from "redux";

import constructorReducer from "./constructorReducer";
import ingredientsReducer from "./ingredientsReducer";
import ingredientDetailsReducer from "./ingredientDetailsReducer";
import orderReducer from "./orderReducer";

import authReducer from "./authReducer";
import passwordReducer from "./passwordReducer";

const rootReducer = combineReducers({
  constructorIngredients: constructorReducer,
  currentIngredient: ingredientDetailsReducer,
  order: orderReducer,
  ingredients: ingredientsReducer,
  auth: authReducer,
  password: passwordReducer,
});

export default rootReducer;
