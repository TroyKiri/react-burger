import ReactDOM from 'react-dom';
import modalOverlayStyles from './modal-overlay.module.css';
import Modal from '../modal/modal';

const modalRoot = document.getElementById("react-modals");

function ModalOverlay(props) {
  return ReactDOM.createPortal(
    (<>
      <div className={modalOverlayStyles.overlay} onClick={props.onClose} />
      <Modal {...props}/>
    </>
    ), 
    modalRoot
  );
}

export default ModalOverlay;