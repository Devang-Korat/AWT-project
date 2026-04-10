export default function CategoryCircle({ category, onClick, active }) {

  return (
    <div
      className="text-center"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >

      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          width: "95px",
          height: "95px",
          borderRadius: "50%",
          backgroundColor: active ? "#f7f7f7" : "#ffffff",

          /* ACTIVE SHADOW */
          boxShadow: active
            ? "0px 8px 20px rgba(255, 255, 255, 0.35)"
            : "0px 2px 6px rgba(255, 255, 255, 0.08)",

          transform: active ? "scale(1.00)" : "scale(0.90)",
          transition: "all 0.3s ease"
        }}
      >
<img
  src={category.image || "/no-image.png"}   // ✅ fallback here also
  alt={category.name}
  style={{
    width: "65px",
    height: "65px",
    objectFit: "contain",
    transition: "0.3s"
  }}
/>
      </div>

      <p
        className="mt-2 fw-semibold"
        style={{
          color: active ? "#3a3f45" : "#adb5bd",
          transition: "0.3s"
        }}
      >
        {category.name}
      </p>

    </div>
  );
}