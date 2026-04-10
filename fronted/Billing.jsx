import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminDashboard() {

  const [summary, setSummary] = useState({});
  const [recentBills, setRecentBills] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const username = localStorage.getItem("name");

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard");

      setSummary(res.data.summary || {});
      setRecentBills(res.data.recentBills || []);
      setTopProducts(res.data.topProducts || []);
      setLowStockProducts(res.data.lowStock || []);
      setExpenses(res.data.expenses || []);

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <>
      <div className="dashboard-page py-4">
        <div className="container-fluid">

          <div className="d-flex justify-content-between align-items-center mb-5 dashboard-header">
            <div>
              <h2 className="fw-bold">
                <i className="bi bi-speedometer2 me-2 text-secondary"></i>
                Hello {username}
              </h2>

              <small className="text-secondary">
                Welcome back to WorkStock Admin Panel
              </small>

              <small className="text-secondary">
                Business control overview
              </small>
            </div>

            <div className="date-badge">
              <i className="bi bi-calendar3 me-2"></i>
              {new Date().toDateString()}
            </div>
          </div>

          <div className="row g-4 mb-4">

            {[
              { title: "Total Products", value: summary.totalProducts || 0, icon: "bi-box" },
              { title: "Employees", value: summary.totalEmployees || 0, icon: "bi-people" },
              { title: "Today Sales", value: `₹ ${summary.todaySales || 0}`, icon: "bi-currency-rupee" },
              { title: "Monthly Sales", value: `₹ ${summary.monthlySales || 0}`, icon: "bi-graph-up" },
            ].map((item, index) => (

              <div className="col-md-3" key={index}>
                <div className="card dashboard-card h-100 shadow">
                  <div className="card-body d-flex justify-content-between align-items-center">

                    <div>
                      <p className="text-secondary mb-1 small">
                        {item.title}
                      </p>
                      <h3 className="fw-bold mb-0">
                        {item.value}
                      </h3>
                    </div>

                    <div className="icon-box">
                      <i className={`bi ${item.icon}`}></i>
                    </div>
                  </div>
                </div>
              </div>

            ))}

          </div>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card dashboard-card shadow">
                <div className="card-header black-header">
                  <h5>
                    <i className="bi bi-receipt me-2"></i>
                    Recent Bills
                  </h5>
                </div>

                <table className="table custom-table mb-0">

                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Product</th>
                      <th className="text-end">Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentBills.map((b) => (
                      <tr key={b._id}>
                        <td>{b.customerId?.name}</td>
                        <td>{b.items?.[0]?.productName || "-"}</td>
                        <td className="text-end fw-bold">
                          ₹ {b.finalAmount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card dashboard-card shadow">
                <div className="card-header black-header">
                  <h5>
                    <i className="bi bi-box-seam me-2"></i>
                    Top Products
                  </h5>
                </div>

                <table className="table custom-table mb-0">

                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Sold</th>
                      <th>Stock</th>
                    </tr>
                  </thead>

                  <tbody>
                    {topProducts.map((p, index) => (
                      <tr key={index}>
                        <td>{p.name}</td>
                        <td>{p.sold}</td>
                        <td>
                          <span className={`badge ${p.stock < 10 ? "bg-danger" : "bg-success"}`}>
                            {p.stock} Left
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row mt-4 g-4">
            <div className="col-lg-6">
              <div className="card dashboard-card shadow">
                <div className="card-header black-header">
                  <h5>
                    <i className="bi bi-wallet2 me-2"></i>
                    Shop Expenses
                  </h5>
                </div>

                <ul className="list-group list-group-flush">
                  {expenses.map(exp => (
                    <li key={exp._id}
                      className="list-group-item bg-transparent d-flex justify-content-between border-secondary"
                    >
                      {exp.title}
                      <strong>₹ {exp.amount}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card dashboard-card shadow">
                <div className="card-header text-warning">
                  <h5>
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Low Stock Alert
                  </h5>
                </div>
                <div className="card-body">
                  {lowStockProducts.map((p) => (
                    <div
                      key={p._id}
                      className="stock-item d-flex justify-content-between align-items-center mb-3 p-3 text-light"
                    >
                      <span>{p.name}</span>
                      <span className="badge bg-danger">
                        {p.stock} Left
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminDashboard;