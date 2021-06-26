import {
  DELETE_INGREDIENT,
  CHOOSE_INGREDIENT,
} from "../actions/ingredientDetailsAction";

const initialCurrentIngredient = {};

const ingredientDetailsReducer = (state = initialCurrentIngredient, action) => {
  switch (action.type) {
    case DELETE_INGREDIENT: {
      return initialCurrentIngredient;
    }
    case CHOOSE_INGREDIENT: {
      return action.item;
    }
    default: {
      return state;
    }
  }
};

export default ingredientDetailsReducer;
