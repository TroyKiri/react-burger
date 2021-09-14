import { Link, useLocation } from "react-router-dom";

import headerStyles from "./app-header.module.css";

import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  const { pathname } = useLocation();

  const profilePage = pathname.startsWith("/profile");
  const lentaPage = pathname.startsWith("/lenta");
  const mainPage = pathname === "/";

  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.nav}>
        <ul className={headerStyles.list}>
          <li className={headerStyles.container}>
            <Link
              to={{ pathname: "/" }}
              className={`${headerStyles.container} pl-5 pr-5 pb-4 pt-4 mb-4 mt-4 mr-2`}
            >
              <BurgerIcon type={mainPage ? "primary" : "secondary"} />
              <p
                className={`text text_type_main-default ${
                  mainPage ? "" : "text_color_inactive"
                } pl-2`}
              >
                Конструктор
              </p>
            </Link>
            <Link
              to={{ pathname: "/lenta" }}
              className={`${headerStyles.container} pl-5 pr-5 pb-4 pt-4 mb-4 mt-4`}
            >
              <ListIcon type={lentaPage ? "primary" : "secondary"} />
              <p
                className={`text text_type_main-default ${
                  lentaPage ? "" : "text_color_inactive"
                } pl-2`}
              >
                Лента заказов
              </p>
            </Link>
          </li>
          <li className={headerStyles.container}>
            <Link
              to={{ pathname: "/profile" }}
              className={`${headerStyles.container} pl-5 pr-5 pb-4 pt-4 mb-4 mt-4`}
            >
              <ProfileIcon type={profilePage ? "primary" : "secondary"} />
              <p
                className={`text text_type_main-default ${
                  profilePage ? "" : "text_color_inactive"
                } pl-2`}
              >
                Личный кабинет
              </p>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={headerStyles.logo}>
        <Logo />
      </div>
    </header>
  );
}

export default AppHeader;
