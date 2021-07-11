import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// стили для компонента App
import appStyles from "./app.module.css";
// подключение компонентов
import AppHeader from "../app-header/app-header.js";
import MainPage from "../../pages/main-page";
import LoginPage from "../../pages/login-page";
import RegisterPage from "../../pages/register-page";

function App() {
  return (
    <main className={`${appStyles.page}`}>
      <AppHeader />
      <Router>
        <Switch>
          <Route path="/forgot-password" exact={true}>
            <h1>Восстановить пароль</h1>
          </Route>
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
