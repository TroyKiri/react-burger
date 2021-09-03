import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// стили для компонента App
import appStyles from "./app.module.css";
// подключение компонентов
import AppHeader from "../app-header/app-header.js";

import { ProtectedRoute } from "../protected-route";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWithRefresh } from "../../services/actions/authAction";
import { getCookie } from "../../utils/cookie";

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
    // dispatch(getUserWithRefresh());
  }, []);

  return (
    <main className={`${appStyles.page}`}>
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </Route>
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          {/* <Route path="/profile">
            <ProfilePage />
          </Route> */}
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
