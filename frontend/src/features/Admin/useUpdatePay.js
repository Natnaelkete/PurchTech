import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updatePay } from "../../services/apiProduct";

function useUpdatePay() {
  const queryClient = useQueryClient();
  const { mutate: updateIsPayed, isLoading } = useMutation({
    mutationFn: (id) => updatePay(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order Payed");
    },
    onError: (err) => toast.error(err.response.data.message),
  });
  return { updateIsPayed, isLoading };
}

export default useUpdatePay;
