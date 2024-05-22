import useGetAdminProduct from "./useGetAdminProduct";
import Spinner from "../../ui/Spinner";
import { MdDelete } from "react-icons/md";
import useCreateProduct from "./useCreateProduct";
import ModalForm from "./ModalForm";
import useDeleteProduct from "./useDeleteProduct";
import { Pagination } from "antd";
import { useQuery } from "../products/ContextProvider";

function ProductList() {
  const { pageNum, onChangePage } = useQuery();

  const { data, isLoading } = useGetAdminProduct(pageNum);

  const { createProductMutation } = useCreateProduct();
  const { DeleteProductMutation } = useDeleteProduct();

  function handleCreateProduct() {
    createProductMutation();
  }

  function handleDelete(id) {
    DeleteProductMutation(id);
  }

  return (
    <>
      <div className="flex justify-between mb-9 mt-9">
        <h1 className="text-3xl font-semibold">Product</h1>
        <button
          onClick={handleCreateProduct}
          className="btn btn-outline btn-sm "
        >
          Create Product
        </button>
      </div>
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
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th></th>
              </tr>
            </thead>
            {data?.products.map((items, index) => (
              <tbody key={items._id}>
                {/* row 1 */}
                <tr>
                  <th>{index + 1}</th>
                  <td>{items._id}</td>
                  <td>{items.name}</td>
                  <td>{items.price}</td>
                  <td>{items.category}</td>
                  <td>{items.brand}</td>
                  <td>
                    <ModalForm id={items._id} />
                  </td>
                  <td>
                    <button onClick={() => handleDelete(items._id)}>
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

export default ProductList;
