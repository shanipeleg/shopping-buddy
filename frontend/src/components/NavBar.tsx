import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-purple-900 p-6">
      <div className="flex items-center flex-shrink-0 mr-6">
        <span className="font-semibold text-xl tracking-tight ml-2">
          Shopping Buddy
        </span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-purple-200 border-purple-400 hover:text-white hover:border-white"></button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <NavLink
            to="/lists"
            className="block mt-4 lg:inline-block lg:mt-0 text-purple-200 hover:text-white mr-4"
          >
            Lists
          </NavLink>
          <NavLink
            to="/create-list"
            className="block mt-4 lg:inline-block lg:mt-0 text-purple-200 hover:text-white mr-4"
          >
            Create List
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
