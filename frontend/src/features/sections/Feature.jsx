import { Link } from "react-router-dom";
import products from "../../products";
import Cart from "../../ui/Cart";

function Feature() {
  return (
    <ul className="grid place-items-center  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-20 md:gap-5 ml-5">
      {products.map((item) => (
        <Link to={`/product/${item._id}`}>
          <li key={item.id} className="">
            <Cart item={item} />
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default Feature;
