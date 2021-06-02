import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import dataPropTypes from '../../utils/prop-types';

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

const emptyObject = PropTypes.shape({});

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  typeOfModal:PropTypes.string.isRequired,
  ingredient: PropTypes.oneOfType([
    dataPropTypes,
    emptyObject
  ]),
}

export default ModalOverlay;