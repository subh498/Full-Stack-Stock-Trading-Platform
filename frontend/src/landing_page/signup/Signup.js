import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName || !formData.username || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setSubmitting(true);
    try {
      await register(formData);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.response?.data?.error || "Registration failed. Please check your details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container p-4 p-md-5 my-3">
      <div className="row align-items-center justify-content-center">
        <div className="col-lg-6 text-center mb-4 mb-lg-0">
          <img
            src="/media/images/signup.png"
            alt="Signup Illustration"
            style={{ width: "90%", maxWidth: "480px" }}
          />
          <h3 className="fs-4 mt-4 fw-bold" style={{ color: "var(--text-primary, #333)" }}>
            Zero brokerage on stock investments
          </h3>
          <p className="text-muted small">
            Join 1.5+ Crore investors and trade with India's most advanced platform.
          </p>
        </div>

        <div className="col-lg-5">
          <div
            className="p-4 p-md-5 rounded shadow-sm"
            style={{
              background: "var(--card-bg, #ffffff)",
              border: "1px solid var(--border-color, #e0e3eb)",
              color: "var(--text-primary, #333333)",
            }}
          >
            <h1 className="fs-3 mb-2 fw-bold">Signup now</h1>
            <p className="text-muted small mb-4">
              Open a free demat and trading account in under 2 minutes
            </p>

            {error && (
              <div className="alert alert-danger py-2 px-3 small mb-3" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label small fw-semibold text-muted">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  placeholder="e.g. Shubham Sharma"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-muted">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="e.g. shubham_trader"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-muted">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold text-muted">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  minLength="6"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-semibold"
                style={{
                  background: "var(--accent-primary, #387ed1)",
                  borderColor: "var(--accent-primary, #387ed1)",
                  borderRadius: "4px",
                }}
                disabled={submitting}
              >
                {submitting ? "Creating Account..." : "Complete Signup & Start Trading"}
              </button>
            </form>

            <div className="mt-4 pt-3 border-top">
              <p className="text-muted small mb-0">
                Already have an account?{" "}
                <Link to="/login" className="text-primary fw-bold text-decoration-none">
                  Sign in to Kite &rarr;
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;