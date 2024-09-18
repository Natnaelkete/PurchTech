import { useMutation } from "@tanstack/react-query";
import { acceptPayment } from "../../services/apiProduct";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function useChapaPayment() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: ({
      amount,
      currency,
      email,
      first_name,
      last_name,
      phone_number,
      tx_ref,
    }) =>
      acceptPayment(
        amount,
        currency,
        email,
        first_name,
        last_name,
        phone_number,
        tx_ref
      ),
    onError: (err) => toast.error(err.response.data.message),
    onSuccess: (data) => {
      if (data.success.data.checkout_url) {
        console.log(data);
        window.location.href = data.success.data.checkout_url;
      } else {
        toast.error("Failed to get checkout URL");
      }
    },
  });

  return mutation;
}

export default useChapaPayment;
