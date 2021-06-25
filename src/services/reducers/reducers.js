import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  RESET,
  ADDITION,
  DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  CHOOSE_INGREDIENT,
  DELETE_INGREDIENT,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  SWAP,
} from "../actions/actions";

//Исходное состояние
const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  constructorIngredients: {
    stuffing: [],
    bun: {},
    totalPrice: 0,
    ingredientsId: [],
  },
  currentIngredient: {},

  orderNumber: 0,
  orderNumberRequest: false,
  orderNumberFailed: false,
};

const ingredientReducer = (state = initialState, action) => {
  const bunPrice = 2 * state.constructorIngredients.bun.price; // стоимость булочек
  const stuffingPrice = state.constructorIngredients.stuffing.reduce(
    (prev, item) => {
      return (prev += item.price);
    },
    0
  ); // общая стоимость начинок
  const prevPrice = bunPrice ? stuffingPrice + bunPrice : stuffingPrice; // стоимость заказа до добавления очередного ингредиента

  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.ingredients,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    }
    case ADDITION: {
      if (action.item.type === "bun") {
        return {
          ...state,
          constructorIngredients: {
            ...state.constructorIngredients,
            bun: {
              ...action.item,
              countBun: 2,
            },
            totalPrice: bunPrice
              ? prevPrice - bunPrice + 2 * action.item.price
              : prevPrice + 2 * action.item.price,
            ingredientsId: [
              ...state.constructorIngredients.ingredientsId,
              action.item._id,
              action.item._id,
            ],
          },
        };
      } else {
        const countStuff = 1;
        return {
          ...state,
          constructorIngredients: {
            ...state.constructorIngredients,
            stuffing: [
              ...state.constructorIngredients.stuffing,
              {
                ...action.item,
                count: countStuff,
              },
            ],
            totalPrice: prevPrice + action.item.price,
            ingredientsId: [
              ...state.constructorIngredients.ingredientsId,
              action.item._id,
            ],
          },
        };
      }
    }
    case RESET: {
      return {
        ...state,
        constructorIngredients: initialState.constructorIngredients,
      };
    }
    case DELETE_INGREDIENT_FROM_CONSTRUCTOR: {
      return !!action.index ? {
        ...state,
        constructorIngredients: {
          ...state.constructorIngredients,
          stuffing: [
            ...state.constructorIngredients.stuffing.filter(
              (item, index) => index !== action.index
            ),
          ],
          totalPrice: !!state.constructorIngredients.stuffing.length
            ? prevPrice -
            state.constructorIngredients.stuffing.find(
              (item, index) => index === action.index
            ).price
            : 0,
        },
      } : state;
    }
    case CHOOSE_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.item,
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        currentIngredient: {},
      };
    }
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        orderNumberRequest: true,
      };
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        orderNumberRequest: false,
        orderNumberFailed: false,
        orderNumber: action.number,
      };
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        orderNumberRequest: false,
        orderNumberFailed: true,
      };
    }
    case SWAP: {
      const dragIndex = action.dragIndex;
      const hoverIndex = action.hoverIndex;
      const dragItem = state.constructorIngredients.stuffing[dragIndex];
      if (dragItem) {
        const arr = [...state.constructorIngredients.stuffing];

        const hoverItem = arr.splice(hoverIndex, 1, dragItem);
        arr.splice(dragIndex, 1, hoverItem[0])
        return {
          ...state,
          constructorIngredients: {
            ...state.constructorIngredients,
            stuffing: arr,
          },
        };
      } else {
        return state
      }


      // const hoverIndex = action.hoverIndex;

      // const dragElement = arr[dragIndex];
      // const hoverElement = arr[hoverIndex];

      // arr[hoverIndex] = dragElement;
      // arr[dragIndex] = hoverElement;
      // return {
      //   ...state,
      //   constructorIngredients: {
      //     ...state.constructorIngredients,
      //     stuffing: arr,
      //   },
      // };
    }
    default: {
      return state;
    }
  }
};

export default ingredientReducer;
