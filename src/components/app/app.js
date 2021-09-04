import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// стили для компонента App
import appStyles from "./app.module.css";
// подключение компонентов
import AppHeader from "../app-header/app-header.js";

import { ProtectedRoute } from "../protected-route";
import { ProtectedRouteAuth } from "../protected-route-auth";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWithRefresh } from "../../services/actions/authAction";

import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFound404,
  ProfilePage,
  MainPage,
} from "../../pages/index";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserWithRefresh());
  }, []);

  return (
    <main className={`${appStyles.page}`}>
      <Router>
        <AppHeader />
        <Switch>
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
          <Route path="/" exact={true}>
            <MainPage />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
