import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAuth } from "../../services/apiProduct";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { Cookies } from "react-cookie";

function useUsersMutation(redirect) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const {
    mutate: Login,
    isLoading,
    error,
    variables,
  } = useMutation({
    mutationFn: ({ email, password }) => createAuth(email, password),
    onSuccess: (data) => {
      toast.success("User successfully loggedIn");
      const { token, ...userData } = data;

      cookies.set("token", token, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
        secure: import.meta.env.NODE_ENV !== "development",
        sameSite: "strict",
      });
      queryClient.setQueryData(["user"], userData);
      navigate(redirect, { replace: true });
      dispatch(setCredentials({ ...userData }));
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { Login, isLoading, error, variables };
}

export default useUsersMutation;
