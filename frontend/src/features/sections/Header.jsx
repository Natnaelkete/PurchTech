import SearchInput from "../../ui/SearchInput";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helper";
import Avatar from "../../ui/Avatarj";

function Header() {
  const cart = useSelector((state) => state.cart.cartItems);
  const { userInfo } = useSelector((state) => state.auth);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const cartQuantity = cart.length;

  return (
    <div className="navbar bg-base-100 padding-x border-b  border-gray-600 py-3 ">
      <div className="navbar-start">
        <div className="flex-none w-10 hidden md:flex rounded-full">
          <img src={logo} />
        </div>
        <div className="flex-1 hidden md:flex">
          <Link to={"/"} className="  text-xl">
          PurchTech
          </Link>
        </div>
        <div className="dropdown md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <SearchInput />
      </div>
      <div className="navbar-end ">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {cartQuantity}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">{`${cartQuantity} Items`}</span>
              <span className="text-info">{`Subtotal: ${formatCurrency(
                totalPrice
              )}`}</span>
              <div className="card-actions">
                <Link to={"/cart"} className="btn btn-primary btn-block">
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {userInfo ? (
        <Avatar userInfo={userInfo} />
      ) : (
        <Link to={"/login"} className="btn hidden md:flex btn-outline ml-5">
          Sign in
        </Link>
      )}
    </div>
  );
}

export default Header;
