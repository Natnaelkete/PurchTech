import { formatCurrency } from "../../utils/helper";
import { FaXmark } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

function OrderTable({ orders }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Date</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Delivered</th>
          </tr>
        </thead>
        {orders?.map((items, index) => (
          <tbody key={items._id}>
            {/* row 1 */}
            <tr>
              <th>{index + 1}</th>
              <td>{items._id}</td>
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
    </div>
  );
}

export default OrderTable;
