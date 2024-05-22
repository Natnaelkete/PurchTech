import { Form, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../slices/cartSlice";
import Steps from "../../ui/Steps";
function Shipping() {
  const { pathname } = useLocation();

  const { shippingAddress } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const shippingInfo = {
      address: formData.get("address"),
      city: formData.get("city"),
      postalCode: formData.get("postal"),
      country: formData.get("country"),
    };

    dispatch(saveShippingAddress(shippingInfo));
    navigate("/payment");
  }

  return (
    <div className="flex flex-col ">
      <div className="flex justify-center ">
        <Steps currentPath={pathname} className="items-center" />
      </div>
      <div className="grid place-items-center h-screen mx-10">
        <div className="w-full max-w-sm p-4  rounded-lg shadow sm:p-6 md:p-8  ">
          <Form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <h5 className="text-2xl text-center text-white bg-clip-text text-transparent font-semibold ">
              Shipping
            </h5>
            <div>
              <label
                htmlFor="Address"
                className="block mb-2 text-sm font-medium "
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                defaultValue={shippingAddress?.address || ""}
                className="bg-gray-50 border border-gray-500  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                placeholder="Address"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block mb-2 text-sm font-medium ">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                defaultValue={shippingAddress?.city || ""}
                className="bg-gray-50 border border-gray-500  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500  "
                placeholder="city"
                required
              />
            </div>
            <div>
              <label
                htmlFor="postal"
                className="block mb-2 text-sm font-medium "
              >
                Postal card
              </label>
              <input
                type="text"
                name="postal"
                id="postal"
                defaultValue={shippingAddress?.postalCode || ""}
                placeholder="postal card"
                className="bg-gray-50 border border-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500  "
                required
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block mb-2 text-sm font-medium "
              >
                Country
              </label>
              <input
                type="text"
                name="country"
                id="country"
                defaultValue={shippingAddress?.country || ""}
                placeholder="country"
                className="bg-gray-50 border border-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500  "
                required
              />
            </div>

            <button
              type="submit"
              className="text-white w-full  focus:ring-1 focus:outline-none  focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Continue
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
