import { useDrop } from "react-dnd";
import { Category } from "../../../models/Category";
import { Item } from "../../../models/Item";

import ItemRow from "./ItemRow";

interface CategoryInListProps {
  categoryWithItems: Category & {
    items: Item[];
  };
  handleDecrement: Function;
  handleIncrease: Function;
}

const CategoryInList = ({
  categoryWithItems,
  handleDecrement,
  handleIncrease,
}: CategoryInListProps) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "box",
    drop: () => ({ id: categoryWithItems.id }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  return (
    <div className="grid grid-cols-1 gap-4 mt-3">
      <div
        key={categoryWithItems.id}
        className={`${canDrop && isOver ? "text-indigo-500" : ""}`}
      >
        <label ref={drop}>
          {categoryWithItems.title}
          {categoryWithItems.icon && (
            <i className={`mx-2 fa-solid ${categoryWithItems.icon}`}></i>
          )}
        </label>
      </div>

      {categoryWithItems.items &&
        categoryWithItems.items.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            handleDecrement={handleDecrement}
            handleIncrease={handleIncrease}
          />
        ))}
    </div>
  );
};

export default CategoryInList;
