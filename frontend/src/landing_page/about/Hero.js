import React from "react";

function Hero() {
  return (
    <div className="container py-4">
      <div className="row p-4 p-md-5 my-3 text-center">
        <h1 className="fs-2 fw-bold mb-3" style={{ color: "var(--text-primary, #222)" }}>
          Democratizing Institutional-Grade Trading &amp; Next-Gen Capital Markets
          <br />
          <span className="fs-4 fw-normal text-muted">
            High-frequency infrastructure meets intuitive retail accessibility.
          </span>
        </h1>
      </div>

      <div
        className="row p-4 p-md-5 mt-2 border-top text-muted"
        style={{
          lineHeight: "1.8",
          fontSize: "1.1em",
          borderColor: "var(--border-color, #eee)",
        }}
      >
        <div className="col-lg-6 p-4">
          <p>
            Nexvoro was conceived with a clear mission: to bridge the technological divide between
            top-tier quantitative hedge funds and modern retail investors. We bypassed outdated legacy
            broker architectures in favor of an ultra-low latency, distributed cloud execution engine.
          </p>
          <p>
            Today, Nexvoro delivers real-time market quotes, instant order execution, automated risk controls,
            and comprehensive portfolio analytics with zero hidden fees and transparent pricing.
          </p>
          <p>
            Traders execute thousands of transactions daily through our intuitive web terminal and low-latency
            developer APIs, enjoying seamless access to equity, derivatives, and mutual fund markets.
          </p>
        </div>
        <div className="col-lg-6 p-4">
          <p>
            We believe intelligent investing should be accessible to everyone. Our platform integrates real-time
            margin validation, automated risk controls, and intuitive visual analytics to make market engagement
            seamless and transparent.
          </p>
          <p>
            Through our open developer sandbox and algorithmic SDKs, traders can backtest strategies, connect
            custom execution bots, and build on top of our high-speed market data pipes.
          </p>
          <p>
            We are constantly engineering new capabilities—from smart bracket orders to portfolio health metrics.
            Welcome to the future of retail trading with Nexvoro.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
