import useGetUser from "./useGetUser";
import { MdDelete } from "react-icons/md";
import Spinner from "../../ui/Spinner";
import UserModal from "./UserModal";
import useDeleteUsers from "./useDeleteUser";
import { Pagination } from "antd";
import { useQuery } from "../products/ContextProvider";

function UserList() {
  const { pageNum, onChangePage } = useQuery();
  const { data, isLoading } = useGetUser(pageNum);
  const { deleteUserMutation } = useDeleteUsers();

  function handleDeleteUser(id) {
    deleteUserMutation(id);
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto w-full h-screen">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
              </tr>
            </thead>
            {data?.users.map((items, index) => (
              <tbody key={items._id}>
                {/* row 1 */}
                <tr>
                  <th>{index + 1}</th>
                  <td>{items._id}</td>
                  <td>{items.name}</td>
                  <td>{items.email}</td>
                  <td>
                    {items.isAdmin ? (
                      <div>Admin</div>
                    ) : (
                      <div className="text-red-500">x</div>
                    )}
                  </td>

                  <td>
                    <UserModal id={items._id} />
                  </td>
                  <td>
                    <button onClick={() => handleDeleteUser(items._id)}>
                      <MdDelete className="size-5 text-red-500" />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
      <Pagination
        current={pageNum}
        onChange={onChangePage}
        total={data?.count} // Ensure this reflects your total item count properly
        pageSize={4} // Reflects your backend pageSize
        className="mt-7 p-3 rounded-lg w-fit bg-slate-200"
      />
    </>
  );
}

export default UserList;
