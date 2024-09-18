import { Button } from "antd";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
// import usePayWithStripe from "./useStripePayment";
import axios from "axios";

const stripePromise = loadStripe(
  import.meta.env.STRIPE_PUBLIC_KEY
);

function StripeIntegration() {
  const products = useSelector((state) => state.cart);
  console.log(products.cartItems);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const res = await axios.post("/api/payments/create-checkout-session", {
      products: products.cartItems,
    });

    const session = res.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error("Error:", result.error);
    }
  };

  return (
    <div>
      <Button onClick={handlePayment}>Stripe</Button>
    </div>
  );
}

export default StripeIntegration;
