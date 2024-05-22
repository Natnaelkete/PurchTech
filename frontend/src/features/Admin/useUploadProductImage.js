import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { uploadImage } from "../../services/apiProduct";

function useUploadProductImage() {
  const queryClient = useQueryClient();

  const {
    mutate: uploadImageMutation,
    isLoading,
    data,
  } = useMutation({
    mutationFn: (formDatas) => uploadImage(formDatas),
    onSuccess: (data) => {
      queryClient.setQueryData(["products"], data);
      
    },
    onError: (err) => toast.error(err.response.data.message),
  });
  return { uploadImageMutation, isLoading, data };
}

export default useUploadProductImage;
