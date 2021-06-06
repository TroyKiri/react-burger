import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById("react-modals");

function Modal(props) {
  return ReactDOM.createPortal((
      <>
        <ModalOverlay onClose={props.onClose} />
        <div className={modalStyles.popup}>
          {props.type === 'burger-ingredient' && 
          <h2 className={`${modalStyles.title} text text_type_main-large`}>Детали ингредиента</h2>
          }
          {props.children}   
          <div className={modalStyles.icon}>
            <CloseIcon type="primary" onClick={props.onClose} />
          </div>
        </div>
      </>
    ), modalRoot)
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  type:PropTypes.string,
  children:PropTypes.element.isRequired
}

export default Modal;