import { useState, useEffect, useReducer } from 'react';

import appStyles from './app.module.css';

import DATA_ID from '../../utils/constants';

import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { IngredientContext, ChoosenIngredientContext } from '../../services/ingredientContext';

const BURGER_CONSTRUCTOR = 'burger-constructor';
const BURGER_INGREDIENT = 'burger-ingredient';

function reducerIngredients(state, action) {
  switch (action.type) {
    case 'bun':
      // console.log(!!state.length);
      if (!state.length) {
        // console.log('test')
        return [...state, action]
      } else {
        state.map((item) => {
          if (item.type === 'bun') {
            console.log(item)
            return item = action
          }
        })
        console.log(state)
        return [...state]
      }
      // if (state.length) {
      //   state.map((item) => {
      //     if (item.type === 'bun') {
      //       item = action
      //   }
      //   return 
      // }
      // return [...state, action]
    default:
      console.log('дошел сюда')
      return [...state, action]
  }

}

function App() {
  // const choosenIngredientsState = useState([]);
  const choosenIngredientsState = useReducer(reducerIngredients, [], undefined);
  const [choosenIngredients] = choosenIngredientsState;
  console.log(choosenIngredients);

  const [ingredient, setIngredient] = useState({})

  const [visible, setVisible] = useState({
    visibleOrder: false,
    visibleIngredient: false
  })

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    res: {}
  })

  useEffect(()=>{
    const escHnalder = (event) => event.key === 'Escape' && closeModal();
    document.addEventListener('keydown', escHnalder);

    return () => document.removeEventListener('keydown', escHnalder);
  }, []);

  const chooseIngredient = (item) => {
    setIngredient(item)
  }

  const openModal = (target) => () => {
    if (target === BURGER_CONSTRUCTOR) {
      setVisible({
        visibleOrder: true,
        visibleIngredient: false
      });
    } else if (target === BURGER_INGREDIENT) {
      setVisible({
        visibleOrder: false,
        visibleIngredient: true
      });
    }
  }

  const closeModal = () => {
    setVisible({
      visibleOrder: false,
      visibleIngredient: false
    })
  }

  function getData() {
    setState({...state, isLoading:true})
    fetch(DATA_ID)
      .then(res => {
        return res.ok ? res : Promise.reject(res.status)
      })
      .then(res => res.json())
      .then(res => setState({...state, res, isLoading: false}))
      .catch(e => {
        console.log(`Ошибка: статус промиса: ${e}`);
        setState({...state, isLoading: false, hasError: true})
      })
  }

  useEffect(() => {
    getData()
  }, [])

  const data = state.res.data;
  const { isLoading, hasError } = state;

  return (
    <main className={`${appStyles.page} mb-10`}>
      <AppHeader />
      <IngredientContext.Provider value={data}>
        <ChoosenIngredientContext.Provider value={choosenIngredientsState}>
          <section className={appStyles.main}>
            {/* {!isLoading && !hasError && data && <BurgerIngredients data = {data} chooseIngredient={chooseIngredient} openModal={openModal(BURGER_INGREDIENT)} />} */}
            {!isLoading && !hasError && data && <BurgerIngredients chooseIngredient={chooseIngredient} openModal={openModal(BURGER_INGREDIENT)} />}
            {/* {!isLoading && !hasError && data && <BurgerConstructor data = {data} openModal={openModal(BURGER_CONSTRUCTOR)} />} */}
          
            {!isLoading && !hasError && data && <BurgerConstructor openModal={openModal(BURGER_CONSTRUCTOR)} />}
          
          </section>
        </ChoosenIngredientContext.Provider>

        {visible.visibleOrder && <Modal onClose={closeModal}><OrderDetails /></Modal>}
        {
          visible.visibleIngredient && 
          <Modal type={BURGER_INGREDIENT} onClose={closeModal}>
          <IngredientDetails {...ingredient} />
          </Modal>
        }
      </IngredientContext.Provider>
    </main>
  )
}

export default App;
