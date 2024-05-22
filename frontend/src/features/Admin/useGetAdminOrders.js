import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../services/apiProduct";
import { toast } from "react-toastify";

function useGetAdminOrders(pageNum) {
  const { data, isLoading } = useQuery({
    queryKey: ["adminOrders", pageNum],
    queryFn: () => getAllOrders(pageNum),
    onError: (err) => toast.error(err.response.data.message),
  });

  return { data, isLoading };
}

export default useGetAdminOrders;
