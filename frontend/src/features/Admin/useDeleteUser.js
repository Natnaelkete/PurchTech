import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteUser } from "../../services/apiProduct";

function useDeleteUsers() {
  const queryClient = useQueryClient();
  const { mutate: deleteUserMutation, isLoading } = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["adminUser"]);
      toast.success("User deleted");
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { deleteUserMutation, isLoading };
}

export default useDeleteUsers;
