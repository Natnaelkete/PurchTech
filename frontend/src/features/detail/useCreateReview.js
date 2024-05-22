import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createReview } from "../../services/apiProduct";

function useCreateReview() {
  const { mutate: createReviewMutation, isLoading } = useMutation({
    mutationFn: ({ id, rating, comment }) => createReview(id, rating, comment),
    onSuccess: () => {
      toast.success("Review created");
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { createReviewMutation, isLoading };
}

export default useCreateReview;
