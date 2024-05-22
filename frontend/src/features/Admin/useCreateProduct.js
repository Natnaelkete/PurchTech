import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../services/apiProduct";
import { toast } from "react-toastify";

function useCreateProduct() {
  const queryClient = useQueryClient();

  const { mutate: createProductMutation, isLoading } = useMutation({
    mutationFn: () => createProduct(),
    onSuccess: () => {
      toast.success("Product successfully created");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },

    onError: (err) => toast.error(err.response.data.message),
  });
  return { createProductMutation, isLoading };
}

export default useCreateProduct;
