import { useNavigate, useParams } from "react-router-dom";
import Star from "../../ui/Star";
import useGetProductById from "../products/useGetProductById";
import Spinner from "../../ui/Spinner";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import { formatCurrency } from "../../utils/helper";
import useCreateReview from "./useCreateReview";
import Meta from "../../ui/Meta";

function Detail() {
  const [qty, setQty] = useState(1);
  const { productId } = useParams();
  const { products, isLoading } = useGetProductById(productId);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createReviewMutation } = useCreateReview();

  function handleClick() {
    dispatch(addToCart({ ...products, qty }));
    navigate("/cart");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const numRate = formData.get("rating");
    console.log(typeof numRate);
    createReviewMutation({
      id: productId,
      rating: numRate,
      comment: formData.get("comment"),
    });
  }

  if (isLoading || !products) {
    return <Spinner />;
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7  lg:gap-14 mt-24  ">
        <Meta title={products.name} />
        <div>
          <img
            src={products.image}
            className="rounded-lg lg:w-[600px] sm:w-[400]  sm:h-[400px] lg:h-[350px] md:w-[600px] md:h-[350px]"
          />
        </div>
        <div className="w-full lg:w-full md:w-full">
          <h1 className="text-3xl ">{products.name}</h1>
          <hr className="my-5 border-gray-200 dark:border-gray-700" />
          <div>
            <Star
              value={products.rating}
              text={`${products.numReviews} reviews`}
            />
          </div>
          <hr className="my-5 border-gray-200 dark:border-gray-700" />
          <h1>{formatCurrency(products.price)}</h1>
          <hr className="my-5 border-gray-200 dark:border-gray-700" />
          <div className="relative flex items-center">
            <button
              type="button"
              id="decrement-button"
              onClick={() => setQty(qty <= 1 ? 1 : qty - 1)}
              data-input-counter-decrement="counter-input"
              className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <FiMinus />
            </button>
            <input
              type="text"
              id="counter-input"
              className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
              placeholder=""
              value={qty}
              readOnly
            />
            <button
              type="button"
              id="increment-button"
              onClick={() =>
                setQty(
                  qty >= products.countInStock
                    ? products.countInStock === 0
                      ? products.countInStock + 1
                      : products.countInStock
                    : qty + 1
                )
              }
              data-input-counter-increment="counter-input"
              className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <FiPlus />
            </button>
          </div>
          <hr className="my-5 border-gray-200 dark:border-gray-700" />
          <p>{products.description}</p>
          <hr className="my-5 border-gray-200 dark:border-gray-700" />
        </div>
        <div className="border-2 outline-none border-gray-500 h-fit p-5 rounded-lg grid   lg:ml-0">
          <span className="flex gap-4">
            Price: <h1>{formatCurrency(products.price)}</h1>
          </span>
          <hr className="my-5 border-gray-200 dark:border-gray-700" />
          <span className="flex gap-4">
            Status:
            <p>{products.countInStock}</p>
          </span>
          <hr className="my-5 border-gray-200 dark:border-gray-700" />
          <button onClick={handleClick} className="btn btn-outline">
            Add to cart
          </button>
        </div>
      </div>
      {userInfo && (
        <div className="w-1/3">
          <div>
            {products.reviews.length === 0 ? (
              <div className="p-6 bg-green-300 rounded-sm">No reviews yet</div>
            ) : (
              <div>
                {products.reviews.map((review) => (
                  <div key={review._id} className="space-y-2">
                    <span>
                      <strong>{review.name}</strong>
                    </span>
                    <Star value={review.rating} />
                    <div>{review.comment}</div>
                    <div>{review.createdAt.substring(0, 10)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <hr className="my-5 border-gray-200 dark:border-gray-700" />
          <form onSubmit={handleSubmit}>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Rating</span>
              </div>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Comment</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                name="comment"
              ></textarea>
            </label>
            <button className="btn outline outline-1 btn-ghost mt-4">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Detail;
