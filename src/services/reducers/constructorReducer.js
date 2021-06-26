import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  RESET_CONSTRUCTOR,
  MOVE_CONSTRUCTOR_ITEM,
} from "../actions/constructorAction";

const initialConstructorState = {
  stuffing: [],
  bun: {},
};

const constructorReducer = (state = initialConstructorState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_CONSTRUCTOR: {
      if (action.item.type === "bun") {
        return {
          ...state,
          bun: action.item,
        };
      } else {
        return {
          ...state,
          stuffing: [...state.stuffing, action.item],
        };
      }
    }

    case DELETE_INGREDIENT_FROM_CONSTRUCTOR: {
      return {
        ...state,
        stuffing: state.stuffing.filter(
          (item, index) => index !== action.index
        ),
      };
    }

    case RESET_CONSTRUCTOR: {
      return {
        ...initialConstructorState,
      };
    }
    case MOVE_CONSTRUCTOR_ITEM: {
      const dragIndex = action.dragIndex;
      const hoverIndex = action.hoverIndex;
      const arr = [...state.stuffing];

      const dragElement = arr[dragIndex];
      const hoverElement = arr[hoverIndex];

      arr[hoverIndex] = dragElement;
      arr[dragIndex] = hoverElement;

      return {
        ...state,
        stuffing: arr,
      };
    }

    default: {
      return state;
    }
  }
};

export default constructorReducer;
