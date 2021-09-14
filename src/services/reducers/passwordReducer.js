import { FORGOT_PASSWORD, RESET_PASSWORD } from "../actions/passwordAction";

const initialUserState = {
  forgotPasswordSuccess: false,
  resetPasswordSuccess: false,
};

const passwordReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD: {
      return {
        ...state,
        forgotPasswordSuccess: true,
      };
    }
    case RESET_PASSWORD: {
      return {
        ...state,
        resetPasswordSuccess: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default passwordReducer;
