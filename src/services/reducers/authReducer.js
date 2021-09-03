import {
  SIGN_UP,
  SIGN_IN,
  LOG_OUT,
  GET_USER,
  PATCH_USER,
} from "../actions/authAction";

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
    case GET_USER: {
      return {
        ...state,
        email: action.user.email,
        name: action.user.name,
      };
    }
    case PATCH_USER: {
      return {
        ...state,
        email: action.user.email,
        name: action.user.name,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        email: "",
        name: "",
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
