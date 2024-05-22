import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../services/apiProduct";
import { toast } from "react-toastify";
import { setCredentials } from "../../slices/authSlice";

function useUpdateMutation() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: UpdateUser, isLoading } = useMutation({
    mutationFn: ({ _id, name, email, password }) =>
      updateUser(_id, name, email, password),
    onSuccess: (data) => {
      toast.success("Profile Updated successfully");
      queryClient.setQueriesData(["user"], data);
      dispatch(setCredentials(data));
    },
    onError: (err) => toast.error(err.response.data.message),
  });
  return { UpdateUser, isLoading };
}

export default useUpdateMutation;
