export default function ProductCard({ product, addToBill }) {
  return (
    <div className="col-md-3 mb-4">
      <div className="card shadow-lg border-2 h-100">

        <div
          className="d-flex align-items-center justify-content-center bg-light"
          style={{ height: "180px", overflow: "hidden" }}
        >
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="img-fluid"
            style={{
              maxHeight: "100%",
              objectFit: "contain"
            }}
          />
        </div>

        <div className="card-body text-center d-flex flex-column">
          <h6 className="fw-bold">{product.name}</h6>

          <p className="text-muted small mb-1">
            {product.brand}
          </p>

          <h5 className="mb-3" style={{ color: "#3a3f45" }}>
            ₹ {product.price}
          </h5>

          <button
            className="btn mt-auto w-100"
            style={{
              backgroundColor: "#3a3f45",
              color: "#fff"
            }}
            onClick={() => addToBill(product)}
          >
            Add to Bill
          </button>
        </div>

      </div>
    </div>
  );
}