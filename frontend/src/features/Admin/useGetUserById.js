import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getAdminUserById } from "../../services/apiProduct";

function useGetUserById(id) {
  const { data: Users, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getAdminUserById(id),
    onError: (err) => toast.error(err.response.data.message),
  });

  return { Users, isLoading };
}

export default useGetUserById;
