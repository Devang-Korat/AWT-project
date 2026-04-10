import { useState } from "react";
import API from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Validation function
  const validate = () => {
    // Email regex
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!form.email) {
      return "Email is required";
    }

    if (!emailRegex.test(form.email)) {
      return "Enter valid email format";
    }

    if (!form.password) {
      return "Password is required";
    }

    if (form.password.length < 6) {
      return "Password must be at least 6 characters";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);

      if (res.data.role === "admin") {
        navigate("/admin/AdminDashboard");
      } else {
        navigate("/employee/EmpDashboard");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="bg-secondary-subtle min-vh-100 d-flex align-items-center justify-content-center">

      <div className="container">
        <div className="row justify-content-center">

          <div className="col-md-5">

            <div className="card shadow-lg border p-3 border-dark">

              <div className="card-body p-5">

                <h3 className="text-center fw-bold mb-4">
                  Shop Management
                </h3>

                <p className="text-center text-muted mb-4">
                  Login to your account
                </p>

                {error && (
                  <div className="alert alert-danger text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  <div className="mb-3 input-group">
                    <span className="input-group-text bg-secondary-subtle">
                      📧
                    </span>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-2 input-group">
                    <span className="input-group-text bg-secondary-subtle">
                      🔒
                    </span>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="text-end mb-3">
                    <Link
                      to="/ForgotPassword"
                      className="text-dark text-decoration-none small"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <button className="btn btn-dark w-100 fw-semibold py-2">
                    Login
                  </button>

                </form>

                <hr />

                <p className="text-center mb-0">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-dark fw-semibold text-decoration-none"
                  >
                    Register
                  </Link>
                </p>

              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}