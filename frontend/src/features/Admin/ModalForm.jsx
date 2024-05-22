import { CiEdit } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";
import useUpdateProduct from "./useUpdateProduct";
import useGetProductById from "../products/useGetProductById";
import useUploadProductImage from "./useUploadProductImage";
import { useState } from "react";
import { toast } from "react-toastify";

const ModalForm = ({ id }) => {
  const [image, setImage] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useGetProductById(searchParams.get("id"));
  const { updateProductMutation, isLoading } = useUpdateProduct();
  const { uploadImageMutation } = useUploadProductImage();

  function handleUpload(idNum) {
    // Update the search parameters without navigating
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("id", idNum);
      return newParams;
    });
  }

  function handleImageUpload(e) {
    const imageFormData = new FormData();
    const imageFile = e.target.files[0];
    imageFormData.append("image", imageFile);
    // imageFormData.append("productId", searchParams.get("id")); // Pass the product ID

    uploadImageMutation(imageFormData, {
      onSuccess: (data) => {
        setImage(data.imageUrl); // Ensure you return imageUrl from the backend
        toast.success("Image uploaded");
      },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    updateProductMutation({
      id: searchParams.get("id"),
      name: formData.get("name"),
      price: formData.get("price"),
      description: formData.get("description"),
      brand: formData.get("brand"),
      category: formData.get("category"),
      image: image,
      countInStock: formData.get("countInStock"),
    });
  }

  return (
    <>
      <button
        onClick={() => {
          document.getElementById("my_modal_3").showModal();
          handleUpload(id);
        }}
      >
        <CiEdit className="size-5" />
      </button>
      <dialog id="my_modal_3" className="modal">
        <div
          className="modal-box scrollbar-none"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "none" }}
        >
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form className="space-y-6 p-6" onSubmit={handleSubmit}>
            <h5 className="text-2xl text-center text-white bg-clip-text text-transparent font-semibold">
              Edit Product
            </h5>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={products?.name}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500"
              />
            </div>
            <div>
              <label htmlFor="price" className="block mb-2 text-sm font-medium">
                Price
              </label>
              <input
                type="text"
                name="price"
                id="price"
                defaultValue={products?.price}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500"
              />
            </div>
            <div>
              <label htmlFor="brand" className="block mb-2 text-sm font-medium">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                defaultValue={products?.brand}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="countInStock"
                className="block mb-2 text-sm font-medium"
              >
                Count in Stock
              </label>
              <input
                type="text"
                name="countInStock"
                id="countInStock"
                defaultValue={products?.countInStock}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium"
              >
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                defaultValue={products?.category}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                defaultValue={products?.description}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="image2"
                className="block mb-2 text-sm font-medium"
              >
                Image
              </label>
              <input
                type="text"
                name="image2"
                id="image2"
                value={image}
                className="bg-gray-50 border mb-2 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500"
              />

              <input
                type="file"
                name="image"
                id="image"
                className="file-input-md file-input-bordered w-full max-w-xs"
                onChange={(e) => handleImageUpload(e)}
              />
            </div>

            <button
              type="submit"
              className="text-white w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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

export default ModalForm;
