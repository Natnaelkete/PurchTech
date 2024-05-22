import { useLocation, useNavigate } from "react-router-dom";
import Steps from "../../ui/Steps";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../slices/cartSlice";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  function submitHandler(e) {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  }

  return (
    <div className="flex flex-col items-center  h-screen">
      <Steps currentPath={pathname} />
      <form onSubmit={submitHandler}>
        <div className="mt-5 ">
          <h1 className="text-5xl mb-5 font-bold">Payment Method</h1>
          <h2 className="text-xl mb-3">Select Method</h2>
          <input
            type="checkbox"
            onChange={(e) => setPaymentMethod(e.target.value)}
            defaultChecked
            className="checkbox-sm mr-2"
          />
          <span>PayPal/CreditCard</span>
          <br />
          <button className="btn w-fit mt-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default Payment;
