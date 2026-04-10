import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function ViewBills() {
  const navigate = useNavigate();
  const [bills, setBills] = useState([]);

  const fetchBills = async () => {
    try {
      const res = await API.get("/bills");
      setBills(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchBills(); }, []);

  const deleteBill = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this bill?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/bills/${id}`);
      alert("Bill deleted successfully");

      // refresh list
      fetchBills();

    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="bg-light min-vh-100 p-4">
      <div className="container">

        <div className="mb-4">
          <h3 className="fw-bold mb-0">Bill Management</h3>
          <small className="text-muted">All bills created by employees</small>
        </div>

        <div className="card shadow border-0">
          <div className="card-header bg-dark text-white">Bill List</div>

          <div className="card-body p-0">
            <table className="table table-striped mb-0">
              <thead className="table-light">
                <tr>
                  <th>Invoice</th>
                  <th>Customer</th>
                  <th>Employee</th>
                  <th>Payment</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {bills.map(b => (
                  <tr key={b._id}>
                    <td>{b.invoiceNumber}</td>
                    <td>{b.customerId?.name}</td>
                    <td>{b.employeeId?.name}</td>
                    <td className="text-uppercase">{b.paymentMethod}</td>
                    <td>₹{b.finalAmount}</td>
                    <td>
                      {b.billStatus === "completed"
                        ? <span className="badge bg-success">Completed</span>
                        : <span className="badge bg-secondary">Cancelled</span>}
                    </td>
                    <td>{new Date(b.billDate).toLocaleDateString()}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-dark"
                          onClick={() => navigate(`/admin/BillDetails/${b._id}`)}
                        >
                          View
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteBill(b._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
}