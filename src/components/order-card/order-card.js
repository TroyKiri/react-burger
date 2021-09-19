import { Link } from "react-router-dom";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './order-card.module.css';

import bun from './bun-01.png';


function OrderCard({ isFeed }) {
  const testArray = [bun, bun, bun, bun, bun, bun];


  return (
    <div className={`${styles.card} mb-4`} 
      style={{
        width: isFeed ? 584 : 844,
        height: isFeed ? 214 : 246,
      }}>
      <div className={`${styles.container_id} p-6`}>
        <p className={`text text_type_digits-default`}>#034535</p>
        <p className={`text text_type_main-default text_color_inactive`}>Сегодня, 16:20 i-GMT+3</p>
      </div>
      <h2 className={`text text_type_main-medium pr-6 pl-6`}>Death Star Starship Main бургер</h2>
      {!isFeed && <p className={`text text_type_main-default pt-2 pr-6 pl-6`}>Создан</p>}
      <div className={`${styles.container} pt-6 pb-6 pr-6 pl-6`}>
        <div className={`${styles.container_ingredient}`}>
          {testArray.map((item, index, array) => {
            return <img
              key={index}
              className={`${styles.image}`}
              src={item}
              alt='bun'
              style={{
                zIndex: array.length - index,
                left: 48 * index,
              }}
            />
          })}
        </div>
        <div className={`${styles.container_price}`}>
          <p className={`text text_type_digits-default mr-2`}>480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default OrderCard;