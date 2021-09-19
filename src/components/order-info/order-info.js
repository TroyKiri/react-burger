import styles from './order-info.module.css';

function OrderInfo() {
  const doneArray = ['034533', '034533', '034533', '034533', '034533'];
  const workingArray = ['034533', '034533', '034533', '034533', '034533'];

  return (
    <section className={styles.info}>
      <div className={`${styles.container_status}`}>
        <div className={`${styles.container_done}`}>
          <h2 className={`text text_type_main-medium mb-6`}>Готовы:</h2>
          {doneArray.map((item, index) => {
            return <p className={`${styles.number_done} text text_type_digits-default mb-2`} key={index}>{item}</p>
          })}
        </div>
        <div className={`${styles.container_working}`}>
          <h2 className={`text text_type_main-medium mb-6`}>В работе:</h2>
          {workingArray.map((item, index) => {
            return <p className={`${styles.number_working} text text_type_digits-default mb-2`} key={index}>{item}</p>
          })}
        </div>
      </div>
      <h2 className={`text text_type_main-medium mt-15`}>Выполнено за все время:</h2>
      <p className={`${styles.amount}  text text_type_digits-large`}>28 752</p>
      <h2 className={`text text_type_main-medium mt-15`}>Выполнено за сегодня:</h2>
      <p className={`${styles.amount}  text text_type_digits-large`}>138</p>
    </section>
  );
}

export default OrderInfo;