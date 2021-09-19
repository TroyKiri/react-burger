import { useLocation, useHistory } from "react-router-dom";

import styles from "./state-of-order.module.css";
import ingredient from "./ingredient preview.png";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function StateOfOrder() {
  const location = useLocation();
  const history = useHistory();
  let background =
    (history.action === "PUSH" || history.action === "REPLACE") &&
    location.state &&
    location.state.background;

  return (
    <div className={`${styles.container} ${!background && styles.container_page}`}>
      <p className={`text text_type_digits-default mb-10`}>#034533</p>
      <h2 className={`text text_type_main-medium mb-3 ${styles.header}`}>Black Hole Singularity острый бургер</h2>
      <p className={`text text_type_main-default ${styles.status} mb-15`}>Выполнен</p>
      <p className={`text text_type_main-medium mb-6 ${styles.composition}`}>Состав:</p>
      <div className={`${styles.ingredients} mb-10`}>
        <div className={styles.scrollbar}>
          <div className={`${styles.ingredient_container}`}>
            <div className={`${styles.box}`}>
              <img src={ingredient} alt='' className={`mr-4`} />
              <p className={`text text_type_main-default ${styles.name}`}>Филе Люминесцентного тетраодонтимформа</p>
            </div>
            <div className={`${styles.price_of_one}`}>
              <p className={`text text_type_digits-default ${styles.amount_price} mr-2`}>1 x 300</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>

          <div className={`${styles.ingredient_container}`}>
            <div className={`${styles.box}`}>
              <img src={ingredient} alt='' className={`mr-4`} />
              <p className={`text text_type_main-default ${styles.name}`}>Филе Люминесцентного тетраодонтимформа</p>
            </div>
            <div className={`${styles.price_of_one}`}>
              <p className={`text text_type_digits-default ${styles.amount_price} mr-2`}>1 x 300</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>

          <div className={`${styles.ingredient_container}`}>
            <div className={`${styles.box}`}>
              <img src={ingredient} alt='' className={`mr-4`} />
              <p className={`text text_type_main-default ${styles.name}`}>Филе Люминесцентного тетраодонтимформа</p>
            </div>
            <div className={`${styles.price_of_one}`}>
              <p className={`text text_type_digits-default ${styles.amount_price} mr-2`}>1 x 300</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>

          <div className={`${styles.ingredient_container}`}>
            <div className={`${styles.box}`}>
              <img src={ingredient} alt='' className={`mr-4`} />
              <p className={`text text_type_main-default ${styles.name}`}>Филе Люминесцентного тетраодонтимформа</p>
            </div>
            <div className={`${styles.price_of_one}`}>
              <p className={`text text_type_digits-default ${styles.amount_price} mr-2`}>1 x 300</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>

          <div className={`${styles.ingredient_container}`}>
            <div className={`${styles.box}`}>
              <img src={ingredient} alt='' className={`mr-4`} />
              <p className={`text text_type_main-default ${styles.name}`}>Филе Люминесцентного тетраодонтимформа</p>
            </div>
            <div className={`${styles.price_of_one}`}>
              <p className={`text text_type_digits-default ${styles.amount_price} mr-2`}>1 x 300</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>

        </div>
      </div>
      <div className={`${styles.info}`}>
        <p className={`text text_type_main-default text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
        <div className={`${styles.container_price}`}>
          <p className={`text text_type_digits-default mr-2`}>480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default StateOfOrder;