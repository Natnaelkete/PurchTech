import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helper";
import { removeCartItem, updateCartItemQty } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.cart.cartItems);
  const priceInfo = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncrement = (item) => {
    const newQty = item.countInStock === item.qty ? item.qty : item.qty + 1;
    dispatch(updateCartItemQty({ itemId: item._id, qty: newQty }));
  };

  const handleDecrement = (item) => {
    const newQty = item.qty === 1 ? item.qty : item.qty - 1;
    dispatch(updateCartItemQty({ itemId: item._id, qty: newQty }));
  };

  function checkoutHandler() {
    navigate("/login?redirect=/shipping");
  }

  return (
    <div className="mt-14">
      <h1 className="text-3xl font-inter font-bold">Your Shopping Cart</h1>
      <hr className="my-10 border-gray-200 dark:border-gray-700" />
      <div className=" flex flex-col md:flex-row justify-between">
        {cart.length > 0 ? (
          <ul className="flex flex-col md:w-full gap-14">
            {cart.map((item) => (
              <>
                <li key={item._id}>
                  <div className=" flex  flex-col  md:flex-row  md:gap-10 ">
                    <img
                      src={item.image}
                      className="rounded-lg w-full mb-6 md:mb-0 h-[200px] sm:h-[250px] md:h-[150px] md:w-[170px]"
                    />
                    <div className="flex flex-col md:flex-row gap-10 md:gap-14">
                      <div className=" ">
                        <h3 className="text-3xl font-bold md:text:sm">
                          {item.name.split(" ", 2)}
                        </h3>
                      </div>

                      <div className="flex flex-col  gap-4">
                        <h3 className="">Amount</h3>
                        <div className="flex flex-col  gap-9">
                          <form className="flex flex-col justify-center ">
                            <div className="relative flex items-center">
                              <button
                                type="button"
                                id="decrement-button"
                                data-input-counter-decrement="counter-input"
                                onClick={() => handleDecrement(item)}
                                className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                              >
                                -
                              </button>
                              <input
                                type="text"
                                id="counter-input"
                                className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                                placeholder=""
                                value={item.qty}
                                readOnly
                              />
                              <button
                                type="button"
                                id="increment-button"
                                data-input-counter-increment="counter-input"
                                onClick={() => handleIncrement(item)}
                                className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                              >
                                +
                              </button>
                            </div>
                          </form>
                          <button
                            className="text-red-500 hover:underline"
                            onClick={() => dispatch(removeCartItem(item._id))}
                          >
                            remove
                          </button>
                        </div>
                      </div>
                      <div>
                        <h3>{formatCurrency(item.price)}</h3>
                      </div>
                    </div>
                  </div>
                </li>
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
              </>
            ))}
          </ul>
        ) : (
          <h2>There is no item in the cart</h2>
        )}
        <hr className="my-10 border-gray-200 dark:border-gray-700" />
        <div className="ml-7 ">
          <div className=" md:w-[300px] flex flex-col gap-2 text-sm  font-inter bg-black bg-opacity-5 p-5 rounded-lg">
            <div className="flex flex-row justify-between">
              <h3>Subtotal</h3>
              <div>
                {formatCurrency(
                  cart.reduce((acc, item) => acc + item.qty * item.price, 0)
                )}
              </div>
            </div>

            <div className="flex  flex-row justify-between">
              <h3>Shipping</h3>
              <div>{priceInfo.shippingPrice}</div>
            </div>

            <div className="flex flex-row justify-between">
              <h3>Tax</h3>
              <div>{priceInfo.taxPrice}</div>
            </div>

            <div className="flex flex-row justify-between mt-10">
              <h3>Order total</h3>
              <div>{priceInfo.totalPrice}</div>
            </div>
          </div>
          <button
            className="btn w-full text-white btn-success mt-10"
            onClick={checkoutHandler}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
