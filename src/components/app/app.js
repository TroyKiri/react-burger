import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getIngredients } from "../../services/actions/ingredientsAction";

import { DELETE_INGREDIENT } from "../../services/actions/ingredientDetailsAction";
// dnd
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// стили для компонента App
import appStyles from "./app.module.css";
// подключение компонентов
import AppHeader from "../app-header/app-header.js";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";

import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

import { BURGER_CONSTRUCTOR, BURGER_INGREDIENT } from "../../utils/constants";

function App() {
  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (store) => store.ingredients
  );
  const dispatch = useDispatch();

  // открытие и закрытие модальных окон
  const [visible, setVisible] = useState({
    visibleOrder: false,
    visibleIngredient: false,
  });
  // при монтировании вешаем слушатель нажатия на ESC
  useEffect(() => {
    const escHnalder = (event) => event.key === "Escape" && closeModal();
    document.addEventListener("keydown", escHnalder);

    return () => document.removeEventListener("keydown", escHnalder);
  }, []);

  // открытие модальных окон
  const openModal = (target) => () => {
    if (target === BURGER_CONSTRUCTOR) {
      setVisible({
        visibleOrder: true,
        visibleIngredient: false,
      });
    } else if (target === BURGER_INGREDIENT) {
      setVisible({
        visibleOrder: false,
        visibleIngredient: true,
      });
    }
  };

  // закрытие модальных окон
  const closeModal = () => {
    setVisible({
      visibleOrder: false,
      visibleIngredient: false,
    });
    dispatch({ type: DELETE_INGREDIENT });
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <main className={`${appStyles.page}`}>
      <AppHeader />
      <section className={appStyles.main}>
        {ingredientsFailed ? (
          <p>Произошла ошибка при получении данных</p>
        ) : ingredientsRequest ? (
          <p>Загрузка...</p>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients openModal={openModal(BURGER_INGREDIENT)} />
            <BurgerConstructor openModal={openModal(BURGER_CONSTRUCTOR)} />
          </DndProvider>
        )}
      </section>

      {visible.visibleOrder && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
      {visible.visibleIngredient && (
        <Modal type={BURGER_INGREDIENT} onClose={closeModal}>
          <IngredientDetails />
        </Modal>
      )}
    </main>
  );
}

export default App;
