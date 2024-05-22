import { GoogleLogin } from "@react-oauth/google";
import { Cookies } from "react-cookie";
// import { setCredentials } from "../../slices/authSlice";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

function OAuth() {
  const cookies = new Cookies();

  const [searParams] = useSearchParams();
  const redirect = searParams.get("redirect") || "/";
  const navigate = useNavigate();

  const handleSuccess = async (tokenResponse) => {
    console.log(tokenResponse); // This will log the token response
    const accessToken = tokenResponse.access_token;
    console.log("Access Token:", accessToken);

    // Store the token in cookies
    cookies.set("token", accessToken, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
      secure: import.meta.env.NODE_ENV !== "development",
      sameSite: "strict",
    });

    // Set the token in axios headers
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    // Fetch user info from Google
    const userInfo = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("User Info:", userInfo.data); // Log the user info
    // dispatch(setCredentials(userInfo.data));

    navigate(redirect, { replace: true });
    // dispatch(setCredentials({ ...userData }));
  };

  const handleError = (errorResponse) => {
    console.error(errorResponse);
  };
  return (
    <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap />
  );
}

export default OAuth;
