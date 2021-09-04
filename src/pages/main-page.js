import { useSelector } from "react-redux";
// dnd
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// стили для компонента App
import mainPageStyles from "./main-page.module.css";
// подключение компонентов
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../components/burger-constructor/burger-constructor.js";

import { BURGER_CONSTRUCTOR, BURGER_INGREDIENT } from "../utils/constants";

function MainPage({ openModal }) {
  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (store) => store.ingredients
  );

  return (
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
  );
}

export default MainPage;
