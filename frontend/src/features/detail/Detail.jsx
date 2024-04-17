import { useParams } from "react-router-dom";
import products from "../../products";
import Star from "../../ui/Star";

function Detail() {
  const { productId } = useParams();
  const fetchedProduct = products.find((pro) => pro._id === productId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7  lg:gap-14 mt-24  ">
      <div>
        <img
          src={fetchedProduct.image}
          className="rounded-lg lg:w-[600px] sm:w-[400]  sm:h-[400px] lg:h-[400px] md:w-[600px] md:h-[350px]"
        />
      </div>
      <div className="w-full lg:w-full md:w-full">
        <h1 className="text-3xl ">{fetchedProduct.name}</h1>
        <hr className="my-5 border-gray-200 dark:border-gray-700" />
        <div>
          <Star
            value={fetchedProduct.rating}
            text={`${fetchedProduct.numReviews} reviews`}
          />
        </div>
        <hr className="my-5 border-gray-200 dark:border-gray-700" />
        <h1>{fetchedProduct.price}</h1>
        <hr className="my-5 border-gray-200 dark:border-gray-700" />
        <p>{fetchedProduct.description}</p>
        <hr className="my-5 border-gray-200 dark:border-gray-700" />
      </div>
      <div className="border-2 outline-none border-gray-500 h-fit p-5 rounded-lg grid   lg:ml-0">
        <span className="flex gap-4">
          Price: <h1>{fetchedProduct.price}</h1>
        </span>
        <hr className="my-5 border-gray-200 dark:border-gray-700" />
        <span className="flex gap-4">
          Status:
          <p>{fetchedProduct.countInStock}</p>
        </span>
        <hr className="my-5 border-gray-200 dark:border-gray-700" />
        <button className="btn btn-outline">Add to cart</button>
      </div>
    </div>
  );
}

export default Detail;
