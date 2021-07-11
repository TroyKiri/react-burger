import { v4 as uuidv4 } from "uuid";
// экшены для работы конструктора
export const ADD_INGREDIENT_TO_CONSTRUCTOR = "ADD_INGREDIENT_TO_CONSTRUCTOR";
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR =
  "DELETE_INGREDIENT_FROM_CONSTRUCTOR";
export const RESET_CONSTRUCTOR = "RESET_CONSTRUCTOR";

//dnd
export const MOVE_CONSTRUCTOR_ITEM = "MOVE_CONSTRUCTOR_ITEM";

export const moveConstructorItem = ({ dragIndex, hoverIndex }) => ({
  type: MOVE_CONSTRUCTOR_ITEM,
  dragIndex,
  hoverIndex,
});

export const addIngredientToConstructor = ({ ingredient }) => ({
  type: ADD_INGREDIENT_TO_CONSTRUCTOR,
  item: ingredient,
  key: uuidv4(),
});
