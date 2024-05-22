import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteProduct } from "../../services/apiProduct";

function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { mutate: DeleteProductMutation, isLoading } = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product deleted");
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { DeleteProductMutation, isLoading };
}
export default useDeleteProduct;
