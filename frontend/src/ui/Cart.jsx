import Star from "./Star";

function Cart({ item }) {
  return (
    <div>
      <div className="card w-72  bg-base-100 shadow-xl">
        <figure>
          <img src={item.image} alt="Shoes" />
        </figure>
        <div className="card-body h-48">
          <h2 className="card-title">{item.name.split(" ", 2)}</h2>
          <p>
            <Star value={item.rating} text={`${item.numReviews} review`} />
          </p>

          <h1 className="text-3xl font-bold">{`${item.price}$`}</h1>
        </div>
      </div>
    </div>
  );
}

export default Cart;
