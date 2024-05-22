import { Link } from "react-router-dom";
import Cart from "../../ui/Cart";
import useProduct from "../products/useProduct";
import Skeleton from "../../ui/Skeleton";
import { Pagination } from "antd";
import Meta from "../../ui/Meta";

import { useQuery } from "../products/ContextProvider";

function Feature() {
  const { pageNum, searchQuery, onChangePage } = useQuery();

  const { data, isLoading } = useProduct(pageNum, searchQuery);

  const array = Array.from({ length: 6 }, (_, i) => i + 1);

  if (isLoading || !data?.products) {
    return (
      <>
        <Meta />
        <ul className="grid place-items-center  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-20 md:gap-5 ml-5">
          {array.map((item, index) => (
            <li key={index}>
              <Skeleton />
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <ul className="grid place-items-center  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-20 md:gap-5 ml-5">
        {data.products.map((item) => (
          <Link key={item._id} to={`/product/${item._id}`}>
            <li className="">
              <Cart item={item} />
            </li>
          </Link>
        ))}
      </ul>
      <Pagination
        current={pageNum}
        onChange={onChangePage}
        total={data.pages * 2} // Ensure this reflects your total item count properly
        pageSize={2} // Reflects your backend pageSize
        className="mt-7 p-3 rounded-lg w-fit bg-slate-200"
      />
    </>
  );
}

export default Feature;
