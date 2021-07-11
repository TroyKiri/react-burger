import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

//проверка объекта с определенной структурой
import dataPropTypes from "../../utils/prop-types";

import constructorItemStyles from "./constructor-item.module.css";

import {
  DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  moveConstructorItem,
} from "../../services/actions/constructorAction";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ConstructorItem = (props) => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const [{ handlerId }, dropRef] = useDrop({
    accept: "swap-ingredient",
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(moveConstructorItem({ dragIndex, hoverIndex }));

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: "swap-ingredient",
    item: { id: props.item._id, index: props.index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  dragRef(dropRef(ref));

  function deleteIngredient(index) {
    dispatch({
      type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
      index: index,
    });
  }

  const opacity = isDragging ? 0 : 1;

  return (
    <li
      className={`${constructorItemStyles.listElement} mr-2`}
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <div className="mr-2">
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
  );
};

ConstructorItem.propTypes = {
  item: dataPropTypes.isRequired,
};

export default ConstructorItem;
