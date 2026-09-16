import React, { useState } from "react";
import { Link } from "react-router-dom";

const Funds = () => {
  const [availableMargin, setAvailableMargin] = useState(4043.1);

  const handleAddFunds = (e) => {
    e.preventDefault();
    const amountStr = window.prompt("Enter amount to add via UPI (₹):", "5000");
    const amount = parseFloat(amountStr);
    if (!isNaN(amount) && amount > 0) {
      setAvailableMargin((prev) => prev + amount);
      alert(`Successfully added ₹${amount.toFixed(2)} to your trading account.`);
    }
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    const amountStr = window.prompt(
      `Enter amount to withdraw (Max ₹${availableMargin.toFixed(2)}):`,
      "1000"
    );
    const amount = parseFloat(amountStr);
    if (!isNaN(amount) && amount > 0) {
      if (amount > availableMargin) {
        alert("Insufficient available cash to withdraw.");
        return;
      }
      setAvailableMargin((prev) => prev - amount);
      alert(
        `Withdrawal request for ₹${amount.toFixed(2)} submitted successfully.`
      );
    }
  };

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI </p>
        <Link to="#" onClick={handleAddFunds} className="btn btn-green">
          Add funds
        </Link>
        <Link to="#" onClick={handleWithdraw} className="btn btn-blue">
          Withdraw
        </Link>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">
                {availableMargin.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">3,757.30</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">
                {availableMargin.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>
                {availableMargin.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="data">
              <p>Opening Balance</p>
              <p>3736.40</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>4064.00</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="btn btn-blue">Open Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
