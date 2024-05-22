import { CiEdit } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";
import useUpdateUser from "./useUpdateUser";
import { useState } from "react";
import useGetUserById from "./useGetUserById";

const UserModal = ({ id }) => {
  const [admin, setAdmin] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { Users } = useGetUserById(searchParams.get("id") || "");
  const { updateUserMutation, isLoading } = useUpdateUser();

  function handleUpload(idNum) {
    setSearchParams({ id: idNum });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    updateUserMutation({
      id,
      name: formData.get("name"),
      email: formData.get("email"),
      isAdmin: admin,
    });
  }

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        onClick={() => {
          document.getElementById("my_modal_3").showModal();
          handleUpload(id);
        }}
      >
        {" "}
        <CiEdit className="size-5" />
      </button>
      <dialog id="my_modal_3" className="modal">
        <div
          className="modal-box scrollbar-none "
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "none" }}
        >
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {/* The Form */}
          <form className="space-y-6 p-6" onSubmit={handleSubmit}>
            <h5 className="text-2xl text-center text-white bg-clip-text text-transparent font-semibold ">
              Edit User
            </h5>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium ">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={Users?.name}
                className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500  "
              />
              {/* {errors?.email && <span>{errors.email}</span>} */}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium "
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                defaultValue={Users?.email}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500  "
              />
            </div>
            <div className="flex gap-4">
              <label
                htmlFor="admin"
                className="block mb-2 text-sm font-medium "
              >
                Admin
              </label>

              <input
                type="checkbox"
                name="admin"
                id="admin"
                className="checkbox"
                onChange={() => setAdmin(true)}
              />
            </div>

            <button
              type="submit"
              className="text-white w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none  focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Edit "
              )}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};
export default UserModal;
