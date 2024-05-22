import useGetAdminOrders from "./useGetAdminOrders";
import { formatCurrency } from "../../utils/helper";
import { Link } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { FaXmark } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { Pagination } from "antd";
import { useQuery } from "../products/ContextProvider";

function OrderList() {
  const { pageNum, onChangePage } = useQuery();
  const { data, isLoading } = useGetAdminOrders();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="overflow-x-auto w-full h-screen">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>User</th>
            <th>Date</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Delivered</th>
          </tr>
        </thead>
        {data?.orders.map((items, index) => (
          <tbody key={items._id}>
            {/* row 1 */}
            <tr>
              <th>{index + 1}</th>
              <td>{items._id}</td>
              <td>{items.user.name}</td>
              <td>{items.createdAt.substring(0, 10)}</td>
              <td>{formatCurrency(items.totalPrice)}</td>
              <td>{items.isPaid ? "" : <FaXmark />}</td>
              <td>{items.isDelivered ? <FaCheck /> : <FaXmark />}</td>
              <td>
                <Link to={`/orders/${items._id}`}>
                  <button>Detail</button>
                </Link>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <Pagination
        current={pageNum}
        onChange={onChangePage}
        total={data?.count} // Ensure this reflects your total item count properly
        pageSize={4} // Reflects your backend pageSize
        className="mt-7 p-3 rounded-lg w-fit bg-slate-200"
      />
    </div>
  );
}

export default OrderList;
