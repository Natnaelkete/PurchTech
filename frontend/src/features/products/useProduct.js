import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/apiProduct";
import { toast } from "react-toastify";

function useProduct(pageNum, search) {
  const { data, isLoading } = useQuery({
    queryKey: ["products", pageNum, search], // Include searchQuery in the query key
    queryFn: () => getProduct(pageNum, search), // Pass searchQuery to getProduct function
    onError: (err) => toast.error(err.response.data.message),
  });

  return { data, isLoading };
}

export default useProduct;
