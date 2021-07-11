import { useSelector } from "react-redux";
import doneImage from "../../images/done.svg";

function OrderDetails() {
  const { orderNumber } = useSelector((store) => store.order);

  return (
    <>
      <p className="text text_type_digits-large mt-20 mb-8">{orderNumber}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img className="mb-15" src={doneImage} alt="done" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-20">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

export default OrderDetails;
