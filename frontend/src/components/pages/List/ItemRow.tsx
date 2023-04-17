import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Item } from "../../../models/Item";
import { updateItem } from "../../../store/item";

interface ItemRowProps {
  item: Item;
  handleDecrement: Function;
  handleIncrease: Function;
}
interface DropResult {
  id: number;
}

const ItemRow = ({ item, handleDecrement, handleIncrease }: ItemRowProps) => {
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "box",
    item,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      console.log(dropResult, item);
      if (item && dropResult) {
        const itemWithNewCategory: Item = {
          ...item,
          categoryId: dropResult.id ? Number(dropResult.id) : null,
        };
        dispatch(updateItem(item.id, itemWithNewCategory));
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <div ref={drag} key={item.id} className="cursor-move">
      <div className="p-6 shadow appearance-none bg-transparent border-indigo-500 border rounded w-full text-gray-100 leading-tight focus:outline-none focus:shadow-outline">
        <div className="flex justify-between items-center">
          <div className="flex-grow">
            <p className="text-indigo-400 text-lg mb-2">
              {item.title}
              <NavLink
                to={`/item/${item.id}`}
                className="ml-2 hover:animate-pulse rounded-full bg-purple-500 text-white px-3 py-1 hover:bg-purple-600 transition duration-300 ease-in-out mr-1"
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </NavLink>
            </p>
            <p className="text-gray-200 text-sm">{item.description}</p>
          </div>
          {item.ItemList && (
            <div className="flex-shrink-0">
              <button
                onClick={() =>
                  handleDecrement(item.ItemList, item.ItemList!.quantity)
                }
                className="small-button hover:animate-pulse rounded-full bg-purple-500 text-white px-3 py-1 hover:bg-purple-600 transition duration-300 ease-in-out mr-1"
              >
                -
              </button>
              <div className="inline-block w-8 text-white text-lg font-semibold text-center hover:text-gray-300 transition duration-300 ease-in-out mr-1">
                {item.ItemList.quantity}
              </div>
              <button
                onClick={() =>
                  handleIncrease(item.ItemList, item.ItemList!.quantity)
                }
                className="small-button hover:animate-pulse rounded-full bg-purple-500 text-white px-3 py-1 hover:bg-purple-600 transition duration-300 ease-in-out ml-1"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemRow;
