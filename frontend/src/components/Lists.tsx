import { List as ListInterface } from "../models/List";
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
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lists.map(({ title, description, id }) => (
          <div key={id}>
            <List {...{ title, description, id }} />
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
