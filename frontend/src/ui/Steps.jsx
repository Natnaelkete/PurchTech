function Steps({ currentPath }) {
  const payment = currentPath === "/payment";
  const shipping = currentPath === "/shipping";
  const placeorder = currentPath === "/placeorder";

  return (
    <ul className="steps">
      <li className="step step-primary">Login</li>
      <li
        className={`step ${payment ? "step-primary" : ""} ${
          shipping ? "step-primary" : ""
        } ${placeorder ? "step-primary" : ""}`}
      >
        Shipping
      </li>
      <li
        className={`step ${payment ? "step-primary" : ""} ${
          placeorder ? "step-primary" : ""
        }`}
      >
        Payment
      </li>
      <li className={`step ${placeorder ? "step-primary" : ""} `}>
        Place Order
      </li>
    </ul>
  );
}

export default Steps;
