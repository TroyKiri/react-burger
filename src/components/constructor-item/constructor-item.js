import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";

import constructorItemStyles from './constructor-item.module.css';

import { DELETE_INGREDIENT_FROM_CONSTRUCTOR } from '../../services/actions/actions';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ConstructorItem = (props) => {

  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: props.item,
  });

  function deleteIngredient(index) {
    dispatch({
      type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
      index: index
    })
  }

  return (
    <li key={props.index} className={`${constructorItemStyles.listElement} mr-2`} ref={dragRef}>
      <div className='mr-2' >
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={props.item.name}
        price={props.item.price}
        thumbnail={props.item.image}
        key={props.item._id}
        handleClose={() => deleteIngredient(props.index)}
      />
    </li>
  )
}

export default ConstructorItem;