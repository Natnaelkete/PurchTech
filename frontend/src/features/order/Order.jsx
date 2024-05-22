import { useParams } from "react-router-dom";
import useGetOrder from "./useGetOrder";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helper";
import ChapaIntegration from "./ChapaIntegration";
import useUpdateDeliver from "../Admin/useUpdateDeliver";
import { useSelector } from "react-redux";
import useChapaPayment from "./useChapaPayment";

function Order() {
  const { id: orderId } = useParams();

  const { getOrder } = useGetOrder(orderId);
  const { updateIsDeliver, isLoading: updateLoading } = useUpdateDeliver();
  const { userInfo } = useSelector((state) => state.auth);
  const { isLoading } = useChapaPayment();

  function handleUpdate() {
    updateIsDeliver(orderId);
  }

  if (isLoading || !getOrder) {
    return <Spinner />;
  }
  return (
    <>
      <h1 className="text-6xl mb-10">{orderId}</h1>
      <div className="flex flex-col  md:flex-row gap-3 mt-5">
        <div className="w-full md:w-3/4">
          <div className=" space-y-3">
            <h1 className="text-3xl">Shipping</h1>
            <span className="flex gap-3">
              Name: <p>{getOrder.user.name}</p>
            </span>
            <span className="flex gap-3">
              Email: <p>{getOrder.user.email}</p>
            </span>
            <span className="flex gap-3">
              Address: <span>{getOrder.shippingAddress.city},</span>
              <span>{getOrder.shippingAddress.country},</span>
              <span>{getOrder.shippingAddress.postalCode}</span>
            </span>
            {getOrder.isDelivered ? (
              <div className="p-4 rounded-sm  bg-green-400 font-semibold text-white">
                delivered
              </div>
            ) : (
              <div className="p-4 rounded-sm bg-orange-300 font-semibold text-red-500">
                Not delivered
              </div>
            )}
          </div>
          <hr className="my-5 border-gray-200  dark:border-gray-700" />
          <div className="space-y-3">
            <h1 className="text-3xl">Payment Method</h1>
            <span className="flex gap-3">
              Method: <p>PayPal</p>
            </span>
            {getOrder.isPaid ? (
              <div className="p-4 rounded-sm font-semibold bg-green-400 text-white">
                Paid
              </div>
            ) : (
              <div className="p-4 rounded-sm font-semibold bg-orange-300 text-red-500">
                Not Paid
              </div>
            )}
          </div>
          <hr className="my-5 border-gray-200 dark:border-gray-700" />
          <div>
            <h1 className="text-3xl">Order Items</h1>
            <div>
              <ul className="m-4 ">
                {getOrder.orderItems.map((item) => (
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
                          )}`}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-2 outline-none border-gray-500 h-fit p-5 rounded-lg grid   lg:ml-0 w-full  md:w-[30%]">
          <span className="flex justify-between">
            Items: <p>{formatCurrency(getOrder.itemsPrice)}</p>
          </span>
          <hr className="my-5 border-gray-200 dark:border-gray-700" />
          <span className="flex justify-between">
            Shipping:
            <p>{formatCurrency(getOrder.shippingPrice)}</p>
          </span>
          <hr className="my-5 border-gray-200 dark:border-gray-700" />
          <span className="flex justify-between">
            Tax:
            <p>{formatCurrency(getOrder.taxPrice)}</p>
          </span>
          <hr className="my-5 border-gray-200 dark:border-gray-700" />
          <span className="flex justify-between">
            Total:
            <p>{formatCurrency(getOrder.totalPrice)}</p>
          </span>
          <hr className="my-5 border-gray-200 dark:border-gray-700" />
          <div>
            {userInfo && userInfo.isAdmin ? (
              <button onClick={handleUpdate} className="btn outline btn-ghost">
                Mark As Delivered
              </button>
            ) : (
              <ChapaIntegration id={orderId} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
