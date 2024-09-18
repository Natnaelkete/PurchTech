import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/Order.js";
import { stripe } from "../config/stripe.js";

// async function createStripeCoupon(discountPercentage) {
// 	const coupon = await stripe.coupons.create({
// 		percent_off: discountPercentage,
// 		duration: "once",
// 	});

// 	return coupon.id;
// }

// async function createNewCoupon(userId){
//     const coupon = await stripe.coupons.create({
//         percent_off:discountPercentage,
//         duration:"once"
//     })
// }

export const createCheckoutSession = asyncHandler(async (req, res) => {
  try {
    const { products } = req.body;
    console.log(products);
    if (!Array.isArray(products) || products.length === 0) {
      return res
        .statusCode(400)
        .json({ message: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100);
      totalAmount += amount * product.qty;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            image: product.images,
          },
          unit_amount: amount,
        },
        quantity: product.qty || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      //   discounts:coupon? [{
      //     coupon:await createStripeCoupon(coupon.discountPercentage),
      //   }]: []
      metadata: {
        userId: req.user._id.toString(),
      },
    });

    // if(totalAmount >= 2000){
    //     await createNewCoupon(req.user._id)
    // }  we use this if the total amount is greater or equal to 200$
    res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.log(`createCheckout error`, error);
  }
});

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      // if (session.metadata.couponCode) {
      // 	await Coupon.findOneAndUpdate(
      // 		{
      // 			code: session.metadata.couponCode,
      // 			userId: session.metadata.userId,
      // 		},
      // 		{
      // 			isActive: false,
      // 		}
      // 	);
      // }

      // create a new Order
      const products = JSON.parse(session.metadata.products);
      const newOrder = new Order({
        user: session.metadata.userId,
        orderItems: products.map((product) => ({
          product: product.id,
          name: product.name,
          qty: product.qty,
          price: product.price,
          image: product.image,
        })),
        totalAmount: session.amount_total / 100, // convert from cents to dollars,
        stripeSessionId: sessionId,
      });

      await newOrder.save();

      res.status(200).json({
        success: true,
        message: "Payment successful, order created.",
        orderId: newOrder._id,
      });
    }
  } catch (error) {
    console.error("Error processing successful checkout:", error);
    res.status(500).json({
      message: "Error processing successful checkout",
      error: error.message,
    });
  }
};
