import { List as ListInterface } from "../models/List";
import { chunk } from "lodash";
import List from "./List";
import { connect } from "react-redux";
import { fetchLists, getLists } from "../store/list";
import { AppDispatch, RootState } from "../store/configureStore";
import { useEffect } from "react";

interface ListProps {
  loadLists: Function;
  lists: ListInterface[];
}

const Lists = ({ loadLists, lists }: ListProps) => {
  useEffect(() => {
    loadLists();
  }, [loadLists]);

  return (
    <>
      <div className="container text-center">
        {chunk(lists, 3).map((chunk, index) => (
          <div key={index} className="row mb-2">
            {chunk.map(({ title, description, id }) => (
              <div key={id} className="col">
                <List {...{ title, description, id }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
const mapStateToProps = (state: RootState) => ({
  lists: getLists(state),
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  loadLists: () => dispatch(fetchLists()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Lists);
