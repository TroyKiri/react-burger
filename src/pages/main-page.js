import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory, Switch, Route } from "react-router-dom";

import { getIngredients } from "../services/actions/ingredientsAction";

import { DELETE_INGREDIENT } from "../services/actions/ingredientDetailsAction";
// dnd
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// стили для компонента App
import mainPageStyles from "./main-page.module.css";
// подключение компонентов
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../components/burger-constructor/burger-constructor.js";

import Modal from "../components/modal/modal";
import OrderDetails from "../components/order-details/order-details";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

import { BURGER_CONSTRUCTOR, BURGER_INGREDIENT } from "../utils/constants";

function MainPage({ openModal }) {
  // const ModalSwitch = () => {
  // const location = useLocation();
  // const history = useHistory();
  // let background = location.state && location.state.background;

  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (store) => store.ingredients
  );
  const dispatch = useDispatch();

  // // открытие и закрытие модальных окон
  // const [visible, setVisible] = useState({
  //   visibleOrder: false,
  //   visibleIngredient: false,
  // });
  // // при монтировании вешаем слушатель нажатия на ESC
  // useEffect(() => {
  //   const escHnalder = (event) => event.key === "Escape" && closeModal();
  //   document.addEventListener("keydown", escHnalder);

  //   return () => document.removeEventListener("keydown", escHnalder);
  // }, []);

  // // открытие модальных окон
  // const openModal = (target) => () => {
  //   if (target === BURGER_CONSTRUCTOR) {
  //     setVisible({
  //       visibleOrder: true,
  //       visibleIngredient: false,
  //     });
  //   } else if (target === BURGER_INGREDIENT) {
  //     setVisible({
  //       visibleOrder: false,
  //       visibleIngredient: true,
  //     });
  //   }
  // };

  // // закрытие модальных окон
  // const closeModal = () => {
  //   history.goBack();
  //   setVisible({
  //     visibleOrder: false,
  //     visibleIngredient: false,
  //   });
  //   dispatch({ type: DELETE_INGREDIENT });
  // };

  // useEffect(() => {
  //   dispatch(getIngredients());
  // }, []);

  return (
    <>
      {/* <Switch location={background || location}> */}
      {/* <Route path="/" exact> */}
      <section className={mainPageStyles.main}>
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
      {/* </Route> */}
      {/* <Route path="/ingredients/:ingredientId" exact>
            <IngredientDetails />
          </Route> */}
      {/* </Switch> */}

      {/* {visible.visibleOrder && (
          <Modal onClose={closeModal}>
            <OrderDetails />
          </Modal>
        )}
        {background && (
          <Route path="/ingredients/:ingredientId" exact>
            {visible.visibleIngredient && (
              <Modal type={BURGER_INGREDIENT} onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            )}
          </Route>
        )} */}

      {/* {visible.visibleIngredient && (
          <Modal type={BURGER_INGREDIENT} onClose={closeModal}>
            <IngredientDetails />
          </Modal>
        )} */}
    </>
  );
  // };

  // return <ModalSwitch />;
}

export default MainPage;
