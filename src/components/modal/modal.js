import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

function Modal(props) {
  return (
      <div className={modalStyles.popup}>
        {props.type === 'ingredient' &&
          <>
            <h2 className={`${modalStyles.title} text text_type_main-large`}>Детали ингредиента</h2>
            <IngredientDetails />
          </>
        }
        
        <div className={modalStyles.icon}>
          <CloseIcon type="primary" onClick={props.onClose} />
        </div>
        {props.type === 'checkout-button' && 
          <OrderDetails />
        }
      </div>
    )
}

export default Modal;