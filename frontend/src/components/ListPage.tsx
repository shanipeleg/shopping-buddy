import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store/configureStore";
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
          <h1>{list.title}</h1>
          <h5>{list.description}</h5>
          <AddItemToList listId={list.id} />
          <ol className="list-group list-group-numbered">
            {list.Items &&
              list.Items.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{item.title}</div>
                    {item.description}
                  </div>
                  {item.ItemList && (
                    <>
                      <div className="btn-group" role="group">
                        <button type="button" className="btn btn-primary">
                          -
                        </button>
                        <div className="btn btn-info disabled">
                          {item.ItemList.quantity}
                        </div>
                        <button type="button" className="btn btn-primary">
                          +
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
          </ol>
        </>
      )}
    </>
  );
};

export default ListPage;
