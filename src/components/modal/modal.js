import PropTypes from 'prop-types';
import dataPropTypes from '../../utils/prop-types';

import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

function Modal(props) {
  return (
      <div className={modalStyles.popup}>
        {props.typeOfModal === 'ingredient' &&
          <>
            <h2 className={`${modalStyles.title} text text_type_main-large`}>Детали ингредиента</h2>
            <IngredientDetails {...props.ingredient} />
          </>
        }
        
        <div className={modalStyles.icon}>
          <CloseIcon type="primary" onClick={props.onClose} />
        </div>
        {props.typeOfModal === 'checkout-button' && 
          <OrderDetails />
        }
      </div>
    )
}

const emptyObject = PropTypes.shape({});

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  typeOfModal:PropTypes.string.isRequired,
  ingredient: PropTypes.oneOfType([
    dataPropTypes,
    emptyObject
  ]),
}

export default Modal;