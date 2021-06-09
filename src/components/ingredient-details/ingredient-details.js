import dataPropTypes from '../../utils/prop-types';

import ingredientDetailsStyles from './ingredient-details.module.css';

function IngredientDetails(props) {
  return (
    <div className={ingredientDetailsStyles.container}>
      <img className={`${ingredientDetailsStyles.image} mb-4`} src={props.image_large} alt={props.name} />
      <h2 className='text text_type_main-medium mb-8' >{props.name}</h2>
      <ul className={`${ingredientDetailsStyles.list}`}>
        <li className={`${ingredientDetailsStyles.item} mr-5`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Калории, ккал</p>
          <p className='text text_type_digits-default text_color_inactive'>{props.calories}</p>
        </li>
        <li className={`${ingredientDetailsStyles.item} mr-5`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{props.proteins}</p>
        </li>
        <li className={`${ingredientDetailsStyles.item} mr-5`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{props.fat}</p>
        </li>
        <li className={`${ingredientDetailsStyles.item}`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{props.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}
IngredientDetails.propTypes = {
  props: dataPropTypes
}

export default IngredientDetails;
