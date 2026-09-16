import React from "react";

import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";

function ProductsPage() {
  return (
    <>
      <Hero />
      <LeftSection
        imageURL="/media/images/kite.png"
        productName="Nexvoro Web"
        productDesription="Our flagship high-speed trading terminal featuring live market tick simulation, real-time margin validation, interactive charts, and an elegant dark/light interface."
        tryDemo="/dashboard"
        learnMore="/about"
        googlePlay="#"
        appStore="#"
      />
      <RightSection
        imageURL="/media/images/console.png"
        productName="Nexvoro Pulse"
        productDesription="The central intelligence hub for your trading portfolio. Analyze holdings, track equity curves, and gain deep risk metrics with clean visualizations."
        learnMore="/dashboard"
      />
      <LeftSection
        imageURL="/media/images/coin.png"
        productName="Nexvoro Assets"
        productDesription="Commission-free direct mutual funds and thematic assets delivered straight to your demat account. Enjoy effortless systematic investment plans (SIP) on any device."
        tryDemo="/dashboard/funds"
        learnMore="/about"
        googlePlay="#"
        appStore="#"
      />
      <RightSection
        imageURL="/media/images/kiteconnect.png"
        productName="Nexvoro Quant API"
        productDesription="Ultra-fast REST and streaming WebSocket APIs for algorithmic traders and fintech developers. Automate custom trading strategies with deterministic execution."
        learnMore="/about"
      />
      <LeftSection
        imageURL="/media/images/varsity.png"
        productName="Nexvoro Academy"
        productDesription="An interactive, bite-sized market learning experience. Master technical analysis, options strategies, risk management, and quantitative finance on the go."
        tryDemo="/about"
        learnMore="/about"
        googlePlay="#"
        appStore="#"
      />
      <p className="text-center mt-5 mb-5 text-muted small">
        Engineered with distributed cloud architecture. Learn more about our engineering at the Nexvoro Research Lab.
      </p>
      <Universe />
    </>
  );
}

export default ProductsPage;
