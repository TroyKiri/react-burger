import { useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

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
  // const { stuffing } = useSelector(
  //   (store) => store.ingredientReducer.constructorIngredients
  // );

  // const moveCard = useCallback(
  //   (dragIndex, hoverIndex) => {
  //     // const dragCart = stuffing[dragIndex];
  //     // console.log(`dragCart - ${dragCart}`);
  //     dispatch({
  //       type: SWAP,
  //       dragIndex,
  //       hoverIndex,
  //     });
  //   },
  //   [stuffing]
  // );

  const dispatch = useDispatch();

  const ref = useRef(null);
  const [{ handlerId, isHovered }, drop] = useDrop({
    accept: "swap-ingredient",
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(),
        isHovered: monitor.isOver(),
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

      dispatch(moveConstructorItem(dragIndex, hoverIndex));

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "swap-ingredient",
    item: { id: props.item._id, index: props.index },
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
