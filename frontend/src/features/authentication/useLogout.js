import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/apiProduct";
import { logout } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const { mutate: Logout, isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries();
      removeCookie("token");
      navigate("/login", { replace: true });
      dispatch(logout());
    },
  });
  return { Logout, isLoading };
}
