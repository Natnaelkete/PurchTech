import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateAdminUser } from "../../services/apiProduct";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUserMutation, isLoading } = useMutation({
    mutationFn: ({ id, name, email, isAdmin }) =>
      updateAdminUser(id, name, email, isAdmin),
    onSuccess: () => {
      queryClient.invalidateQueries(["adminUsers"]);
      toast.success("User updated");
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { updateUserMutation, isLoading };
}

export default useUpdateUser;
