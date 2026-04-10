import { useState } from "react";
import API from "../services/api";

export default function ProductCardAdmin({ product, onDelete, refreshProducts }) {

  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(product);
  const [loading, setLoading] = useState(false);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ UPDATE PRODUCT
  const saveChanges = async () => {
    try {
      setLoading(true);

      await API.put(`/products/${product._id}`, form);

      alert("Product Updated Successfully");

      setEdit(false);

      // refresh data from backend
      if (refreshProducts) {
        refreshProducts();
      }

    } catch (error) {
      console.log(error);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE PRODUCT (ONLY TRIGGER PARENT)
  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    if (onDelete) {
      onDelete(); // parent will handle API + state
    }
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">

      <div className="card h-100 shadow border-0">

        {/* IMAGE */}
        <div
          className="d-flex justify-content-center align-items-center bg-light"
          style={{ height: "180px" }}
        >
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="img-fluid"
            style={{ maxHeight: "140px", objectFit: "contain" }}
          />
        </div>

        <div className="card-body">

          {!edit ? (
            <>
              <h5 className="fw-bold">{form.name}</h5>
              <p className="text-muted mb-1">{form.brand}</p>

              <hr />

              <p className="small mb-1"><strong>Model:</strong> {form.modelNumber}</p>
              <p className="small mb-1"><strong>Barcode:</strong> {form.barcode}</p>
              <p className="small mb-1"><strong>Cost:</strong> ₹ {form.costPrice}</p>
              <p className="small mb-1"><strong>Price:</strong> ₹ {form.price}</p>
              <p className="small mb-1"><strong>Stock:</strong> {form.stock}</p>

              <p className="small text-muted">{form.description}</p>
            </>
          ) : (
            <>
              <input className="form-control mb-2" name="name" value={form.name} onChange={handleChange} />
              <input className="form-control mb-2" name="brand" value={form.brand} onChange={handleChange} />
              <input className="form-control mb-2" name="modelNumber" value={form.modelNumber} onChange={handleChange} />
              <input className="form-control mb-2" name="barcode" value={form.barcode} onChange={handleChange} />
              <input className="form-control mb-2" name="costPrice" value={form.costPrice} onChange={handleChange} />
              <input className="form-control mb-2" name="price" value={form.price} onChange={handleChange} />
              <input className="form-control mb-2" name="stock" value={form.stock} onChange={handleChange} />
              <textarea className="form-control mb-2" name="description" value={form.description} onChange={handleChange} />

              <button
                className="btn btn-dark w-100"
                onClick={saveChanges}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </>
          )}

        </div>

        {!edit && (
          <div className="card-footer bg-white border-0">
            <div className="d-flex gap-2">

              {/* EDIT */}
              <button
                className="btn btn-dark w-50"
                onClick={() => setEdit(true)}
              >
                Edit
              </button>

              {/* DELETE */}
              <button
                className="btn btn-outline-dark w-50"
                onClick={handleDelete}
              >
                Delete
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}