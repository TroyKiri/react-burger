//Исходное состояние
const initialState = {
  ingredients: [],
  constructorIngrediens: {
    stuffing: [],
    bun: {},
    totalPrice: 0
  },
  currentIngredient: {},
  orderInfo: []
}

const ingredientReducer = (state = initialState, action) => {
  console.log('test')
  return state
}

export default ingredientReducer;