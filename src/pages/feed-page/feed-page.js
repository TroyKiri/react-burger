import OrderInfo from "../../components/order-info/order-info";
import OrderList from "../../components/order-list/order-list";

import styles from './feed-page.module.css';

function FeedPage() {
  return (
    <section className={styles.feed}>
      <h1 className={`text text_type_main-large mt-10 mb-5`}>Лента заказов</h1>
      <div className={`${styles.container}`}>
        <OrderList />
        <OrderInfo />
      </div>
    </section>
  );
}

export default FeedPage;