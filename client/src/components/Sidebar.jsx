import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <NavLink to="/dashboard">
        Dashboard
      </NavLink>

      <NavLink to="/expenses">
        Expenses
      </NavLink>

    </div>
  );
}

export default Sidebar;