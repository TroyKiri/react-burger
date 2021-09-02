import { SIGN_UP, SIGN_IN, LOG_OUT } from "../actions/authAction";

const initialUserState = {
  email: "",
  name: "",
};

const authReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SIGN_UP: {
      return {
        ...state,
        email: action.user.email,
        name: action.user.name,
      };
    }
    case SIGN_IN: {
      return {
        ...state,
        email: action.user.email,
        name: action.user.name,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        email: '',
        name: '',
      };
    }
    // case GET_INGREDIENTS_SUCCESS: {
    //   return {
    //     ...state,
    //     ingredientsRequest: false,
    //     ingredientsFailed: false,
    //     ingredients: action.ingredients,
    //   };
    // }
    // case GET_INGREDIENTS_FAILED: {
    //   return {
    //     ...state,
    //     ingredientsRequest: false,
    //     ingredientsFailed: true,
    //   };
    // }
    default: {
      return state;
    }
  }
};

export default authReducer;
