import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { myOrder } from "../../services/apiProduct";

function useGetMyOrders() {
  const { data: myOrders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: myOrder,
    onError: (err) => toast.error(err.message),
  });
  return { myOrders, isLoading };
}

export default useGetMyOrders;
