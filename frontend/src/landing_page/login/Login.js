import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [demoSubmitting, setDemoSubmitting] = useState(false);

  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || "/dashboard";
  const redirectMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!identifier || !password) {
      setError("Please enter your User ID/Email and Password.");
      return;
    }

    setSubmitting(true);
    try {
      await login(identifier, password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.error || "Login failed. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setError("");
    setDemoSubmitting(true);
    try {
      await demoLogin();
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error("Demo login error:", err);
      setError(err.response?.data?.error || "Failed to start demo session. Check backend connection.");
    } finally {
      setDemoSubmitting(false);
    }
  };

  return (
    <div className="container py-5 my-4">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-5 col-md-7">
          <div
            className="card p-4 p-md-5 shadow-sm border-0"
            style={{
              borderRadius: "12px",
              background: "var(--card-bg, #ffffff)",
              border: "1px solid var(--border-color, #e0e3eb)",
              color: "var(--text-primary, #333333)",
            }}
          >
            <div className="text-center mb-4">
              <img
                src="/media/images/logo.svg"
                alt="Zerodha"
                style={{ width: "130px", marginBottom: "15px" }}
              />
              <h2 className="fs-4 fw-bold mb-1">Login to Kite</h2>
              <p className="text-muted small">
                Trade stocks, futures, options, and mutual funds
              </p>
            </div>

            {redirectMessage && (
              <div
                className="alert alert-info py-2 px-3 small mb-3 text-center"
                role="alert"
              >
                {redirectMessage}
              </div>
            )}

            {error && (
              <div
                className="alert alert-danger py-2 px-3 small mb-3 text-center"
                role="alert"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-semibold text-muted">
                  User ID or Email
                </label>
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="e.g. demo_trader or your email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="form-label small fw-semibold text-muted mb-0">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  className="form-control py-2"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-semibold mb-2"
                style={{
                  background: "var(--accent-primary, #387ed1)",
                  borderColor: "var(--accent-primary, #387ed1)",
                  borderRadius: "4px",
                }}
                disabled={submitting || demoSubmitting}
              >
                {submitting ? "Logging in..." : "Login"}
              </button>

              <div className="d-flex align-items-center my-3">
                <hr className="flex-grow-1" style={{ borderColor: "var(--border-color, #eee)" }} />
                <span className="px-2 text-muted small">OR</span>
                <hr className="flex-grow-1" style={{ borderColor: "var(--border-color, #eee)" }} />
              </div>

              <button
                type="button"
                onClick={handleDemoLogin}
                className="btn btn-outline-success w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                style={{ borderRadius: "4px" }}
                disabled={submitting || demoSubmitting}
              >
                <span>⚡</span>
                <span>{demoSubmitting ? "Starting Demo..." : "One-Click Demo Trader Login"}</span>
              </button>
            </form>

            <div className="text-center mt-4 pt-3 border-top">
              <p className="text-muted small mb-0">
                Don't have a Kite account?{" "}
                <Link to="/signup" className="text-primary fw-bold text-decoration-none">
                  Open an account now &rarr;
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
