import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ItemList } from "../models/ItemList";
import { RootState } from "../store/configureStore";
import { getListItems, updateQuantityOfListItem } from "../store/itemList";
import {
  fetchList,
  getErrorFetching,
  getListById,
  getLoadingFetching,
} from "../store/list";
import { isStringNumeric } from "../utils/isStringNumeric";
import AddItemToList from "./AddItemToList";

const ListPage = () => {
  let { id } = useParams();

  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) =>
    getLoadingFetching(state)
  );
  const [errorParam, setErrorParam] = useState(false);

  const fetchError = useSelector((state: RootState) => getErrorFetching(state));
  const list = useSelector((state: RootState) =>
    getListById(state, Number(id))
  );

  const listItems = useSelector((state: RootState) =>
    getListItems(state, Number(id))
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
      {isLoading && <div className="spinner-border"></div>}
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
            {listItems &&
              listItems.map((item) => (
                <div key={item.id} className="">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex-grow">
                        <p className="text-indigo-400 text-lg mb-2">
                          {item.title}
                        </p>
                        <p className="text-gray-200 text-sm">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          onClick={() =>
                            handleDecrement(
                              item.ItemList,
                              item.ItemList.quantity
                            )
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
                            handleIncrease(
                              item.ItemList,
                              item.ItemList.quantity
                            )
                          }
                          className="small-button hover:animate-pulse rounded-full bg-purple-500 text-white px-3 py-1 hover:bg-purple-600 transition duration-300 ease-in-out ml-1"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default ListPage;
