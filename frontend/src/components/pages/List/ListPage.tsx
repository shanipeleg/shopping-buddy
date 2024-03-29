import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { ItemList } from "../../../models/ItemList";
import { RootState } from "../../../store/configureStore";
import {
  getListItems,
  getListItemsKeyedByCategory,
  updateQuantityOfListItem,
} from "../../../store/itemList";
import {
  fetchList,
  getErrorFetching,
  getListById,
  getLoadingFetching,
} from "../../../store/list";
import { isStringNumeric } from "../../../utils/isStringNumeric";
import AddItemToList from "./AddItemToList";
import Spinner from "../../common/Spinner";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CategoryInList from "./CategoryInList";

const ListPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) =>
    getLoadingFetching(state)
  );
  const [errorParam, setErrorParam] = useState(false);

  const fetchError = useSelector((state: RootState) => getErrorFetching(state));
  const list = useSelector((state: RootState) =>
    getListById(state, Number(id))
  );

  const listItemsByCategory = useSelector((state: RootState) =>
    getListItemsKeyedByCategory(state, Number(id))
  );

  const handleDecrement = (itemList: ItemList, currentQuantity: number) => {
    dispatch(updateQuantityOfListItem(itemList.id, --currentQuantity));
  };

  const handleIncrease = (itemList: ItemList, currentQuantity: number) => {
    dispatch(updateQuantityOfListItem(itemList.id, ++currentQuantity));
  };

  useEffect(() => {
    if (id && isStringNumeric(id)) {
      dispatch(fetchList(Number(id)));
    } else {
      setErrorParam(true);
    }
    return () => {};
  }, [id, dispatch]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {isLoading && <Spinner />}
        {(errorParam || fetchError) && <div>Error!</div>}

        {list && (
          <>
            <div className="mb-2 tracking-wide text-sm text-indigo-500 font-semibold">
              {list.title}
            </div>
            <div className="mb-2 block mt-1 text-lg leading-tight font-medium text-gray-100">
              {list.description}
            </div>
            <AddItemToList listId={list.id} />
            <div className="grid grid-cols-1 gap-4 mt-3">
              {listItemsByCategory &&
                listItemsByCategory.map((categoryWithItems) => (
                  <CategoryInList
                    key={categoryWithItems.id}
                    categoryWithItems={categoryWithItems}
                    handleDecrement={handleDecrement}
                    handleIncrease={handleIncrease}
                  />
                ))}
            </div>
          </>
        )}
      </DndProvider>
    </>
  );
};

export default ListPage;
