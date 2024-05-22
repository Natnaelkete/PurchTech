import { useQuery } from "@tanstack/react-query";
import { getTop } from "../../services/apiProduct";
import { toast } from "react-toastify";

function useGetTopProduct() {
  const { data: topProducts, isLoading } = useQuery({
    queryKey: ["products"], // Include searchQuery in the query key
    queryFn: getTop, // Pass searchQuery to getProduct function
    onError: (err) => toast.error(err.message),
  });

  return { topProducts, isLoading };
}

export default useGetTopProduct;
