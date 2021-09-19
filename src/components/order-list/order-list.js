import { Link, useLocation } from "react-router-dom";

import OrderCard from "../order-card/order-card";

import styles from './order-list.module.css';

function OrderList() {
  const location = useLocation();

  const isFeed = location.pathname.startsWith(`/feed`) ? true : false;

  const path = isFeed ? '/feed/1' : '/profile/orders/1';

  return (
    <section 
      style={{
        width: isFeed ? 600 : 860,
        marginTop: isFeed ? 0 : 40,
      }}>
      <div 
        className={styles.scrollbar}
        style={{
          height: isFeed ? 700 : 868,
        }}
      >
        <Link
          to={{
            pathname: path,
            state: { background: location },
          }}
          className={`${styles.link}`}
        >
          <OrderCard isFeed={isFeed}/>
        </Link>
        <Link
          to={{
            pathname: path,
            state: { background: location },
          }}
          className={`${styles.link}`}
        >
          <OrderCard isFeed={isFeed}/>
        </Link>
        <Link
          to={{
            pathname: path,
            state: { background: location },
          }}
          className={`${styles.link}`}
        >
          <OrderCard isFeed={isFeed}/>
        </Link>
        <Link
          to={{
            pathname: path,
            state: { background: location },
          }}
          className={`${styles.link}`}
        >
          <OrderCard isFeed={isFeed}/>
        </Link>
        <Link
          to={{
            pathname: path,
            state: { background: location },
          }}
          className={`${styles.link}`}
        >
          <OrderCard isFeed={isFeed}/>
        </Link>
      </div>
    </section>
  );
}

export default OrderList;