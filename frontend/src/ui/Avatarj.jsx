import { useLogout } from "../features/authentication/useLogout";
import { Link } from "react-router-dom";

function Avatar({ userInfo }) {
  const { Logout } = useLogout();

  return (
    <div className="dropdown dropdown-hover ml-2">
      <div tabIndex={0} role="button" className=" w-24">
        {userInfo.name}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-24"
      >
        {userInfo.isAdmin && (
          <li>
            <details className="dropdown">
              <summary className="m-1">Admin</summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li>
                  <Link to={"/admin/productlist"}>Product</Link>
                </li>
                <li>
                  <Link to={"/admin/userlist"}>User</Link>
                </li>
                <li>
                  <Link to={"/admin/orderlist"}>Order</Link>
                </li>
              </ul>
            </details>
          </li>
        )}
        <li>
          <Link to={"/profile"}>Profile</Link>
        </li>
        <li>
          <a onClick={() => Logout()}>Logout</a>
        </li>
      </ul>
    </div>
  );
}

export default Avatar;
