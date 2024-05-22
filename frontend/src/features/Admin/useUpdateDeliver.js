import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateDeliver } from "../../services/apiProduct";

function useUpdateDeliver() {
  const queryClient = useQueryClient();
  const { mutate: updateIsDeliver, isLoading } = useMutation({
    mutationFn: (id) => updateDeliver(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order delivered");
    },
    onError: (err) => toast.error(err.response.data.message),
  });
  return { updateIsDeliver, isLoading };
}

export default useUpdateDeliver;
