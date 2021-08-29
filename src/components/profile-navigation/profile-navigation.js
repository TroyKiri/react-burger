import { NavLink } from "react-router-dom";

import styles from "./profile-navigation.module.css";

function ProfileNavigation() {
  return (
    <nav className={`mb-20`}>
      <ul className={styles.lists}>
        <li className={styles.list}>
          <NavLink
            exact={true}
            to={{ pathname: "/profile" }}
            className={`text text_type_main-medium ${styles.link}`}
            activeClassName={`${styles.text_active}`}
          >
            Профиль
          </NavLink>
        </li>
        <li className={styles.list}>
          <NavLink
            exact={true}
            to={{ pathname: "/profile/orders" }}
            className={`text text_type_main-medium ${styles.link}`}
            activeClassName={`${styles.text_active}`}
          >
            История заказов
          </NavLink>
        </li>
        <li className={styles.list}>
          <NavLink
            exact={true}
            to={{ pathname: "/profile/exit" }}
            className={`text text_type_main-medium ${styles.link}`}
            activeClassName={`${styles.text_active}`}
          >
            Выход
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default ProfileNavigation;
