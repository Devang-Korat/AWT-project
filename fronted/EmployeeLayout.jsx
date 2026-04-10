import { NavLink } from "react-router-dom";
import "./EmployeeNavbar.css";

function EmployeeNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark employee-navbar">
      <div className="container">

        <NavLink className="navbar-brand fw-bold brand-logo" to="/employee/home">
          WorkStock
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#empNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="empNavbar">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink to="/employee/home" className="nav-link">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/employee/EmpDashboard" className="nav-link">
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/employee/Customer" className="nav-link">
                Customers
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/employee/Products" className="nav-link">
                Products
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/employee/AddExpense" className="nav-link">
                Expenses
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/employee/DailySummary" className="nav-link">
                Daily Summary
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="Account" className="nav-link">
                My Account
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/login" className="nav-link logout-btn">
                Logout
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default EmployeeNavbar;