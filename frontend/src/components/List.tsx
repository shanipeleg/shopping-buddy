import { NavLink } from "react-router-dom";

interface ListInterface {
  title: string;
  description: string;
  id: number;
}

const List = ({ title, description, id }: ListInterface) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <NavLink to={`/list/${id}`} className="btn btn-primary">
          View List
        </NavLink>
      </div>
    </div>
  );
};

export default List;
