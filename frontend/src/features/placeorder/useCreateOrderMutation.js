import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrders } from "../../services/apiProduct";
import { toast } from "react-toastify";
import { clearCartItems } from "../../slices/cartSlice";

function useCreateOrderMutation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: createOrder, isLoading } = useMutation({
    mutationFn: ({
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    }) =>
      createOrders(
        user,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
      ),
    onSuccess: (data) => {
      toast.success("Order created successfully");
      queryClient.setQueriesData(["order"], data);
      dispatch(clearCartItems());
      navigate(`/orders/${data._id}`);
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { createOrder, isLoading };
}

export default useCreateOrderMutation;
