import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [verified, setVerified] = useState(false);
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const verifyEmail = async (e) => {
        e.preventDefault();

        try {
            await API.post("/auth/check-email", { email });
            setVerified(true);
            setMsg("");
        } catch {
            setMsg("Email not found");
        }
    };

    const changePassword = async (e) => {
        e.preventDefault();

        // Password validation
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;

        if (!passwordRegex.test(password)) {
            setMsg("Password must be at least 6 characters long, include 1 number and 1 special character");
            return;
        }

        try {
            await API.post("/auth/reset-password", { email, password });
            setMsg("Password Updated Successfully");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch {
            setMsg("Error updating password");
        }
    };

    return (
        <div className="bg-secondary-subtle min-vh-100 d-flex align-items-center justify-content-center">

            <div className="card shadow-lg border-0" style={{ width: "420px" }}>
                <div className="card-body p-4">

                    <h4 className="text-center fw-bold mb-4">
                        Forgot Password
                    </h4>

                    {msg && (
                        <div className="alert alert-danger text-center">
                            {msg}
                        </div>
                    )}

                    {!verified ? (

                        <form onSubmit={verifyEmail}>

                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <button className="btn btn-dark w-100">
                                Verify Email
                            </button>

                        </form>

                    ) : (

                        <form onSubmit={changePassword}>

                            <div className="mb-3">

                                <div className="input-group">

                                    <span className="input-group-text bg-secondary-subtle">
                                        🔒
                                    </span>

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Enter New Password"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>

                                </div>

                                <small className="text-muted">
                                    Password must be at least 6 characters, include 1 number and 1 special character
                                </small>

                            </div>

                            <button className="btn btn-dark w-100">
                                Update Password
                            </button>

                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}