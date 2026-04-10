import { useState } from "react";
import API from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    role: "employee"
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {

    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;

    if (!form.name.trim()) {
      return "Name is required";
    }

    if (form.name.trim().length < 3) {
      return "Name must be at least 3 characters";
    }

    if (!nameRegex.test(form.name)) {
      return "Name can only contain letters";
    }

    if (!form.email) {
      return "Email is required";
    }

    if (!emailRegex.test(form.email)) {
      return "Enter valid email format";
    }

    if (!form.mobile) {
      return "Mobile number is required";
    }

    if (!mobileRegex.test(form.mobile)) {
      return "Mobile must be exactly 10 digits";
    }

    if (!form.password) {
      return "Password is required";
    }

    if (!passwordRegex.test(form.password)) {
      return "Password must be 6+ chars, include 1 number & 1 special character";
    }

    if (!form.confirmPassword) {
      return "Confirm password is required";
    }

    if (form.password !== form.confirmPassword) {
      return "Passwords do not match";
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

      const { confirmPassword, ...data } = form;

      const res = await API.post("/auth/register", data);

      localStorage.setItem("token", res.data.token);

      alert("Registration Successful");

      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (

    <div className="bg-secondary-subtle min-vh-100 d-flex align-items-center justify-content-center">

      <div className="container">
        <div className="row justify-content-center">

          <div className="col-md-6">

            <div className="card shadow-lg border p-3 border-dark">

              <div className="card-body p-5">

                <h3 className="text-center fw-bold mb-3">
                  Shop Management
                </h3>

                <p className="text-center text-muted mb-4">
                  Create your account
                </p>

                {error && (
                  <div className="alert alert-danger text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  <div className="mb-3 input-group">
                    <span className="input-group-text bg-secondary-subtle">👤</span>
                    <input
                      name="name"
                      className="form-control"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3 input-group">
                    <span className="input-group-text bg-secondary-subtle">📧</span>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Mobile */}
                  <div className="mb-3 input-group">
                    <span className="input-group-text bg-secondary-subtle">📱</span>
                    <input
                      name="mobile"
                      className="form-control"
                      placeholder="Mobile Number"
                      value={form.mobile}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-3 input-group">
                    <span className="input-group-text bg-secondary-subtle">🔒</span>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-3 input-group">
                    <span className="input-group-text bg-secondary-subtle">🔐</span>
                    <input
                      name="confirmPassword"
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Role */}
                  <div className="mb-4">
                    <select
                      name="role"
                      className="form-select"
                      value={form.role}
                      onChange={handleChange}
                    >
                      <option value="employee">Employee</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <button className="btn btn-dark w-100 fw-semibold py-2">
                    Register
                  </button>

                </form>

                <hr />

                <p className="text-center mb-0">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-dark fw-semibold text-decoration-none"
                  >
                    Login
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