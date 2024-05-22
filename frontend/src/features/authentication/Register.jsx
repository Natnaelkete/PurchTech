import { Form, Link } from "react-router-dom";
import { useSignup } from "./useSignup";
import { toast } from "react-toastify";
import axios from "axios";

function Registers() {
  const { Register, isLoading } = useSignup();

  async function verifyEmail(email) {
    try {
      // Use an email verification API
      const response = await axios.get(
        `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${
          import.meta.env.API_KEY
        }`
      );

      return response.data.is_valid;
    } catch (error) {
      console.error("Email verification failed:", error);
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (formData.get("password") !== formData.get("confirmPassword")) {
      toast.error("Passwords do not match");
      return;
    }

    const email = formData.get("email");
    const isEmailValid = await verifyEmail(email);

    if (!isEmailValid) {
      toast.error("Please enter a valid and existing Gmail account.");
      return;
    }

    Register({
      name: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    });
  }

  return (
    <div>
      <div className="grid place-items-center h-screen mx-10">
        <div className="w-full max-w-sm p-4 border border-orange-400 rounded-lg shadow sm:p-6 md:p-8  dark:border-orange-500">
          <Form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <h5 className="text-2xl text-center text-white bg-clip-text text-transparent font-semibold ">
              Sign up
            </h5>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium "
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="username"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium "
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium "
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium "
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>

            <button
              type="submit"
              className="text-white w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "REGISTER"
              )}
            </button>

            <div className="text-sm text-center font-medium text-gray-500">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Login
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Registers;
