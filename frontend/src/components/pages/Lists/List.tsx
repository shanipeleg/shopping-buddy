import { NavLink } from "react-router-dom";

interface ListInterface {
  title: string;
  description: string;
  id: number;
}

const List = ({ title, description, id }: ListInterface) => {
  return (
    <div className="max-w-sm p-6 shadow appearance-none bg-transparent border-indigo-500 border rounded w-full text-gray-100 leading-tight focus:outline-none focus:shadow-outline">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>

      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      <NavLink
        to={`/list/${id}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none"
      >
        View List
        <svg
          aria-hidden="true"
          className="w-4 h-4 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </NavLink>
    </div>
  );
};

export default List;
