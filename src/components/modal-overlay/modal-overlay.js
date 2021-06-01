import ReactDOM from 'react-dom';
import modalOverlayStyles from './modal-overlay.module.css';
import Modal from '../modal/modal';

const modalRoot = document.getElementById("react-modals");

function ModalOverlay(props) {
  return ReactDOM.createPortal(
    (
      <section className={modalOverlayStyles.overlay}>
        <Modal {...props}/>
      </section>
    ), 
    modalRoot
  );
}

export default ModalOverlay;