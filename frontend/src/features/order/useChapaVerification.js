import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

function useChapaVerification() {
  const mutation = useMutation({
    mutationFn: () => {},
    onError: (err) => toast.error(err.response.data.message),
    onSuccess: () => {
      toast.error("Failed to get checkout URL");
    },
  });

  return mutation;
}

export default useChapaVerification;
