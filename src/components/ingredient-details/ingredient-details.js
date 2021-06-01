import ingredientDetailsStyles from './ingredient-details.module.css';

function IngredientDetails() {
  return (
    <>
      <img className={`${ingredientDetailsStyles.image} mb-4`} src="https://code.s3.yandex.net/react/code/meat-01-large.png" alt="Биокотлета из марсианской Магнолии" />
      <h2 className='text text_type_main-medium mb-8' >Биокотлета из марсианской Магнолии</h2>
      <ul className={`${ingredientDetailsStyles.list}`}>
        <li className={`${ingredientDetailsStyles.item} mr-5`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Калории, ккал</p>
          <p className='text text_type_digits-default text_color_inactive'>244,4</p>
        </li>
        <li className={`${ingredientDetailsStyles.item} mr-5`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
          <p className='text text_type_digits-default text_color_inactive'>12,2</p>
        </li>
        <li className={`${ingredientDetailsStyles.item} mr-5`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
          <p className='text text_type_digits-default text_color_inactive'>17,2</p>
        </li>
        <li className={`${ingredientDetailsStyles.item}`}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
          <p className='text text_type_digits-default text_color_inactive'>10,2</p>
        </li>
      </ul>
    </>
  )
}

export default IngredientDetails;
