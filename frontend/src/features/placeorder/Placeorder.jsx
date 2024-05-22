import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Steps from "../../ui/Steps";
import { formatCurrency } from "../../utils/helper";
import useCreateOrderMutation from "./useCreateOrderMutation";

function Placeorder() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const cart = useSelector((state) => state.cart);
  const { isAdmin, ...user } = JSON.parse(localStorage.getItem("userInfo"));

  const { createOrder, isLoading } = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  function placeOrderHandler() {
    createOrder({
      user: user,
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      taxPrice: cart.taxPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice,
    });
  }

  return (
    <>
      <div className="flex flex-col items-center ">
        <Steps currentPath={pathname} />
      </div>
      <div className="flex flex-col  md:flex-row gap-3 mt-5">
        <div className="w-full md:w-3/4">
          <div>
            <h1 className="text-2xl font-bold mb-3">Shipping</h1>
            <div>
              <span>
                <strong>Address: </strong>
              </span>
              <span>{cart.shippingAddress.address}, </span>
              <span>{cart.shippingAddress.city}, </span>
              <span>{cart.shippingAddress.country}, </span>
              <span>{cart.shippingAddress.postalCode}</span>
            </div>
          </div>
          <hr className="my-5 border-gray-200 dark:border-gray-700" />
          <div>
            <h1 className="text-2xl font-bold mb-3">Payment Method</h1>
            <div>
              <span>
                <strong>Method: </strong>
              </span>
              <span>{cart.paymentMethod}</span>
            </div>
          </div>
          <hr className="my-5 border-gray-200 dark:border-gray-700" />
          <div>
            <h1 className="text-2xl font-bold mb-5">Order items</h1>
            <div>
              {cart.cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <ul className="m-4 ">
                  {cart.cartItems.map((item) => (
                    <li key={item._id}>
                      <div className="flex flex-row justify-between mb-5">
                        <div className="flex gap-3">
                          <img
                            src={item.image}
                            width={50}
                            height={50}
                            className="rounded-sm"
                          />
                          <p className="underline">{item.name}</p>
                        </div>
                        <div>
                          <span>
                            {`${item.qty} x $${item.price} = ${formatCurrency(
                              item.qty * item.price
                            )}`}{" "}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="border-2 outline-none border-gray-500 h-fit p-5 rounded-lg grid   lg:ml-0 w-full  md:w-[30%]">
          <span className="flex justify-between">
            Items: <h1>{cart.itemsPrice}</h1>
          </span>
          <hr className="my-5 border-gray-200 dark:border-gray-700" />
          <span className="flex justify-between">
            Shipping:
            <p>{cart.shippingPrice}</p>
          </span>
          <hr className="my-5 border-gray-200 dark:border-gray-700" />
          <span className="flex justify-between">
            Tax:
            <p>{cart.taxPrice}</p>
          </span>
          <hr className="my-5 border-gray-200 dark:border-gray-700" />
          <span className="flex justify-between">
            Total:
            <p>{cart.totalPrice}</p>
          </span>
          <hr className="my-5 border-gray-200 dark:border-gray-700" />
          <button
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
            className="btn btn-outline"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Place Order "
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default Placeorder;
