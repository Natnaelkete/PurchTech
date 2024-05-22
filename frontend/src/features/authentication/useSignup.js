import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../../services/apiProduct";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../slices/authSlice";

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: Register, isLoading } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success("User registered successfully");
      const { token, ...userData } = data;
      document.cookie = `token=${token}; path=/; max-age=${
        30 * 24 * 60 * 60 * 1000
      }; secure; sameSite=strict; httpOnly`;
      queryClient.setQueryData(["user"], data);
      navigate("/login", { replace: true });
      dispatch(setCredentials({ ...userData }));
    },
  });
  return { Register, isLoading };
}
