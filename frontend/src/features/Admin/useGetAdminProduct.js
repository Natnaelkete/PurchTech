import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/apiProduct";
import { toast } from "react-toastify";

function useGetAdminProduct(pageNum) {
  const { data, isLoading } = useQuery({
    queryKey: ["adminProducts", pageNum],
    queryFn: () => getProduct(pageNum), // Directly use the pageNum argument
    onError: (err) => toast.error(err.message),
  });

  return { data, isLoading };
}

export default useGetAdminProduct;
