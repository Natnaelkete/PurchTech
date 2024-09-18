import { useMutation } from "@tanstack/react-query";
import { PayWithStripe } from "../../services/apiProduct";
import { toast } from "react-toastify";
// import { clearCartItems } from "../../slices/cartSlice";

function usePayWithStripe() {
  const { mutate: payStripe, isLoading } = useMutation({
    mutationFn: async ({ products }) => await PayWithStripe(products),
    onError: () => toast.error("Error occured"),
  });

  return { payStripe, isLoading };
}

export default usePayWithStripe;
