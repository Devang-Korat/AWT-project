import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function AdminEmployees() {

  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/user/all");
      setEmployees(res.data);
    } catch (error) {
      alert("Unauthorized or server error");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const editEmployee = (emp) => {
    navigate(`/register?id=${emp._id}`);
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await API.delete(`/user/${id}`);
      fetchEmployees();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-light min-vh-100 p-4">
      <div className="container">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold mb-0">Employee Management</h3>
            <small className="text-muted">
              Manage employees in your system
            </small>
          </div>

          <button
            className="btn btn-dark"
            onClick={() => navigate("/register")}
          >
            Add Employee
          </button>
        </div>

        <div className="card shadow border-0">
          <div className="card-header bg-dark text-white">
            Employee List
          </div>

          <div className="card-body p-0">
            <table className="table table-striped mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th width="180">Actions</th>
                </tr>
              </thead>

              <tbody>
                {employees.length > 0 ? (
                  employees.map((emp) => (
                    <tr key={emp._id}>
                      <td>{emp.name}</td>
                      <td>{emp.email}</td>
                      <td>{emp.mobile}</td>
                      <td className="text-capitalize">{emp.role}</td>
                      <td>
                        {emp.isActive ? (
                          <span className="badge bg-success">Active</span>
                        ) : (
                          <span className="badge bg-secondary">Inactive</span>
                        )}
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-dark"
                            onClick={() => editEmployee(emp)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-sm btn-outline-dark"
                            onClick={() => deleteEmployee(emp._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-3">
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
}