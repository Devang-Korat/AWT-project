export default function CustomerTable({ customers, onEdit }) {
  return (
    <div className="card shadow-sm border-0">

      <div className="card-header bg-dark text-white">
        All Customers
      </div>

      <div className="card-body table-responsive">

        <table className="table table-hover align-middle">

          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Address</th>
              <th>Joined</th>
              <th>Action</th> {/* ✅ NEW COLUMN */}
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.mobile}</td>
                <td>{c.email}</td>
                <td>{c.address}</td>

                <td>
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>

                {/* ✅ EDIT BUTTON */}
                <td>
                  <button
                    className="btn btn-sm btn-dark"
                    onClick={() => onEdit(c)}
                  >
                    Edit
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}