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
  const bunPrice = 2*state.bun.price; // стоимость булочек
  const stuffingPrice = state.stuffing.reduce((prev, item) => {return prev+=item.price}, 0); // общая стоимость начинок
  const prevPrice = bunPrice ? stuffingPrice + bunPrice : stuffingPrice; // стоимость заказа до добавления очередного ингредиента

  switch (action.type) {
    case 'bun':
      // возвращаем стейт с новой булочкой и общей ценой
      return {
        ...state,
        bun: action,
        totalPrice: bunPrice ? prevPrice - bunPrice + 2*action.price : prevPrice + 2*action.price
      }
    default:
      // возвращаем стейт с новыми добавленными ингредиентами и общей цена
      return {
        ...state,
        stuffing: [...state.stuffing, action],
        totalPrice: prevPrice+action.price,
        }
  }

}

function App() {
  // выбранные ингредиенты
  const choosenIngredientsState = useReducer(reducerIngredients, {stuffing:[], bun:{}, totalPrice: 0}, undefined);
  // для открытия модалки с нужным ингредиентом
  const [ingredient, setIngredient] = useState({})
  // открытие и закрытие модальных окон
  const [visible, setVisible] = useState({
    visibleOrder: false,
    visibleIngredient: false
  })
  // стейт загруженных ингредиентов
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    res: {}
  })
  // при монтировании вешаем слушатель нажатия на ESC
  useEffect(()=>{
    const escHnalder = (event) => event.key === 'Escape' && closeModal();
    document.addEventListener('keydown', escHnalder);

    return () => document.removeEventListener('keydown', escHnalder);
  }, []);

  // изменения состояния для открытия модального окна с выбранным ингредиентом
  const chooseIngredient = (item) => {
    setIngredient(item)
  }
  // открытие модальных окон
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
  // закрытие модальных окон
  const closeModal = () => {
    setVisible({
      visibleOrder: false,
      visibleIngredient: false
    })
  }
  // получение данных с сервера
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
  // используем getData() при монтировании
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
            {!isLoading && !hasError && data && <BurgerIngredients chooseIngredient={chooseIngredient} openModal={openModal(BURGER_INGREDIENT)} />}
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
