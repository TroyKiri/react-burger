import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
// стили для компонента App
import appStyles from "./app.module.css";
// подключение компонентов
import AppHeader from "../app-header/app-header.js";

import { ProtectedRoute } from "../protected-route";
import { ProtectedRouteAuth } from "../protected-route-auth";

import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFound404,
  ProfilePage,
  MainPage,
} from "../../pages/index";

import { BURGER_CONSTRUCTOR, BURGER_INGREDIENT } from "../../utils/constants";

import { DELETE_INGREDIENT } from "../../services/actions/ingredientDetailsAction";

import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getIngredients } from "../../services/actions/ingredientsAction";

function App() {
  const ModalSwitch = () => {
    const location = useLocation();
    const history = useHistory();
    let background =
      (history.action === "PUSH" || history.action === "REPLACE") &&
      location.state &&
      location.state.background;

    const dispatch = useDispatch();

    // открытие и закрытие модальных окон
    const [visible, setVisible] = useState({
      visibleOrder: false,
      visibleIngredient: false,
    });

    useEffect(() => {
      dispatch(getIngredients());
    }, []);
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
      history.replace("/");
      setVisible({
        visibleOrder: false,
        visibleIngredient: false,
      });
      dispatch({ type: DELETE_INGREDIENT });
    };

    return (
      <>
        <AppHeader />
        <Switch location={background || location}>
          <ProtectedRouteAuth path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </ProtectedRouteAuth>
          <ProtectedRouteAuth path="/register" exact={true}>
            <RegisterPage />
          </ProtectedRouteAuth>
          <ProtectedRouteAuth path="/login" exact={true}>
            <LoginPage />
          </ProtectedRouteAuth>
          <ProtectedRouteAuth path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </ProtectedRouteAuth>
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <Route path="/" exact>
            <MainPage openModal={openModal} />
          </Route>
          <Route path="/ingredients/:ingredientId" exact>
            <IngredientDetails />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>

        {visible.visibleOrder && (
          <Modal onClose={closeModal}>
            <OrderDetails />
          </Modal>
        )}
        {background && (
          <Route path="/ingredients/:ingredientId" exact>
            <Modal type={BURGER_INGREDIENT} onClose={closeModal}>
              <IngredientDetails />
            </Modal>
          </Route>
        )}
      </>
    );
  };

  return (
    <main className={`${appStyles.page}`}>
      <Router>
        <ModalSwitch />
      </Router>
    </main>
  );
}

export default App;
