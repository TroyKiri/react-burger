import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Modal(props) {
  return (
      <div className={modalStyles.popup}>
        <h2 className={`${modalStyles.title} text text_type_main-large`}>Детали ингредиента</h2>
        <div className={modalStyles.icon}>
          <CloseIcon type="primary" onClick={props.onClose} />
        </div>
      </div>
    )
}

export default Modal;