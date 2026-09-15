import React, { useState } from "react";

function Signup() {
  const [mobile, setMobile] = useState("");

  const handleContinue = (e) => {
    e.preventDefault();
    if (mobile.length >= 10) {
      window.location.href = "http://localhost:3001";
    } else {
      alert("Please enter a valid 10-digit mobile number");
    }
  };

  return (
    <div className="container p-5 mt-5">
      <div className="row align-items-center">
        <div className="col-lg-7 text-center mb-5 mb-lg-0">
          <img
            src="media/images/signup.png"
            alt="Signup Illustration"
            style={{ width: "85%", maxWidth: "550px" }}
          />
        </div>
        <div className="col-lg-5 p-4">
          <h1 className="fs-2 mb-2 font-weight-bold">Signup now</h1>
          <p className="text-muted mb-4">Or track your existing application</p>

          <form onSubmit={handleContinue}>
            <div className="input-group mb-3" style={{ maxWidth: "320px" }}>
              <span className="input-group-text bg-white">+91</span>
              <input
                type="tel"
                className="form-control"
                placeholder="Your 10 digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                maxLength="10"
                required
              />
            </div>
            <p className="text-muted small mb-4">
              You will receive an OTP on your number
            </p>
            <button
              type="submit"
              className="btn btn-primary px-4 py-2 font-weight-bold"
              style={{ minWidth: "160px" }}
            >
              Continue
            </button>
          </form>

          <div className="mt-4 pt-3 border-top">
            <p className="text-muted small">
              Already have an account?{" "}
              <a
                href="http://localhost:3001"
                className="text-primary font-weight-bold"
              >
                Go directly to Kite Dashboard &rarr;
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;