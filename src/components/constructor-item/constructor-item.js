import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import constructorItemStyles from "./constructor-item.module.css";

import {
  DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  SWAP,
} from "../../services/actions/actions";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ConstructorItem = (props) => {
  const dispatch = useDispatch();

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
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
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      // moveCard(dragIndex, hoverIndex);

      dispatch({
        type: SWAP,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
      });

      // rebaseItems(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "swap-ingredient",
    item: { ...props.item, index: props.index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  function deleteIngredient(index) {
    dispatch({
      type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
      index: index,
    });
  }
  const opacity = isDragging ? 0 : 1;
  return (
    <li
      draggable
      key={props.index}
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

export default ConstructorItem;
