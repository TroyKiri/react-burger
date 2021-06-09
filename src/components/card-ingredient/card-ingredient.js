import PropTypes from 'prop-types';

import cardIngrStyles from './card-ingredient.module.css';

//проверка объекта с определенной структурой
import dataPropTypes from '../../utils/prop-types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function CardIngredient(props) {
  const renderIngredient = () => {
    props.openModal();
    props.chooseIngredient(props.item);
  }

  return (
    <div className={`${cardIngrStyles.card} mb-8`} onClick={renderIngredient}>
      <img className='mb-1' src={props.item.image} alt={props.item.name}></img>
      <div className={cardIngrStyles.price}>
        <p className='text text_type_digits-default mr-1'>{props.item.price}</p>
        <CurrencyIcon />
      </div>
      <h3 className='text text_type_main-default mt-1 mb-6'>{props.item.name}</h3>
      <Counter count={1} size="default" />
    </div>
  )
}

CardIngredient.propTypes = {
  item: dataPropTypes.isRequired,
  chooseIngredient: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
}

export default CardIngredient;
