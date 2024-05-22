import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/apiProduct";
import { toast } from "react-toastify";

function useGetProductById(id) {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    onError: (err) => toast.error(err.message),
  });

  return { products, isLoading };
}

export default useGetProductById;
