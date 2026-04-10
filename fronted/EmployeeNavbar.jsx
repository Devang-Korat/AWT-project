import { useNavigate } from "react-router-dom";

export default function BillPanel({ billItems, closePanel }) {

  const navigate = useNavigate();

  // ✅ SAFE TOTAL CALCULATION
const total = billItems.reduce(
  (sum, item) => sum + (item.price * item.quantity),
  0
);
  // ✅ PREPARE ITEMS FOR BILLING FLOW
const formattedItems = billItems.map((item) => ({
  productId: item.productId,   // ✅ FIX HERE
  name: item.name,
  price: Number(item.price),
  quantity: item.quantity || 1
}));

  const handleCreateBill = () => {

    if (formattedItems.length === 0) {
      alert("Add products first!");
      return;
    }

    // ✅ SEND CLEAN DATA TO CUSTOMER PAGE
    navigate("/employee/BillingCustomerForm", {
      state: {
        items: formattedItems,
        totalAmount: total
      }
    });
  };

  return (
    <div className="p-3 d-flex flex-column h-100">

      <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
        <h5 style={{ color: "#3a3f45" }}>Create Bill</h5>

        <button
          className="btn btn-sm btn-secondary"
          onClick={closePanel}
        >
          ✕
        </button>
      </div>

      {/* ITEMS LIST */}
      <div className="flex-grow-1 overflow-auto mt-3">

        {billItems.length === 0 ? (
          <p className="text-muted text-center">
            No products added
          </p>
        ) : (
          billItems.map((item, index) => (
            <div key={index} className="border-bottom py-2">
              <div className="fw-semibold">{item.name}</div>
              <small>₹ {item.price}</small>
            </div>
          ))
        )}

      </div>

      <div className="border-top pt-3">

        <h5 style={{ color: "#3a3f45" }}>
          Total: ₹ {total}
        </h5>

        <button
          className="btn w-100 mt-2"
          style={{
            backgroundColor: "#3a3f45",
            color: "#ffffff"
          }}
          onClick={handleCreateBill}
        >
          Create Bill
        </button>

      </div>

    </div>
  );
}