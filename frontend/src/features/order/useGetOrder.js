import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../services/apiProduct";
import { toast } from "react-toastify";

function useGetOrder(id) {
  const { data: getOrder, isLoading } = useQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrders(id),
    onError: () => toast.error("failed"),
  });
  return { getOrder, isLoading };
}
export default useGetOrder;
