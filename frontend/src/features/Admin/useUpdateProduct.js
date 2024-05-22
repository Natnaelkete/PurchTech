import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateProduct } from "../../services/apiProduct";

function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { mutate: updateProductMutation, isLoading } = useMutation({
    mutationFn: ({
      id,
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    }) =>
      updateProduct(
        id,
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products", data] });
      toast.success("Product updated successfully");
    },
    onError: (err) => toast.error(err.response.data.message),
  });
  return { updateProductMutation, isLoading };
}

export default useUpdateProduct;
