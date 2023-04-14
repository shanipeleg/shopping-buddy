import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="navbar-nav">
          <NavLink to="/lists" className="nav-link nav-item">
            Lists
          </NavLink>
          <NavLink to="/create-list" className="nav-link nav-item">
            Create List
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
